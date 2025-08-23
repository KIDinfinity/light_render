const { removeElementConfigTagStart } = require('../removeElementConfigTagStart')

describe('removeElementConfigTagStart', () => {
  test('replace with removeElementConfigTagStart', () => {
    const originContent = `<Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />`;
    const result = removeElementConfigTagStart({
      content: originContent,
    })
    expect(result).toEqual(`<Authority>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />`)
  })
})
