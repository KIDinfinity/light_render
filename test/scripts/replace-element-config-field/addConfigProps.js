const addConfigProps = ({ content }) => {
  if (typeof content === 'string') {
    const targetReg = /(const\s+[a-z|A-Z]{1,}\s+=\s+\(\{)/;
    const constLineReg = /const\s+[a-z|A-Z]{1,}\s+=\s+\(\{[\s|\w|\r]+/g
    const match = content.matchAll(constLineReg);
    let result = content
    if (match) {
      for(const matchItem of match) {
        for(const text of matchItem) {
          if(!/const\s+FormItem\s+/.test(text) && targetReg.test(text) && !/config/.test(text)) {
            let line = text
            const targetMatch = text.match(targetReg);
            for(const code of targetMatch) {
              if (/config/.test(line)) {
                continue;
              }
              line = line.replace(code, `${code} config,`)
            }
            result = result.replace(text, line)
          }
        }
      }
    }
    return result
  }
  return content;
}

module.exports = { addConfigProps }
