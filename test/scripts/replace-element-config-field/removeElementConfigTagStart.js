const removeElementConfigTagStart = ({ content }) => {
  if (typeof content === 'string') {
    // return content.replace(/\s+\<ElementConfig.Field config=\{.*\} section=\{section\} field=\{fieldConfig.field\}\>/, '')
    return content.replace(/\s+\<ElementConfig.Field.*\>/, '')
  }
  return content
}

module.exports = { removeElementConfigTagStart }
