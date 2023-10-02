---
title: 中育混淆方式
---

# {{ $frontmatter.title }}


中育用过的一些混淆与加密方法。  
个人学习使用，不代表原始代码，只确保效果一致。

## 用户中心网站白名单
```csharp
// 解密
string str = Console.ReadLine();
str=string.Concat(str.Substring(0,str.Length-32).Reverse());
byte[] b = Convert.FromBase64String(str);
Console.WriteLine(Encoding.UTF8.GetString(b));
```

## 中育云笔记（已过时）
已经确认在 2023 年 7 月更新中，AES 密钥发生了更换，此方法已不再可用。
```csharp
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;

namespace FridaySharp
{
    public class AesUtil
    {

        private string key;
        public AesUtil(string AesKey)
        {
            key = string.IsNullOrEmpty(AesKey) ? AesKey : "teEb3gnyru3QCnxv";
        }
        public AesUtil()
        {
            key = "teEb3gnyru3QCnxv";
        }

        public string AesDecrypt(string encryptedStr)
        {
            Aes aes = Aes.Create();
            byte[] bkey = Encoding.UTF8.GetBytes(key);
            byte[] content = Convert.FromBase64String(encryptedStr);
            aes.Mode = CipherMode.ECB;
            aes.Key = bkey;
            aes.Padding = PaddingMode.PKCS7;
            var decryptor = aes.CreateDecryptor();
            byte[] resultArray = decryptor.TransformFinalBlock(content, 0, content.Length);
            decryptor.Dispose();
            return Encoding.UTF8.GetString(resultArray);
        }

        public string AesEncrypt(string decryptedStr)
        {
            Aes aes = Aes.Create();
            byte[] bkey = Encoding.UTF8.GetBytes(key);
            byte[] content = Encoding.UTF8.GetBytes(decryptedStr);
            aes.Mode = CipherMode.ECB;
            aes.Key = bkey;
            aes.Padding = PaddingMode.PKCS7;
            var encryptor = aes.CreateEncryptor();
            byte[] resultArray = encryptor.TransformFinalBlock(content, 0, content.Length);
            encryptor.Dispose();
            return Convert.ToBase64String(resultArray);
        }
    }
}
```