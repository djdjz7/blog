---
title: 文章
type: index
---

<script setup>
import { data as posts } from './articles.data.js'
</script>

  <h1>文章</h1>
  <div style="padding-left:0" grid="~ md:cols-2 gap-4">
    <div v-for="post of posts">
      <PostEntry :excerpt="post.excerpt" :title="post.frontmatter.title" :splash-image-source="post.frontmatter.splash" :url="post.url"/>
    </div>
  </div>