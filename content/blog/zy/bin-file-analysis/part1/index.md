---
title: 中育云笔记 .bin 文件解析
time: 2023-01-23
---

:::info
以下内容基于中育云笔记 1.9.8  
在中育云笔记 1.9.16 安装包中已经存在 _.proto 文件，故请忽略对 _.proto 文件的逆向分析
:::

更新的解析方式，移步[此处](/blog/zy/bin-file-analysis/part2/)

## 前言

众所周知，中育云笔记中的笔记格式以 .bin 格式存储  
从平板 设置->WLAN->高级 WLAN 设置 中也可以看到每一份笔记中的每一页分别存储为 header.bin 和 actions.bin  
下面将介绍对于两份 .bin 文件的分析历程

## 准备工作

- 创建含不同内容的笔记
  - 一份空白笔记
  - 一份含黑色划线的笔记
  - 一份含长黑色划线的笔记
  - 一份含红色划线的笔记
  - 一份含图片的笔记
- 获取五份笔记的 ID
- 调用中育 API[^1] 分别获取五份笔记的两份 .bin 文件[^2]
- 重命名以准备分析
- 获取一份中育云笔记安装包

## 初步分析

![alt Binary Viewer](/assets/img/blog/bin-analysis/binary-viewer.jpg)  
使用 Binary Viewer 打卡其中一份 actions.bin 文件，注意到其中 type.googleapis.com/\* 字样，经过搜索，初步判断该格式为 [Protocol Buffers](https://protobuf.dev/)(下简称 protobuf) 编码的输出文件。

## 反编译

使用 [dex2jar](https://github.com/pxb1988/dex2jar) 反编译 classes.dex, classes2.dex, classes3.dex, classes4.dex, classes5.dex

:::info
此处使用中育云笔记 1.9.8 为例，不同版本结果可能有所不同
:::

注意到 apk 目录下 /google/protobuf 目录，进一步佐证上面的猜测

## 分析 header.bin

### 正向分析

准备 [protobuf 工具包](https://github.com/protocolbuffers/protobuf/releases)，执行如下命令

```bat
protoc.exe --decode_raw < header.bin
```

观察输出

```bat
E:\BIN>protoc.exe --decode_raw < 黑线header.bin
1: 5
2: 1920
3: 1200
4: 1674368504261
5: 1674368512315
```

### 逆向分析

使用 [jg-gui](https://github.com/java-decompiler/jd-gui) 打开反编译出的五份 \*.jar 文件，定位到 (classes4) com.zykj.sketch.SketchHeader，注意到如下的一段代码

```java
// file: "SketchHeader.class"
static {
    Descriptors.FileDescriptor.InternalDescriptorAssigner internalDescriptorAssigner = new Descriptors.FileDescriptor.InternalDescriptorAssigner() {
        public ExtensionRegistry assignDescriptors(Descriptors.FileDescriptor param1FileDescriptor) {
          SketchHeader.access$1602(param1FileDescriptor);
          return null;
        }
      };
    Descriptors.FileDescriptor.internalBuildGeneratedFileFrom(new String[] { "\n\fHeader.proto\"~\n\006Header\022\017\n\007version\030\001 \001(\005\022\r\n\005width\030\002 \001(\005\022\016\n\006height\030\003 \001(\005\022\022\n\ncreateDate\030\004 \001(\003\022\022\n\nupdateDate\030\005 \001(\003\022\016\n\006author\030\006 \001(\t\022\f\n\004type\030\007 \001(\005B\037\n\017com.zykj.sketchB\fSketchHeaderb\006proto3" }, new Descriptors.FileDescriptor[0], internalDescriptorAssigner);
    Descriptors.Descriptor descriptor = getDescriptor().getMessageTypes().get(0);
    internal_static_Header_descriptor = descriptor;
    internal_static_Header_fieldAccessorTable = new GeneratedMessageV3.FieldAccessorTable(descriptor, new String[] { "Version", "Width", "Height", "CreateDate", "UpdateDate", "Author", "Type" });
  }
```

:::info
(classes2) com.friday.common.base.BaseConstant 存有 AES 密钥
:::

### 合并

可以看到：正向分析中的 1~5 分别对应 Version, Width, Height, CreateDate, UpdateDate  
编写如下 .proto 文件

```proto
// file: "Header.proto"
syntax = "proto3";

message Header{
    int32 version = 1;
    int32 width = 2;
    int32 height = 3;
    int64 create_time = 4;
    int64 update_time = 5;
    string author = 6;
    int32 type = 7;
}
```

生成编解码器

```bat
protoc --proto_path=protobuf --java_out=gen Header.proto
```

打开 Header.java，存在以下代码

```java
// file: "Header.java"
static {
    java.lang.String[] descriptorData = {
      "\n\014Header.proto\"\200\001\n\006Header\022\017\n\007version\030\001 \001" +
      "(\005\022\r\n\005width\030\002 \001(\005\022\016\n\006height\030\003 \001(\005\022\023\n\013cre" +
      "ate_time\030\004 \001(\003\022\023\n\013update_time\030\005 \001(\003\022\016\n\006a" +
      "uthor\030\006 \001(\t\022\014\n\004type\030\007 \001(\005b\006proto3"
    };
    descriptor = com.google.protobuf.Descriptors.FileDescriptor
      .internalBuildGeneratedFileFrom(descriptorData,
        new com.google.protobuf.Descriptors.FileDescriptor[] {
        });
    internal_static_Header_descriptor =
      getDescriptor().getMessageTypes().get(0);
    internal_static_Header_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Header_descriptor,
        new java.lang.String[] { "Version", "Width", "Height", "CreateTime", "UpdateTime", "Author", "Type", });
  }
```

可认为两者基本一致

### 解码测试

生成 C# 编解码器

```bat
protoc --proto_path=protobuf --csharp_out=gen Header.proto
```

运行如下 C# 代码

```csharp
// file: "DecodeHeader.cs"
using Google.Protobuf.WellKnownTypes;
static void Main(string[] args)
        {
            while (true)
            {
                string fn=Console.ReadLine();
                using (FileStream fileStream = File.OpenRead(fn))
                {
                    Header header = Header.Parser.ParseFrom(fileStream);
                    if (header != null)
                    {
                        Console.WriteLine(header);
                    }
                }
            }
        }
```

拖入 header.bin，成功解码
![alt Header Decode Success](/assets/img/blog/bin-analysis/header-decode-success.jpg)

:::info
CreateDate 与 UpdateDate 被替换为 CreateTime 和 UpdateTime，此二项值为时间戳（毫秒），故使用 Time 更加贴切
:::

## 分析 actions.bin

未完待续

[^1]: GET http://note.func.zykj.org/api/Resources/GetByFileId? {AES 加密内容，明文为 fileId={fileID}}

[^2]: 可从[此处](/assets/files/bin-analysis/bin-files.zip)获取
