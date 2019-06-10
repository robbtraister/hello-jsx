'use strict'

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const webpack = require('webpack')

const config = require('../webpack/template')

function getDescendants (node) {
  const children = [].concat(node.children || [])
  return children.concat(...children.map(getDescendants))
}

function collectComponents (renderables) {
  const components = {}
  renderables
    .forEach(({ collection, type }) => {
      components[collection] = components[collection] || {}
      components[collection][type] = {
        collection,
        type,
        import: `../src/components/${collection}/${type}`
      }
    })
  return components
}

function componentImport (component) {
  return `Fusion.components['${component.collection}']['${component.type}'] = unpack(require('${component.import}'))`
}

class Compiler {
  constructor (tree) {
    this.tree = tree
    this.renderables = getDescendants({ children: tree })
  }

  async compile () {
    this.generate()

    const compiler = webpack([].concat(config || []).map(config => ({
      ...config,
      mode: 'production'
    })))
    await new Promise((resolve, reject) => {
      compiler.run((err, ...resp) => err ? reject(err) : resolve(...resp))
    })

    this.concat()
  }

  concat () {
    const stats = require('../dist/stats')

    const entrypoints = stats.children[0].entrypoints

    const chunkMap = {}
    this.renderables.forEach(({ collection, type }) => {
      entrypoints[`components/${collection}/${type}`].chunks
        .filter((chunk) => chunk !== 'runtime')
        .forEach((chunk) => {
          chunkMap[chunk] = true
        })
    })

    const chunks = [].concat(
      ...Object.keys(chunkMap),
      'junk/dist/templates/article'
    )

    execSync(`mkdir -p ${path.join(__dirname, '../dist/templates')}`)
    fs.writeFileSync(
      path.join(__dirname, `../dist/templates/article.js`),
      chunks
        .map((chunk) => fs.readFileSync(path.join(__dirname, `../dist/${chunk}.js`)))
        .join('\n')
    )
  }

  generate () {
    const components = collectComponents(this.renderables)

    const imports = [].concat(
      ...Object.keys(components)
        .map((collection) => {
          return [
            `Fusion.components['${collection}'] = Fusion.components['${collection}'] || {}`
          ]
            .concat(Object.values(components[collection]).map(componentImport))
        })
    )
      .join('\n')

    const template = `
const React = require('react')

function unpack (mod) {
  return (mod && mod.__esModule && mod.default)
    ? mod.default
    : mod
}

const Fusion = window.Fusion = window.Fusion || {}
Fusion.components = Fusion.components || {}
${imports}

function createElement (node) {
  return React.createElement(
    Fusion.components[node.collection][node.type],
    {},
    [].concat(node.children || []).map(createElement)
  )
}

Fusion.tree = ${JSON.stringify(this.tree)}
const App = createElement(Fusion.tree)
window.render(App)
`

    fs.writeFileSync(path.join(__dirname, 'template.jsx'), template)
  }
}

module.exports = Compiler

if (module === require.main) {
  new Compiler(require('./tree')).compile()
}
