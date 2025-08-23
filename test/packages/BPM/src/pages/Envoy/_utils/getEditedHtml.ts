export default (templateInfo) => {
  const { template, editContent } = templateInfo;
  const curEditedContent = editContent || {};

  //创建dom解析器（原html为template，新content为editContent内的内容，容器为对应id的dom元素）
  const parser = new DOMParser();
  const doc = parser.parseFromString(template, 'text/html');

  Object.entries(curEditedContent).forEach(([key, value]) => {
    //找容器
    const targetElement = doc.getElementById(key);
    if (targetElement) {
      targetElement.innerHTML = value;
    }
  });

  const finalHtmlString = doc.documentElement.outerHTML;
  return finalHtmlString;
};
