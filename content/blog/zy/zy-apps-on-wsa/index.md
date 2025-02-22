---
title: WSA 使用中育系软件完全指北
splash: /assets/img/blog/zy-apps-on-wsa/result.png
time: 2023-10-01
---

早上好中育，现在我有 HUAWEI MediaPad C5！我很喜欢 HUAWEI MediaPad C5，但是，Windows Subsystem for Android 我最~喜欢。所以，现在是 Burp Suite 时间~
---



众所周知，中育对其他设备使用用户中心这些软件限制非常严格，那么有没有办法可以绕过这些限制呢
## 步骤
参考[此处](/blog/其他的乱七八糟的东西/2023-09-30-prep-android-for-burp)，搭建 Burp Suite 环境。~~我才不管你哪里来的apk~~  
启动 Burp Suite，在 Proxy settings 中设置 Match and replace rules，替换 head 和 body 中 WSA 设备序列号为平板序列号。  

## 测试结果
应用 | 问题 
:---------:|:---------:
用户中心 | 未见异常 
中育云笔记 | 闪退 
新测评 | 疑似不能提交作业 
随身答 | 拍照搜题异常 