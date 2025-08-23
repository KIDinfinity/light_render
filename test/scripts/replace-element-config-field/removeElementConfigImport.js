const removeElementConfigImport = ({ content }) => {
  if (typeof content === 'string') {
    return content.replace(/\sElementConfig,\s+/, ' ')
  }
  return content;
}

module.exports = { removeElementConfigImport }
