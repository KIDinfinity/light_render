const { addConfigForFormItem } = require('../addConfigForFormItem');

describe('add config for formItem', () => {
  test('add config fro form item', () => {
    const originContent = `<FormItem isShow={isShow} layout={layout} form={form} editable={editable} />`
    const result = addConfigForFormItem({
      content: originContent
    });
    expect(result).toEqual(`<FormItem config={config} isShow={isShow} layout={layout} form={form} editable={editable} />`)
  })
  test('content break', () => {
    const originContent = `<FormItem
    isShow={isShow}
    layout={layout}
    form={form}
    editable={editable}
    disabled={disabled}
  />`
  const result = addConfigForFormItem({
    content: originContent,
  })
  expect(result).toEqual(`<FormItem
    config={config} isShow={isShow}
    layout={layout}
    form={form}
    editable={editable}
    disabled={disabled}
  />`)
  })
  test('content not match', () => {
    const originContent = `<Test isShow={isShow} layout={layout} form={form} editable={editable} />`
    const result = addConfigForFormItem({
      content: originContent
    });
    expect(result).toEqual(originContent)
  })
})
