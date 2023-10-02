---
title: 文章
---

<script setup>
import { data as posts } from './articles.data.js'
</script>

<ClientOnly>
  <h1>文章</h1>
  <ul>
    <li v-for="post of posts" list-none>
      <PostEntry :excerpt="post.excerpt" :title="post.frontmatter.title" :splash-image-source="post.frontmatter.splash" :url="post.url"/>
    </li>
  </ul>
</ClientOnly>