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
    category: { type: "string", required: true },
    image: { type: "string", required: false },
    featured: { type: "boolean", default: false },
    readTime: { type: "string", required: false },
    tags: { type: "string", of: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/articles/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`
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
    tags: { type: "string", of: "string", required: false }
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
  documentTypes: [Article, Product]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-WDLJHLV5.mjs.map
