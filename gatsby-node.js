/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fs = require("fs")
const yaml = require("js-yaml")

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const products = yaml.safeLoad(fs.readFileSync("./src/data/products.yml", "utf-8"))
  products.forEach(product => {
    createPage({
      path: `p/*-${product.sku}/`,
      component: require.resolve("./src/templates/product.tsx"),
      context: {
        sku: product.sku,
        price: product.price,
      },
    })
  })
}