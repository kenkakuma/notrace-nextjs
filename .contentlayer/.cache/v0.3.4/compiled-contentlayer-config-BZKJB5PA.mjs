// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    category: {
      type: "enum",
      options: ["\u4F01\u696D\u30CB\u30E5\u30FC\u30B9", "\u30B5\u30FC\u30D3\u30B9", "\u30B3\u30FC\u30D2\u30FC\u4E8B\u696D", "\u5C55\u793A\u30FB\u30A4\u30D9\u30F3\u30C8", "\u91E3\u5177\u30FB\u5668\u5177", "\u305D\u306E\u4ED6"],
      required: true
    },
    image: { type: "string", required: false },
    featured: { type: "boolean", default: false },
    published: { type: "boolean", default: true },
    readTime: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    excerpt: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("articles/", "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/articles/${doc._raw.flattenedPath.replace("articles/", "")}`
    }
  }
}));
var News = defineDocumentType(() => ({
  name: "News",
  filePathPattern: `news/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    category: {
      type: "enum",
      options: ["\u30D7\u30EC\u30B9\u30EA\u30EA\u30FC\u30B9", "\u304A\u77E5\u3089\u305B", "\u30A4\u30D9\u30F3\u30C8\u60C5\u5831", "\u30E1\u30C7\u30A3\u30A2\u63B2\u8F09"],
      required: true
    },
    image: { type: "string", required: false },
    featured: { type: "boolean", default: false },
    published: { type: "boolean", default: true },
    readTime: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    excerpt: { type: "string", required: false },
    externalLink: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("news/", "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/news/${doc._raw.flattenedPath.replace("news/", "")}`
    }
  }
}));
var Product = defineDocumentType(() => ({
  name: "Product",
  filePathPattern: `products/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    price: { type: "string", required: true },
    category: { type: "string", required: true },
    image: { type: "string", required: false },
    featured: { type: "boolean", default: false },
    inStock: { type: "boolean", default: true },
    tags: { type: "json", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/products/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Article, News, Product]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-BZKJB5PA.mjs.map
