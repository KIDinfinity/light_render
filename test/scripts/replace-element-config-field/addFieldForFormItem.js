const addFieldForFormItem = ({ content }) => {
  if (typeof content === 'string') {
    const reg = /(\<FormItem\s+)/
    if (reg.test(content)) {
      const contentSet = new Set();
      console.log('test past')
      for(const text of content.split(reg)) {
        if (/^\<FormItem/.test(text)) {
          console.log('text matched here', text)
          contentSet.add(text)
          contentSet.add("field={field} ")
        } else {
          contentSet.add(text)
        }
      }
      // console.log('array', Array.from(contentSet))
      const result = Array.from(contentSet).join('');
      return result;
    }
  }
  return content;
}

module.exports = {
  addFieldForFormItem
}
