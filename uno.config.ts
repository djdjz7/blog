import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'
import { SiteConfiguration } from './src/site'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
  ],
  transformers: [transformerDirectives()],
  shortcuts:
    SiteConfiguration.theme === 'normal'
      ? {
          'text-primary': 'text-blue-500 dark:text-blue-300',
          'bg-primary': 'bg-blue-500 bg-blue-300',
        }
      : {
          'text-primary': 'text-red-500 dark:text-red-300',
        },
    safelist: [
      'bg-blue-200',
      'bg-red-200',
      'bg-green-200',
      'bg-yellow-200',
      'bg-blue-800',
      'bg-red-800',
      'bg-green-800',
      'bg-yellow-800',
      'text-blue-500',
      'text-red-500',
      'text-green-500',
      'text-yellow-500',
    ]
})
