const { addFieldForFormItem } = require('../addFieldForFormItem');

describe('add field for formItem', () => {
  // test('add field fro form item', () => {
  //   const originContent = `<FormItem isShow={isShow} layout={layout} form={form} editable={editable} />`
  //   const result = addFieldForFormItem({
  //     content: originContent
  //   });
  //   expect(result).toEqual(`<FormItem field={field} isShow={isShow} layout={layout} form={form} editable={editable} />`)
  // })
  // test('content break', () => {
  //   const originContent = `<FormItem
  //   isShow={isShow}
  //   layout={layout}
  //   form={form}
  //   editable={editable}
  //   disabled={disabled}
  // />`
  // const result = addFieldForFormItem({
  //   content: originContent,
  // })
  // expect(result).toEqual(`<FormItem
  //   field={field} isShow={isShow}
  //   layout={layout}
  //   form={form}
  //   editable={editable}
  //   disabled={disabled}
  // />`)
  // })
  // test('content not match', () => {
  //   const originContent = `<Test isShow={isShow} layout={layout} form={form} editable={editable} />`
  //   const result = addFieldForFormItem({
  //     content: originContent
  //   });
  //   expect(result).toEqual(originContent)
  // })
  test('reg test', () => {
    const originContent = `const Remindertype = ({ form, editable, section, layout, isShow }: any) => (
      <Authority>
        <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
          <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
        </ElementConfig.Field>
      </Authority>
    );`
    const result = addFieldForFormItem({
      content: originContent
    });
    expect(result).toEqual(`const Remindertype = ({ form, editable, section, layout, isShow }: any) => (
      <Authority>
        <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
          <FormItem field={field} isShow={isShow} layout={layout} form={form} editable={editable} />
        </ElementConfig.Field>
      </Authority>
    );`)
  })
})
