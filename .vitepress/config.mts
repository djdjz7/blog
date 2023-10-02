import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import mathjax3 from "markdown-it-mathjax3";
import UnoCSS from "unocss/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [UnoCSS()],
  },
  title: "彩笔的部落阁",
  description: "A VitePress Site",
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "博客", link: "/blog/" },
      { text: "文档", link: "/docs/" },
      { text: "文章", link: "/articles/" },
    ],
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "long",
        timeStyle: "long",
      },
    },
    sidebar: generateSidebar([
      {
        documentRootPath: "/",
        scanStartPath: "blog",
        resolvePath: "/blog/",
        useTitleFromFrontmatter: true,
        collapsed: false,
        excludeFolders: ["node_modules", "assets"],
      },
      {
        documentRootPath: "/",
        scanStartPath: "articles",
        resolvePath: "/articles/",
        useTitleFromFrontmatter: true,
        // hyphenToSpace: true,
        // underscoreToSpace: true,
        collapsed: false,
        excludeFolders: ["node_modules", "assets"],
      },
      {
        documentRootPath: "/",
        scanStartPath: "docs",
        resolvePath: "/docs/",
        useTitleFromFrontmatter: true,
        collapsed: false,
        excludeFolders: ["node_modules", "assets"],
      },
    ]),
    socialLinks: [{ icon: "github", link: "https://github.com/djdjz7" }],
    outline: "deep",
  },
});
