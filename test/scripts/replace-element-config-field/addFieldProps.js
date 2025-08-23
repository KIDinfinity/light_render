const addFieldProps = ({ content }) => {
  if (typeof content === 'string') {
    const targetReg = /(const\s+[a-z|A-Z]{1,}\s+=\s+\(\{)/;
    const constLineReg = /const\s+[a-z|A-Z]{1,}\s+=\s+\(\{[\s|\w|\r]+/g
    const match = content.matchAll(constLineReg);
    let result = content
    if (match) {
      for(const matchItem of match) {
        for(const text of matchItem) {
          console.log('text:', text);
          if(!/const\s+FormItem\s+/.test(text) && targetReg.test(text) && !/field/.test(text)) {
            let line = text
            const targetMatch = text.match(targetReg);
            for(const code of targetMatch) {
              if (/field/.test(line)) {
                continue;
              }
              line = line.replace(code, `${code} field,`)
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

module.exports = { addFieldProps }
