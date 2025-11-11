import { defineDocumentType, makeSource } from 'contentlayer/source-files'

/** Article文档类型定义 - 企业文章 */
const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    category: {
      type: 'enum',
      options: ['企業ニュース', 'サービス', 'コーヒー事業', '展示・イベント', '釣具・器具', 'その他'],
      required: true
    },
    image: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
    published: { type: 'boolean', default: true },
    readTime: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    excerpt: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('articles/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/articles/${doc._raw.flattenedPath.replace('articles/', '')}`,
    },
  },
}))

/** News文档类型定义 - 新闻发布 */
const News = defineDocumentType(() => ({
  name: 'News',
  filePathPattern: `news/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    category: {
      type: 'enum',
      options: ['プレスリリース', 'お知らせ', 'イベント情報', 'メディア掲載'],
      required: true
    },
    image: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
    published: { type: 'boolean', default: true },
    readTime: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    excerpt: { type: 'string', required: false },
    externalLink: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('news/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/news/${doc._raw.flattenedPath.replace('news/', '')}`,
    },
  },
}))

/** 产品文档类型定义 */
const Product = defineDocumentType(() => ({
  name: 'Product',
  filePathPattern: `products/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    price: { type: 'string', required: true },
    category: { type: 'string', required: true },
    image: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
    inStock: { type: 'boolean', default: true },
    tags: { type: 'json', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/products/${doc._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
  },
}))

/** Contentlayer配置 */
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article, News, Product],
})
