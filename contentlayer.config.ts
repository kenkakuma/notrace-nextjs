import { defineDocumentType, makeSource } from 'contentlayer/source-files'

/** Article文档类型定义 */
const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    category: { type: 'string', required: true },
    image: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
    readTime: { type: 'string', required: false },
    tags: { type: 'json', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/articles/${doc._raw.sourceFileName.replace(/\.mdx$/, '')}`,
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
  documentTypes: [Article, Product],
})
