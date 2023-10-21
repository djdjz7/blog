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
  lang: "zh-CN",
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详情",
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/assets/img/avatar.png",
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
    outline: {
      level: "deep",
      label: "本页内容",
    },
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶端",
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    }
  },
});
