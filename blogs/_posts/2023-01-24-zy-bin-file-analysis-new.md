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

~~~

为避免 protobuf 文件互相调用产生异常，请逐行执行
{:.note}

## 开始解析
新建 C# 命令行应用，将生成的 gen 文件夹拷贝至项目目录