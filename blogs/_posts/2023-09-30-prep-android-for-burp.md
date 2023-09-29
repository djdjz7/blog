---
layout: post
title: 为 Burp Suite 抓包准备 Android 设备
sitemap: true
---
适用于 Android 7 (Nougat) 及以上。

## 启动 Burp Suite 代理
## 将 Android 设备连接至 Burp Suite 代理
Windows Subsystem for Android™️ (WSA) 可尝试如下命令行
~~~shell
adb shell settings put global http_proxy 127.0.0.1:8080
~~~
## 安装用户 CA 证书
打开 [http://burp/](http://burp/),