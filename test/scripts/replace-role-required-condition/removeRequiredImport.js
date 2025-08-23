const removeRequiredImport = ({ content, path }) => {
  if (/const\s+requiredByRole\s+=/.test(content)) {
    const requiredReg = /\s+Required/g
    let count = 0

    for (const i of content.matchAll(requiredReg)) {
      count += 1
    }
    console.log('path', path, 'count', count)
    if (count === 1) {
      const result = content?.replace(/\s+Required,/,'')
      return result
    }
  }
  return content
}


module.exports = { removeRequiredImport }
