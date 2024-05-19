---
title: 博客
type: index
layout: false
---

<script setup>
import { data as posts } from './blog.data.js'
</script>
<RecentPost category="博客" :frontmatter="posts[0].frontmatter" :url="posts[0].url" :excerpt="posts[0].excerpt"/>
  <div grid="~ md:cols-2 gap-4" m-x-auto max-w-1000px m-y-8 p-x-4 md:p-x-0>
    <div v-for="post of posts">
      <PostEntry :excerpt="post.excerpt" :title="post.frontmatter.title" :splash-image-source="post.frontmatter.splash" :url="post.url"/>
    </div>
  </div>