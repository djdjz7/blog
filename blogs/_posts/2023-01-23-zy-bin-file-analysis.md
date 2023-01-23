---
layout: post
title: 中育云笔记 .bin 文件解析
image:
  path: /assets/img/blogs/bin-analysis/splash.png
sitemap: true
---
q(≧▽≦q)

* this unordered seed list will be replaced by the toc
{:toc}

## 前言
众所周知，中育云笔记中的笔记格式以 .bin 格式存储  
从平板 设置->WLAN->高级WLAN设置 中也可以看到每一份笔记中的每一页分别存储为 header.bin 和 actions.bin  
下面将介绍对于两份 .bin 文件的分析历程

## 准备工作
- 创建含不同内容的笔记
  - 一份空白笔记
  - 一份含黑色划线的笔记
  - 一份含长黑色划线的笔记
  - 一份含红色划线的笔记
  - 一份含图片的笔记
- 获取五份笔记的 ID
- 调用中育 API[^1] 分别获取五份笔记的两份 .bin 文件
- 重命名以准备分析
- 获取一份中育云笔记安装包

## 初步分析
![alt Binary Viewer](/assets/img/blogs/bin-analysis/binary-viewer.jpg)  
使用 Binary Viewer 打卡其中一份 actions.bin 文件，注意到其中 type.googleapis.com/* 字样，经过搜索，初步判断该格式为 [Protocol Buffers](https://protobuf.dev/)(下简称 protobuf) 编码的输出文件。  

## 反编译
使用 [dex2jar](https://github.com/pxb1988/dex2jar) 和 [jg-gui](https://github.com/java-decompiler/jd-gui) 反编译中育云笔记 apk 文件

此处使用中育云笔记 1.9.8 为例，不同版本结果可能有所不同
{:.note}

注意到 apk 目录下 /google/protobuf 目录，进一步佐证上面的猜测

## 分析 header.bin
准备 [protobuf 工具包](https://github.com/protocolbuffers/protobuf/releases)，执行如下命令
~~~bat
// file: "CMD"
protoc.exe --decode-raw header.bin
~~~

观察输出


[^1]: GET http://note.func.zykj.org/api/Resources/GetByFileId? {AES加密内容，明文为 fileId={fileID}}