import { createContentLoader } from 'vitepress'

export default createContentLoader('docs/*.md', {
    excerpt: true,
})