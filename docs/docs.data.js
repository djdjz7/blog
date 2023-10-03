import { createContentLoader } from 'vitepress'

export default createContentLoader('docs/*.md', {
    excerpt: true,
    transform(rawData) {
        return rawData.filter((x)=>{
            return x.frontmatter.type != "index";
        })
    }
})