---
title: 中育 API 整理
time: 2023-01-24
tags: ['中育']
---

:::warning
内容已严重过时
:::

浅浅整理一下已知的中育 API

以下请求内容均以 C# 形式书写，实际请求时需要序列化为 JSON，有些还需要加密

## 云笔记

:::info
云笔记的大部分 API 都对请求内容和返回值中的 data 做了 AES 加密，但是 AES 的密钥可以在某个地方找到，详见[此处](/blog/zy/bin-file-analysis/part1/#%E9%80%86%E5%90%91%E5%88%86%E6%9E%90)
:::

:::warning
AES 密钥已更改。
:::

### 登录 <Badge type="danger" text="已过时" />

#### 请求地址

POST http://note.func.zykj.org/api/Account/GuestLogin

#### 请求头

```
Content-Type: application/json
```

#### 请求内容

```csharp
//请求时序列化并加密
public class LoginData
{
    public string clientCode { get; set; }
    public string password { get; set; }
    public string schoolCode { get; set; }
    public string smsVerificationCode { get; set; };
    public string userName { get; set; }
}
```

#### 返回值

```csharp
public class CommonResponseData
{
    public int code { get; set; }
    public string msg { get; set; }
    public string data { get; set; }
    // data项解密并反序列化后得到 UserInfo
}

public class UserInfo
{
    public string token { get; set; }
    public int userId { get; set; }
    public string realName { get; set; }
    public int roleType { get; set; }
    public string ezyServer { get; set; }
    public object mobile { get; set; }
    public object clientCode { get; set; }
    public string accessKeyId { get; set; }
    public string accessKeySecret { get; set; }
    public string securityToken { get; set; }
}
```

### 获取所有笔记 <Badge type="danger" text="请求地址已过时" />

#### 请求地址

GET http://note.func.zykj.org/api/Notes/GetAll

#### 请求头

```
Authorization: bearer {UserInfo.Token}
```

#### 请求内容

空

#### 返回值

```csharp
public class CommonResponseData
{
    public int code { get; set; }
    public string msg { get; set; }
    public string data { get; set; }
    // data项解密并反序列化后得到 GetAllNotesResponseData
}

public class GetAllNotesResponseData
{
    public int userId { get; set; }
    public string schoolCode { get; set; }
    public int totalCount { get; set; }
    public NoteInfo[] noteList { get; set; }
}

public class NoteInfo
{
    public string fileId { get; set; }
    public string fileName { get; set; }
    public string fileUrl { get; set; }
    public string parentId { get; set; }
    public int type { get; set; }
    public string createTime { get; set; }
    public string updateTime { get; set; }
    public int version { get; set; }
    public bool shared { get; set; }
}
```

### 获取 OSS 密钥 <Badge type="danger" text="已过时" />

#### 请求地址

GET http://note.func.zykj.org/api/Account/GetOssToken

#### 请求头

```
Authorization: bearer {UserInfo.Token}
```

#### 请求内容

空

#### 返回值

```csharp
public class CommonResponseData
{
    public int code { get; set; }
    public string msg { get; set; }
    public string data { get; set; }
    // data项解密并反序列化后得到 OssAccessResponseData
}

public class OssAccessResponseData
{
    public string accessKeyId { get; set; }
    public string accessKeySecret { get; set; }
    public string securityToken { get; set; }
    public string requestId { get; set; }
}
```

### 添加或更新文件 <Badge type="danger" text="请求地址已过时（未验证）" />

#### 请求地址

POST http://note.func.zykj.org/api/Notes/AddOrUpdate

#### 请求头

```
Authorization: bearer {UserInfo.Token}
Content-Type: application/json
```

#### 请求内容

```csharp
//请求时序列化并加密
public class AddFileData
{
    public string fileId { get; set; }
    public string fileName { get; set; }
    public string fileUrl { get; set; }
    public string parentId { get; set; }
    public int type { get; set; }
}
```

#### 返回值

```csharp
public class MinimumResponseData
{
    public int code { get; set; }
    public string msg { get; set; }
}
```

### 删除笔记 <Badge type="danger" text="请求地址已过时（未验证）" />

#### 请求地址

POST http://note.func.zykj.org/api/Notes/Delete

#### 请求头

```
Authorization: bearer {UserInfo.Token}
Content-Type: application/json
```

#### 请求内容

```
["{NoteInfo.fileId}"]
```

#### 返回值

```csharp
public class MinimumResponseData
{
    public int code { get; set; }
    public string msg { get; set; }
}
```

## 在线专栏

这些 API 暂时没有加密
{:.note}
