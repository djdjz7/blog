---
title: 文章
---

<script setup>
import { data as posts } from './articles.data.js'
console.log(posts)
</script>

<h1>文档</h1>
  <ul>
    <li v-for="post of posts" list-none>
      <PostEntry :excerpt="post.excerpt" :title="post.frontmatter.title" :splash-image-source="post.frontmatter.splash" :url="post.url"/>
    </li>
  </ul>
