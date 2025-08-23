const removeSectionProps =({ content }) => {
  if (content.match(/section/)?.length === 1) {
    const result = content.replace(/section,?\s/, '')
    return result
  }
  return content
}

module.exports = { removeSectionProps }
