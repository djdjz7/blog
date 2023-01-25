---
layout: post
title: 中育云笔记 .bin 文件解析 [新]
image:
  path: /assets/img/blogs/bin-analysis/splash.png
sitemap: true
---
我是沙币！
{:.note title="⊙﹏⊙∥"}

* 
{:toc}

下面内容已基于中育云笔记 1.9.16 安装包，对于 .bin 文件结构的初步分析，请移步 [此处](/blogs/_posts/2023-01-23-zy-bin-file-analysis)
{:.note}

## 获取 *.proto 文件
解压 中育云笔记1.9.16.apk，找到下列文件
~~~
/Command.proto
/DrawBoard.proto
/ezy_actions.proto
/GraphSnapshot.proto
/Header.proto
/PageHeader.proto
/PageRouter.proto
/RouterRecord.proto
/SketchGraphSnapshot.proto
/SketchHeader.proto
/Source.proto
~~~
或者说根目录下的所有 *.proto 文件
{:.figcaption}

和文件夹
~~~
/google
/utils
/enums
~~~

解压到与 protoc.exe 处在同一目录下的 protobuf 文件夹中，同时在该目录新建 gen 文件夹

## 修正 *.proto 文件
这些 protobuf 文件中存在一些重复定义的错误，在编译之前需要先进行修正
~~~protobuf
//file: "SketchHeader.proto"
//原名 Header
message SketchHeader {
  //...
}
~~~
~~~protobuf
//file: "SketchGraphSnapshot.proto"
//添加引用
import "utils/PointF.proto";
import "utils/RectF.proto";
/*
删除此二项
message RectF {
  ...
}
message PointF {
  ...
}
*/
~~~
~~~protobuf
//file: "DrawBoard.proto"
//添加引用
import "utils/PointF.proto";
//...
~~~

## 生成编解码器
定位到 protoc.exe 所在目录，执行如下命令
~~~bat
protoc.exe --proto_path=protobuf --csharp_out=gen Command.proto
protoc.exe --proto_path=protobuf --csharp_out=gen DrawBoard.proto
protoc.exe --proto_path=protobuf --csharp_out=gen ezy_actions.proto
protoc.exe --proto_path=protobuf --csharp_out=gen GraphSnapshot.proto
protoc.exe --proto_path=protobuf --csharp_out=gen Header.proto
protoc.exe --proto_path=protobuf --csharp_out=gen PageHeader.proto
protoc.exe --proto_path=protobuf --csharp_out=gen PageRouter.proto
protoc.exe --proto_path=protobuf --csharp_out=gen RouterRecord.proto
protoc.exe --proto_path=protobuf --csharp_out=gen SketchGraphSnapshot.proto
protoc.exe --proto_path=protobuf --csharp_out=gen SketchHeader.proto.proto
protoc.exe --proto_path=protobuf --csharp_out=gen SketchHeader.proto
protoc.exe --proto_path=protobuf --csharp_out=gen Source.proto
protoc.exe --proto_path=protobuf --csharp_out=gen utils/Matrix.proto
protoc.exe --proto_path=protobuf --csharp_out=gen utils/Paint.proto
protoc.exe --proto_path=protobuf --csharp_out=gen utils/PointF.proto
protoc.exe --proto_path=protobuf --csharp_out=gen utils/RectF.proto
protoc.exe --proto_path=protobuf --csharp_out=gen utils/TouchEvent.proto
protoc.exe --proto_path=protobuf --csharp_out=gen enums/CommandEnum.proto
protoc.exe --proto_path=protobuf --csharp_out=gen enums/GraphEnum.proto
protoc.exe --proto_path=protobuf --csharp_out=gen enums/ModeEnum.proto
protoc.exe --proto_path=protobuf --csharp_out=gen enums/PositionEnum.proto
protoc.exe --proto_path=protobuf --csharp_out=gen enums/ScaleTypeEnum.proto

~~~

为避免 protobuf 文件互相调用产生异常，请逐行执行
{:.note}

## 开始解析
新建 C# 命令行应用，将生成的 gen 文件夹拷贝至项目目录，使用以下代码对 actions.bin 文件进行第一步的解析：
~~~csharp
static void Main(string[] args)
{
    while (true)
    {
        string fn = Console.ReadLine();
        using (FileStream fileStream = System.IO.FileOpenRead(fn))
        {
            DrawBoard drawBoard = DrawBoard.ParserParseFrom(fileStream);
            Console.WriteLine(FormatJson(drawBoardToString()));
        }
    }
}

//引自 https://www.cnblogs.com/unintersky/p/3884712.html
private static string FormatJson(string str)
{
    //格式化json字符串
    JsonSerializer serializer = new JsonSerializer();
    TextReader tr = new StringReader(str);
    JsonTextReader jtr = new JsonTextReader(tr);
    object obj = serializer.Deserialize(jtr);
    if (obj != null)
    {
        StringWriter textWriter = new StringWriter();
        JsonTextWriter jsonWriter = new JsonTextWriter(textWriter)
        {
            Formatting = Formatting.Indented,
            Indentation = 4,
            IndentChar = ' '
        };
        serializer.Serialize(jsonWriter, obj);
        return textWriter.ToString();
    }
    else
    {
        return str;
    }
}
~~~