---
title: Github Pages 自定义域名天坑
---

我的假期~~~
---


这个问题排查的半天，记录一下。  
适用于自定义域名的 Github Pages， 并使用了 Cloudflare CDN

# 结论
![Enforce HTTPS 选项](/assets/img/blog/github-pages-issue/enforce-https.png)
正常情况下，这里的复选框应该是 disabled, unchecked.  
但是今天把某仓库从 React 迁移到 Vue 的时候重新建立了仓库，重新启用 Pages 之后，这里变成了 disabled, checked，并且默认的域名从 djdjz7.top 回退到了 djdjz7.github.io。

# 解决方法
这个仓库是用 Actions 部署的，可以去 Pages 设置下面把 Source 改成 Deploy from a branch，branch 设置成 None 关闭 Pages，再重新把 Source 改回 Actions，这个复选框就正常了。

# 事件经过
## 起因
脑子一热，想要把个人主页从 React 迁移到 Vue，然后删除了原来的仓库，新建并重新开启的 Pages，本地测试一切正常，push, deploy 一气呵成。然后...
![Too many redirects](/assets/img/blog/github-pages-issue/too-many-redirects.png)

## 经过
搜索后发现将 Cloudflare SSL 模式改为“完全（严格）”可以解决这个问题，然后就这么干了，于是七牛云的存储就挂了。显示 SSL 证书异常。  
现在的目标变为：保留 SSL 模式为“灵活”情况下，解决重定向次数过多问题。  
发现前几天部署的 [And I Quote](https://quote.djdjz7.top) 还能访问，于是对比 Github Pages 设置页面，发现了以上问题。  
然后去翻 Pages FAQ，没有，搜 Community 也没有找到类似的（相反的倒是一堆），最后发现了上面的办法。

## 结果
似乎是 Pages 把默认域名回滚到了 djdjz7.github.io，这个域名又强制开启 HTTPS 的样子，然后自定义域名之后也没有更新这个选项的样子，造成了这个奇妙问题。

# 更新
2023/07/26 新建了仓库测试，好像这个问题已经修复了，所以到底是谁的问题？