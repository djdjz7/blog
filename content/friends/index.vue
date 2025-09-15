<script setup lang="ts">
defineOptions({
  name: 'FriendsPage',
})

type Friend = {
  name: string
  link: string
  avatar: string
  description?: string
}

const friends: Friend[] = [
  {
    name: 'JingXu’s site',
    link: 'https://iculizhi.github.io/',
    avatar: 'https://iculizhi.github.io/images/xj.png',
    description: '关注 xjgg 喵，关注 xjgg 谢谢喵',
  },
  {
    name: '夕落林中',
    link: 'https://www.cnblogs.com/litluo',
    avatar: 'https://pic.cnblogs.com/avatar/1879763/20200708183911.png',
  },
  {
    name: '超几何冰精',
    link: 'https://cirno-baka.github.io/',
    avatar: 'https://avatars.githubusercontent.com/u/53512550?s=96&v=4',
    description: '这个好像死掉惹',
  },
]
</script>

<template>
  <div flex="~ col">
    <div
      v-for="friend in friends"
      :key="friend.link"
      p-y-2
      border-b="1 solid truegray-200/40 dark:dark-100/60 last-of-type:none">
      <a
        :href="friend.link"
        target="_blank"
        grid="~ cols-[auto_1fr] gap-2"
        text-unset
        decoration-none>
        <img :src="friend.avatar" :alt="friend.name" w-16 h-16 rounded-full />
        <div flex="~ col justify-center">
          <span block font-bold text-lg>{{ friend.name }}</span>
          <span block v-if="friend.description">
            {{ friend.description }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>
