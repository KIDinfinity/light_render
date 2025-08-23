const { exec } = require("child_process");

const replaceRequired = ({ content, path }) => {
  if (/const\s+requiredByRole\s+=/.test(content)) {
    const reg = /config\?\.\['field-props'\]\?\.required\s+===\s+Required\.Conditions\s+\?\s+requiredConditions\s+:\s+\(config\?\.\['field-props'\]\?\.required\s+\|\|\s+fieldProps\.required\)\s+===\s+Required\.Yes/
    const reg2 = /config\?\.required\s+===\s+Required\.Conditions\s+\?\s+requiredConditions\s+:\s+\(config\.required\s+\|\|\s+fieldProps\.required\)\s+===\s+Required\.Yes/
    if (!reg.test(content) && !reg2.test(content)) {
      exec(`echo ${path} >> ./not_replace_requiredFile.log`)
    }
    if (reg.test(content)) {
      const result = content?.replace(reg, 'requiredByRole')
      if (reg.test(result)) {
        return replaceRequired({ content: result, path })
      }
      return result
    }
    if (reg2.test(content)) {
      const newConent = content.replace(reg2, 'requiredByRole')
      if (reg.test(newConent)) {
        return replaceRequired({ content: newConent, path })
      }
      return newConent
    }
  }
  return content
}

module.exports = { replaceRequired }
