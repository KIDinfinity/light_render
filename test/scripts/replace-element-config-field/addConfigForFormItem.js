const addConfigForFormItem = ({ content }) => {
  if (typeof content === 'string') {
    const reg = /(\<FormItem\s+)/
    const contentSet = new Set();
    if (reg.test(content)) {
      console.log('test past')
      for(const text of content.split(reg)) {
        console.log('text', text)
        if (/^\<FormItem/.test(text)) {
          contentSet.add(text)
          contentSet.add("config={config} ")
        }
        if (text !== '') {
          contentSet.add(text)
        }
      }
      const result = Array.from(contentSet).join('');
      return result;
    }
  }
  return content;
}

module.exports = {
  addConfigForFormItem
}
