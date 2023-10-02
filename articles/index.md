---
title: 文章
---

<script setup>
import { data as posts } from './articles.data.js'
</script>

<ClientOnly>
  <h1>文章</h1>
  <ul style="padding-left:0">
    <li v-for="post of posts" list-none>
      <PostEntry v-if="post.frontmatter.title != $frontmatter.title" :excerpt="post.excerpt" :title="post.frontmatter.title" :splash-image-source="post.frontmatter.splash" :url="post.url"/>
    </li>
  </ul>
</ClientOnly>