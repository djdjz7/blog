---
layout: post
title: OpenFlier Devblog 01
image:
  path: /assets/img/docs/devblog01.png
sitemap: true
---
# OpenFlier Devblog 01
## Progress
We have now implemented Stage 1 (Basic functionalities) and part of Stage 4 (MqttServicePlugin)

## For Developers
IMqttServicePlugin has been fixed as below:
~~~csharp
// file: "PluginInterfaces.cs"
using MQTTnet;

namespace OpenFlier.Plugin
{
    public class MqttServicePluginInfo
    {
        required public string PluginName { get; init; }
        required public string PluginAuthor { get; init; }
        required public string PluginVersion { get; init; }
        required public string RequestedMinimumOpenFlierVersion { get; init; }
        required public long MqttMessageType { get; init; }
        required public bool PluginNeedConfigEntry { get; init; }
        required public string PluginDescription { get; init; }
    }
    public interface IMqttServicePlugin
    {
        public MqttServicePluginInfo GetMqttServicePluginInfo();
        public MqttApplicationMessage PluginMain(string clientID);
        public void PluginOpenConfig();
    }
}
~~~
The interface was built into OpenFlier.Plugin.dll.