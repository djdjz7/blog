import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*/*.md', {
    excerpt: true,
})