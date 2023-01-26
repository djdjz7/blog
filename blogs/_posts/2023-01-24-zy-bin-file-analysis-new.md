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

先从简单的一张图片开始解析
~~~json
{
  "boardHead": {
      "version": 5,
      "width": 1920,
      "height": 1200,
      "createDate": "1674368572578",
      "updateDate": "1674368578214",
      "type": 1
  },
 "boardBody": {
        "ActionContent": [
            {
                "type": "ACTION_IMAGE",
                "action": {
                    "@type": "type.googleapis.com/ActionImageConfig",
                    "@value": "EKjOk8HdMBokNjJmMzUwMWNiZDA2NDE5ZGIxZjM4YTFlODQzM2EzODcuanBnIJoKKNQHMIAPOLAJ"
                },
                "graphSnapshot": {
                    "childGraph": [
                        {
                            "graphType": "IMAGE_GRAPH",
                            "matrix": [1, 0, 307,
                                      0, 1, 110,
                                       0, 0, 1],
                            "childExtendMatrix": [1, 0, 0,
                                                  0, 1, 0,
                                                  0, 0, 1],
                            "color": -16777216,
                            "extra": {
                                "@type": "type.googleapis.com/File",
                                "@value": "CiQ2MmYzNTAxY2JkMDY0MTlkYjFmMzhhMWU4NDMzYTM4Ny5qcGcQmgoY1AcggA8osAk="
                            },
                            "name": "ImageGraph-240433585",
                            "outRect": {
                                "right": 1306,
                                "bottom": 980
                            }
                        }
                    ],
                    "matrix": [1, 0, 0,
                               0, 1, 0,
                               0, 0, 1],
                    "childExtendMatrix": [1, 0, 0,
                                          0, 1, 0,
                                          0, 0, 1],
                    "color": -16777216,
                    "name": "UnBoundedContainerGraph-262823378",
                    "outRect": {}
                },
                "resetData": {
                    "action": {},
                    "graphConfig": {
                        "width": 3,
                        "color": -16777216
                    },
                    "modeConfig": "ACTION_WRITING",
                    "backgroundColor": -1
                }
            }
        ]
    }
}
~~~

在此，我们只关注结果而非过程，所以，忽略所有 ACTION 项，仅保留 GRAPH 项。

经过多次的更改和比对，我们发现 ACTION 项在每次发生更改时都会重写，故此处忽略 ACTION 项应当是安全的
{:.note}

另外，注释中如此描写 "resetData"
~~~protobuf
//file: "DrawBoard.proto"
message ActionContent{
    ActionEnum type = 1;
    google.protobuf.Any action = 2;
    GraphData graphSnapshot = 3;

    GraphResetData resetData = 5;//恢复时需要的数据
}
~~~
可以看出，此项应该配置清空画板时执行的操作，在此可以一并忽略。

另外，此项在发生更改时也会重写，故此处忽略应当是安全的
{:.note}

"boardHead" 项与在[此处](/blogs/2023-01-23-zy-bin-file-analysis/)分析的相同，不在此赘述

现在我们余下的内容有
~~~json
{
  //...
 "boardBody": {
        "ActionContent": [
            {
                //...
                "graphSnapshot": {
                    "childGraph": [
                        {
                            "graphType": "IMAGE_GRAPH",
                            "matrix": [1, 0, 307,
                                      0, 1, 110,
                                       0, 0, 1],
                            "childExtendMatrix": [1, 0, 0,
                                                  0, 1, 0,
                                                  0, 0, 1],
                            "color": -16777216,
                            "extra": {
                                "@type": "type.googleapis.com/File",
                                "@value": "CiQ2MmYzNTAxY2JkMDY0MTlkYjFmMzhhMWU4NDMzYTM4Ny5qcGcQmgoY1AcggA8osAk="
                            },
                            "name": "ImageGraph-240433585",
                            "outRect": {
                                "right": 1306,
                                "bottom": 980
                            }
                        }
                    ],
                    "matrix": [1, 0, 0,
                               0, 1, 0,
                               0, 0, 1],
                    "childExtendMatrix": [1, 0, 0,
                                          0, 1, 0,
                                          0, 0, 1],
                    "color": -16777216,
                    "name": "UnBoundedContainerGraph-262823378",
                    "outRect": {}
                },
                //...
            }
        ]
    }
}
~~~

进一步研究各 protobuf 文件，可以发现 "graphSnapshot", "childGraph" 项可以无限嵌套
~~~protobuf
//file: "SketchGraphSnapshot.proto"
message GraphData {
    GraphType graphType = 1;
    repeated GraphData childGraph = 2;
    repeated float matrix = 3;
    repeated float childExtendMatrix = 4;
    float width = 6;
    int32 color = 7;
    bool isSelect = 8;
    bool showDelete = 9;
    google.protobuf.Any extra = 10;
    string name = 11;
    RectF outRect = 12;
}
~~~
所以用递推处理这些数据

我们发现 extra 项仍未解析，先对 extra 项进行解析
~~~csharp
private static void SearchForExtras(GraphData graphData)
{
    //Console.WriteLine(graphData.Name);
    if (graphData == null) return;
    if(graphData.Extra!=null)
    {
        switch (graphData.GraphType)
        {
            case GraphType.UnboundedContainerGraph:
                break;
            case GraphType.BoundedContainerGraph:
                break;
            case GraphType.ImageGraph:
                File file = File.Parser.ParseFrom(graphData.Extra.Value);
                Console.WriteLine(FormatJson(file.ToString()));
                break;
            case GraphType.WebViewGraph:
                break;
            case GraphType.WritingGroupGraph:
                break;
            case GraphType.StrokeGraph:
                Touch touch = Touch.Parser.ParseFrom(graphData.Extra.Value);
                Console.WriteLine(touch.PointF);
                break;
            case GraphType.ShapeGraph:
                break;
            default:
                break;
        }
    }
    if (graphData.ChildGraph.Count == 0) return;
    foreach(var i in graphData.ChildGraph)
    {
        SearchForExtras(i);
    }
}
~~~
此处一并解析了画笔数据
{:.figcaption}

