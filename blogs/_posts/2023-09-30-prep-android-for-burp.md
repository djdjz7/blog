---
layout: post
title: 为 Burp Suite 抓包准备 Android 设备
sitemap: true
---
适用于 Android 7 (Nougat) 及以上。

## 启动 Burp Suite 代理
## 将 Android 设备连接至 Burp Suite 代理
对于 Windows Subsystem for Android™️ (WSA) 可尝试如下命令行
~~~shell
adb shell settings put global http_proxy 127.0.0.1:8080
~~~
## 安装用户 CA 证书
打开 [http://burp/](http://burp/)，点击右上角 CA Certificate 下载证书并转到设置安装。
## 修改 APK 以支持用户 CA 证书
### 解包
下载 [Apktool](https://apktool.org)，以 a.apk 为例，执行：
~~~shell
java -jar apktool.jar d a.app
~~~
### 改包
### 重新打包并签名
### 异常处理

### 安装

### 参考
[Configuring Burp Suite With Android Nougat - ropnop blog](https://blog.ropnop.com/configuring-burp-suite-with-android-nougat)