---
title: 为 Burp Suite 抓包准备 Android 设备
splash: /assets/img/blog/prep-android-for-burp/splash.png
---

妙哉。
---
<img v-if="$frontmatter.splash!=undefined" :src="$frontmatter.splash">

# {{ $frontmatter.title }}

适用于 Android 7 (Nougat) 及以上。  
Android 7 以下可通过 root 设备安装系统级 CA 证书。

## 启动 Burp Suite 代理
## 将 Android 设备连接至 Burp Suite 代理
对于 Windows Subsystem for Android™️ (WSA) 可尝试如下命令行
```shell
adb shell settings put global http_proxy 127.0.0.1:8080
```

## 安装用户 CA 证书
打开 [http://burp/](http://burp/)，点击右上角 CA Certificate 下载证书并转到设置安装。

## 修改 APK 以支持用户 CA 证书
### 解包
下载 [Apktool](https://apktool.org)，以 a.apk 为例，执行：
```shell
java -jar apktool.jar d a.app
```
### 改包
检查 AndroidManifest.xml 中是否已存在以下属性：
```xml
//file: AndroidManifest.xml
<application ... android:networkSecurityConfig="@xml/network_security_config" ...>
```
如果已存在，定位到 a/res/xml/，打开上述文件中指定的文件，否则，在 AndroidManifest.xml 中添加以上属性后在 a/res/xml 下新建 network_security_config.xml。  
向上述已存在文件或新建文件中合并入以下内容：
```xml
<network-security-config> 
    <base-config> 
        <trust-anchors> 
            <certificates src="system" /> 
            <certificates src="user" /> 
        </trust-anchors> 
    </base-config> 
</network-security-config>
```

### 重新打包
重新定位至 apk 目录，执行：
```shell
java -jar apktool.jar b a
```
#### 异常处理
**Invalid resource directory name .../res navigation 等**  
更改打包命令为：
```shell
java -jar apktool.jar b --use-aapt2 a
```

### 签名
#### 生成证书
定位至 a/dist/ 执行：
```shell
keytool -genkeypair -alias key.keystore -keyalg RSA -validity 500000 -keystore key.keystore
```
#### 签名
```shell
jarsigner -keystore key.keystore -signedjar signed.apk a.apk key.keystore  
```


## 安装
```shell
adb install a/dist/signed.apk
```
### 异常处理
**INSTALL_FAILED_INVALID_APK: INSTALL_FAILED_INVALID_APK: Failed to extract native libraries, res=-2**  
更改 AndroidManifest.xml：
```xml
//file: AndroidManifest.xml
...
<application ... android:extractNativeLibs="true" ...>
</application>
...
```
重新打包、签名、安装。

## 参考
[Configuring Burp Suite With Android Nougat - ropnop blog](https://blog.ropnop.com/configuring-burp-suite-with-android-nougat)