/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fs = require("fs")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allProductsYaml {
        edges {
          node {
            sku
          }
        }
      }
    }
  `)

  result.data.allProductsYaml.edges.forEach(({ node }) => {
    createPage({
      path: `p/${node.sku}/*/`,
      component: require.resolve("./src/templates/product.tsx"),
      context: {
        sku: node.sku,
      },
    })
  })
}