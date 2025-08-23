export default (htmlString: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const isDomSafe: (arg0: Node) => boolean = dom => {
    if (dom instanceof HTMLElement) {
      if (dom.tagName === 'SCRIPT' || dom.tagName === 'LINK')
        return false
      const attrs = dom.getAttributeNames();
      if(attrs.some(attr => !['style', 'class', 'rowspan', 'colspan'].includes(attr)))
        return false;
      const childNodes: Node[] = [...dom.childNodes];
      if(childNodes.length) {
        return !childNodes.some(childNode => !isDomSafe(childNode))
      }
    }
    return true;
  }
  const body = doc.body;
  const nodeToRemove = [...body.childNodes].filter(dom => !isDomSafe(dom))

  nodeToRemove.map(node => {
    body.removeChild(node)
  })
  return body.innerHTML;
}
