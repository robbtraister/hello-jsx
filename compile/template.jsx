
const React = require('react')

function unpack (mod) {
  return (mod && mod.__esModule && mod.default)
    ? mod.default
    : mod
}

const Fusion = window.Fusion = window.Fusion || {}
Fusion.components = Fusion.components || {}
Fusion.components['layouts'] = Fusion.components['layouts'] || {}
Fusion.components['layouts']['dark'] = unpack(require('../src/components/layouts/dark'))
Fusion.components['features'] = Fusion.components['features'] || {}
Fusion.components['features']['header'] = unpack(require('../src/components/features/header'))
Fusion.components['features']['body'] = unpack(require('../src/components/features/body'))

function createElement (node) {
  return React.createElement(
    Fusion.components[node.collection][node.type],
    {},
    [].concat(node.children || []).map(createElement)
  )
}

Fusion.tree = {"collection":"layouts","type":"dark","children":[{"collection":"features","type":"header"},{"collection":"features","type":"body"}]}
const App = createElement(Fusion.tree)
window.render(App)
