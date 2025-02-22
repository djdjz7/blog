---
title: 中育云笔记 .bin 文件解析 [新]
splash: /assets/img/blog/bin-analysis/splash.png
time: 2023-01-26
---

我是沙币！
---



:::info
下面内容已基于中育云笔记 1.9.16 安装包，对于 .bin 文件结构的初步分析，请移步 [此处](/blog/中育/2023-01-23-zy-bin-file-analysis)
:::

:::warning
仅适用于老版笔记文件（蓝色）。
:::

## 获取 *.proto 文件
解压 中育云笔记1.9.16.apk，找到下列文件
```
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
```
或者说根目录下的所有 *.proto 文件

和文件夹
```
/google
/utils
/enums
```

解压到与 protoc.exe 处在同一目录下的 protobuf 文件夹中，同时在该目录新建 gen 文件夹

## 修正 *.proto 文件
这些 protobuf 文件中存在一些重复定义的错误，在编译之前需要先进行修正
```proto
//file: "SketchHeader.proto"
//原名 Header
message SketchHeader {
  //...
}
```
```proto
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
```
```proto
//file: "DrawBoard.proto"
//添加引用
import "utils/PointF.proto";
//...
```

## 生成编解码器
定位到 protoc.exe 所在目录，执行如下命令
```bat
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
```

:::info
为避免 protobuf 文件互相调用产生异常，请逐行执行
:::

## 开始解析
新建 C# 命令行应用，将生成的 gen 文件夹拷贝至项目目录，使用以下代码对 actions.bin 文件进行第一步的解析：
```csharp
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
```


```json
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
```

## 画板背景
注意到 resetData 中的 "backgroundColor": -1  
下方会解释 -1 的由来，在此先上结论：-1 代表的颜色是白色  
以上的代码中，颜色值为 -1 的仅有这一项，大胆猜测这一项控制画板背景色


## 解析图片

在此，我们只关注结果而非过程，所以，忽略所有 ACTION 项，仅保留 GRAPH 项。

:::info
经过多次的更改和比对，我们发现 ACTION 项在每次发生更改时都会重写，故此处忽略 ACTION 项应当是安全的
:::

另外，注释中如此描写 "resetData"
```proto
//file: "DrawBoard.proto"
message ActionContent{
    ActionEnum type = 1;
    google.protobuf.Any action = 2;
    GraphData graphSnapshot = 3;

    GraphResetData resetData = 5;//恢复时需要的数据
}
```
可以看出，此项应该配置清空画板时执行的操作，在此可以一并忽略。

:::info
另外，此项在发生更改时也会重写，故此处忽略应当是安全的
:::

"boardHead" 项与在[此处](/blog/中育/2023-01-23-zy-bin-file-analysis)分析的相同，不在此赘述

现在我们余下的内容有
```json
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
```

进一步研究各 protobuf 文件，可以发现 "graphSnapshot", "childGraph" 项可以无限嵌套
```proto
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
```
所以用递推处理这些数据

我们发现 extra 项仍未解析，先对 extra 项进行解析
```csharp
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
                Console.WriteLine(FormatJson(touch.ToString()));
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
```
此处一并解析了画笔数据

```json
{
    "fileName": "62f3501cbd06419db1f38a1e8433a387.jpg",
    "width": 1306,
    "height": 980,
    "viewWidth": 1920,
    "viewHeight": 1200
}
```
输出了图片的文件信息  
有了这些，便可以尝试解决 matrix 项了

正如其名， matrix 项实则是一个 3x3 的矩阵
上方一个最特殊的矩阵为

$$
\begin{bmatrix}
1 & 0 & 307 \\
0 & 1 & 110 \\
0 & 0 & 1
\end{bmatrix}
$$

307, 110 是怎么来的呢？
很简单

$$
(1920-1306)/2=307 \\\\
(1200-980)/2=110
$$

也就是说，这个矩阵的内容是这样的

$$
\begin{bmatrix}
1 & 0 & x \\
0 & 1 & y \\
0 & 0 & 1
\end{bmatrix}
$$

论理，x,y 应该是图像左上角相对父容器左上角的位置


现在，将图片旋转，重新获取并解析 actions.bin 文件，这个矩阵变成了这个样子

$$
\begin{bmatrix}
0.8182268 & 0.3730026 & 256.97064 \\
-0.3730026 & 0.8182268 & 462.10107 \\
0 & 0 & 1
\end{bmatrix}
$$

第三行没有变化，很好


对比预览图像，发现$$ a_{13}, a_{23} $$对应的含义似乎仍然正确  
那么另外几项呢？

参考[此处](https://blog.csdn.net/csxiaoshui/article/details/65446125)，直接给出我的猜测

$$
\begin{bmatrix}
k\cdot cos\vartheta & -k\cdot sin\vartheta & x \\
k\cdot sin\vartheta & k\cdot cos\vartheta & y \\
0 & 0 & 1
\end{bmatrix}
$$

k 为缩放比例，𝛳 为旋转角度

:::info
无论如何，x,y 都应当是图像原本的左上角在父容器中的坐标
:::

利用如下代码，我们便可以获知其旋转角度与缩放比例
```csharp
private static void SearchForExtras(GraphData graphData)
{
    //...
    if(graphData.Extra!=null)
    {
        switch (graphData.GraphType)
        {   //...
            case GraphType.ImageGraph:
                File file = File.Parser.ParseFrom(graphData.Extra.Value);
                float[] fileMatrix = graphData.Matrix.ToArray();
                float scale = (float)Sqrt((Math.Pow(fileMatrix[0],2) + Pow(fileMatrix[1],2)));
                float angle = CalcAngle(-fileMatrix[1] / scale, fileMatrix[0] / scale);
                //...
        }
    }
    //...
}
private static float CalcAngle(float sin, float cos)
{
    if (sin > 0 && cos > 0)
        return (float)(Asin(sin) / PI) * 180;
    if (sin > 0 && cos < 0)
        return (float)(Acos(cos) / PI) * 180;
    if (sin < 0 && cos > 0)
        return (float)(Asin(sin) / PI) * 180;
    return 180 - (float)(Asin(cos) / PI) * 180;
}
```

:::info o((⊙﹏⊙))o.
实际生成预览图像时遇到了一些问题，这里的代码以后再说
:::

## 解析画笔
### 分析
利用上方代码，解析画笔
```json
{
    "pointF": [
        {
            "x": 810.5778,
            "y": 692.423
        },
        {
            "x": 855.1178,
            "y": 661.12164
        },
        {
            "x": 927.85095,
            "y": 613.9249
        },
        {
            "x": 1014.9286,
            "y": 565.3644
        },
        {
            "x": 1099.9272,
            "y": 517.06915
        },
        {
            "x": 1127.4127,
            "y": 507.57703
        }
    ]
}
```
在 STROKE_GRAPH 中，还定义了画笔颜色与粗细
```json
"childGraph": [
{
    "graphType": "STROKE_GRAPH",
    "matrix": [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
    ],
    "childExtendMatrix": [
        1,
        0,
        1621.1556,
        0,
        1,
        1200,
        0,
        0,
        1
    ],
    "width": 3,
    "color": -16777216,
    "extra": {
        "@type": "type.googleapis.com/Touch",
        "@value": "CgoN+6RKRBUSGy1ECgoNisdVRBXJRyVECgoNdvZnRBUyexlECgoNbrt9RBVSVw1ECgoNrH2JRBVtRAFECgoNNe2MRBXcyf1D"
    },
    "name": "StrokeGraph-240780797",
    "outRect": {
        "left": 810.5778,
        "top": 507.57703,
        "right": 1127.4127,
        "bottom": 693.423
    }
}
]

```

### 颜色
将 color 值转换为十六进制为 FF000000，是 ARGB 表示

使用 GDI+ 将各点连线，并将十六进制数值打印在每条线的第一个点旁

```csharp
static Bitmap mainBitmap = null;
static void Main(string[] args)
{
    while (true)
    {
        string fn = Console.ReadLine();
        using (FileStream fileStream = System.IO.File.OpenRead(fn))
        {
            DrawBoard drawBoard = DrawBoard.Parser.ParseFrom(fileStream);
            mainBitmap=new Bitmap(drawBoard.BoardHead.Width, drawBoard.BoardHead.Height);
            Graphics graphics = Graphics.FromImage(mainBitmap);
            graphics.Clear(Color.White);
            graphics.Save();
            graphics.Dispose();
            foreach (var i in drawBoard.BoardBody.ActionContent)
            {
                SearchForExtras(i.GraphSnapshot);
            }
            mainBitmap.Save("1.png", ImageFormat.Png);
            Process.Start("explorer.exe","1.png");
        }
    }
}

private static void SearchForExtras(GraphData graphData)
{
    //...
    if(graphData.Extra!=null)
    {
        switch (graphData.GraphType)
        {
            //...
            case GraphType.StrokeGraph:
                Touch touch = Touch.Parser.ParseFrom(graphData.Extra.Value);
                List<PointF> pointFs = new List<PointF>(touch.PointF);
                List<System.Drawing.PointF> pointFs1= new List<System.Drawing.PointF>();
                foreach (var pointf in pointFs)
                {
                    pointFs1.Add(new System.Drawing.PointF(pointf.X, pointf.Y));
                }
                Graphics graphics = Graphics.FromImage(mainBitmap);
                graphics.DrawString(graphData.Color.ToString("X"), new Font("微软雅黑", 30), Brushes.Black, pointFs1[0]);
                graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
                if (pointFs.Count > 1)
                    graphics.DrawCurve(new Pen(Color.Black, graphData.Width), pointFs1.ToArray());
                // 条件判断是必须的，若仅有一个点，DrawCurve 将抛出异常
                graphics.Save();
                graphics.Dispose();
                break;
                //...
        }
    }
    //...
}
```

![alt 颜色分析 1](/assets/img/blog/bin-analysis/color-analysis-1.png)

可以看出，的确是 ARGB 格式

### 上色
利用如下代码，转换颜色并上色
```csharp
static Color AndroidColorToDrawingColor(int androidColor)
{
    string HexColorString=androidColor.ToString("X");
    int a = Convert.ToInt32(HexColorString.Substring(0, 2), 16);
    int r = Convert.ToInt32(HexColorString.Substring(2, 2), 16);
    int g = Convert.ToInt32(HexColorString.Substring(4, 2), 16);
    int b = Convert.ToInt32(HexColorString.Substring(6, 2), 16);
    return Color.FromArgb(a, r, g, b);
}

private static void SearchForExtras(GraphData graphData)
{
    //...
    if(graphData.Extra!=null)
    {
        switch (graphData.GraphType)
        {
            //...
            case GraphType.StrokeGraph:
                /...
                if (pointFs.Count > 1)
                    //graphics.DrawCurve(new Pen(Color.Black, graphData.Width), pointFs1.ToArray());
                    graphics.DrawCurve(new Pen(AndroidColorToDrawingColor(graphData.Color), graphData.Width), pointFs1.ToArray());
                //...
        }
    }
    //...
}
```
![alt 颜色分析 2](/assets/img/blog/bin-analysis/color-analysis-2.png)
成功

:::info
对于 STROKE_GRAPH， 也存在 matrix 的旋转与缩放，此处仍未处理
:::