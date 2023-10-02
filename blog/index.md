---
title: 博客
---

<script setup>
import { data as posts } from './blog.data.js'
</script>
<ClientOnly>
  <h1>博客</h1>
  <ul list-outside p-l-0>
    <li v-for="post of posts" list-none>
      <PostEntry v-if="post.frontmatter.title != $frontmatter.title" :excerpt="post.excerpt" :title="post.frontmatter.title" :splash-image-source="post.frontmatter.splash" :url="post.url"/>
    </li>
  </ul>
</ClientOnly>