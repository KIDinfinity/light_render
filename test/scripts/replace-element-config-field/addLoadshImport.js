const addLoadshImport = ({ content }) => {
  if (typeof content === 'string') {
    if (!/import\s+lodash\s+from\s+['|"]{1,1}lodash['|"]{1,1}/.test(content)){
      return `import lodash from 'lodash';\n${content}`
    }
  }
  return content
}

module.exports = { addLoadshImport }
