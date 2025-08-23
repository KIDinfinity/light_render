const removeElementConfigTagEnd =({ content }) => {
  if (typeof content === 'string') {
    return content.replace(/\s+\<\/ElementConfig.Field\>/, '')
  }
  return content
};

module.exports = {removeElementConfigTagEnd}
