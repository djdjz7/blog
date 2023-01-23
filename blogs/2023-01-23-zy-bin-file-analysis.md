---
layout: post
title: 中育云笔记 .bin 文件解析
sitemap: true
hide_last_modified: true
---

# 前言
众所周知，中育云笔记中的笔记格式以 .bin 格式存储  
从平板 设置->WLAN->高级WLAN设置 中也可以看到每一份笔记中的每一页分别存储为 header.bin 和 actions.bin  
下面将介绍对于两份 .bin 文件的分析历程

# 准备工作
- 创建含不同内容的笔记
  - 一份空白笔记
  - 一份含黑色划线的笔记
  - 一份含长黑色划线的笔记
  - 一份含红色划线的笔记
  - 一份含图片的笔记
- 获取五份笔记的 ID
- 调用中育 API 分别获取五份笔记的两份 .bin 文件
- 重命名