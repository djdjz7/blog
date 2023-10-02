---
title: 博客
---

<script setup>
import { data as posts } from './blog.data.js'
console.log(posts)
</script>

<h1>博客</h1>
  <ul>
    <li v-for="post of posts" list-none>
      <PostEntry :excerpt="post.excerpt" :title="post.frontmatter.title" :splash-image-source="post.frontmatter.splash" :url="post.url"/>
    </li>
  </ul>
