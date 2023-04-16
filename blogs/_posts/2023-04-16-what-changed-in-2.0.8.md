---
layout: post
title: 课堂助手 2.0.8 中，中育更改了什么？
sitemap: true
---

中育在课堂助手 2.0.8/2.0.9，中育云笔记 1.9.18/1.9.20 中做出的更改，导致中育飞车助手不再可用。

那么，中育做出了怎样的更改呢？

*飞车助手消失的一个月*

## CloudRoom
自 2.0.8 起，中育加入了源代码混淆
~~~
[assembly: Dotfuscator("423587:0:0:6.5.0+76d4669002", 0)]
~~~

## CloudRoom.HardwareModule
此模块负责连接密码的生成、UDP 广播和 FTP 服务器的搭建。

在 2.0.8 中，中育将 UDP 端口从 33333 改为 33338，广播内容不变，为
~~~
<IPAdress>::<ConnectCode>
~~~

## CloudRoom.MqttModule
此模块负责 MQTT 服务器搭建、截图功能、投屏功能。

在 2.0.8 中，中育将 MQTT 服务器端口从 61131 改为 61136。

另外，MQTT 消息枚举作以下更改：
~~~csharp
// file: "MessageType.cs"
public enum MessageType : long
{
++	TestReq = 30000L,
++	TestResp = 30001L,
	TeacherScreenCast = 10000L,
	StopScreenCast = 10001L,
	StudentScreenCast = 10002L,
	StudentTopic = 10003L,
	StudentListReq = 10004L,
	ScreenCaptureReq = 10005L,
++	DeviceVerificationReq = 10006L,
++	ScreenCastUserListReq = 10008L,
++	FullScreenCastReq = 10009L,
++	StopSomeoneScreenCastReq = 10010L,
++	DeviceVerificationResp = 20007L,
	TeacherScreenCastResp = 20000L,
	AutoStopScreenCast = 20001L,
	StudentTopicResp = 20003L,
	StudentListResp = 20004L,
	ScreenCaptureResp = 20005L,
	TeacherScreenCastError = 20010L,
++	ScreenCastPortNotice = 20011L,
++	StartScreenCastResp = 20012L,
++	StopScreenCastResp = 20013L
}
~~~
注意这两行
~~~csharp
DeviceVerificationReq = 10006L,
DeviceVerificationResp = 20007L,
~~~
与此同时：
~~~csharp
// file: "MqttService.cs"
private void a(string A_0)
{
	string s = JsonConvert.SerializeObject((object)new global::d<MessageType, global::f<string>>(MessageType.DeviceVerificationResp, new global::f<string>(AesEncrypt(this.o, this.n))));
	IMqttServer obj = this.m_e;
	MqttApplicationMessage val = new MqttApplicationMessage();
	val.set_Topic(A_0);
	val.set_Payload(Encoding.Default.GetBytes(s));
	val.set_QualityOfServiceLevel((MqttQualityOfServiceLevel)2);
	MqttServerExtensions.PublishAsync(obj, val);
}
~~~

非常搞笑的，string s 是一个常量，该赋值表达式等效于：
~~~csharp
string s = "{\"type\":20007,\"data\":{\"topic\":\"Ec1xkK+uFtV/QO/8rduJ2A==\"}}";
~~~

现在我们知道，在收到 10006L 消息时，返回以上的字符串。

###  验证
可以使用 CloudRoom.Emulator 对其进行验证
![alt Emulator](/assets/img/blogs/what-changed-2.0.8/emulator.png)
第一行为 Payload，第二行为 Topic
{:.figcaption}

Topic 为 ClientID

### 解决
~~~csharp
// file: "MqttService.cs"
case (MessageType)6L:
{
	string s5 = "{\"type\":20007,\"data\":{\"topic\":\"Ec1xkK+uFtV/QO/8rduJ2A==\"}}";
	IMqttServer mqttServer = _mqttServer;
	MqttApplicationMessage val = new MqttApplicationMessage();
	val.set_Topic(arg.get_ClientId());
	val.set_Payload(Encoding.Default.GetBytes(s5));
	val.set_QualityOfServiceLevel((MqttQualityOfServiceLevel)2);
	await MqttServerExtensions.PublishAsync(mqttServer, val);
	break;
}
~~~

## CloudRoom.ScreenModule 和 CloudRoom.ControlsModule
不关心