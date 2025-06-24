interface SiteConfiguration {
  markdown: {
    container: {
      warningLabel?: string
      errorLabel?: string
      infoLabel?: string
      expanderLabel?: string
    }
  }
  getRouteCategoryTitle: (routeSegment: string) => string
  titleSuffix: string
  theme: 'normal' | 'new-year'
  pureStatic?: boolean
}

export const RouteTitleRecord: Record<string, string> = {
  blog: '博客',
  articles: '文章',
}

export const SiteConfiguration: SiteConfiguration = {
  markdown: {
    container: {
      warningLabel: '警告',
      errorLabel: '错误',
      infoLabel: '信息',
      expanderLabel: '更多',
    },
  },
  getRouteCategoryTitle: (routeSegment) => RouteTitleRecord[routeSegment],
  titleSuffix: '彩笔的部落阁',
  theme: 'normal',
  pureStatic: true,
}
