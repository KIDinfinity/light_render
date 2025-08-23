const { addFieldProps } = require('../addFieldProps');

describe('addFieldProps', () => {
  test('field is not exist', () => {
    const originContent = `const Clientname = ({ form, editable, section, layout, isShow, id }: any) => (`;
    const result = addFieldProps({
      content: originContent
    });
    expect(result).toEqual('const Clientname = ({ field, form, editable, section, layout, isShow, id }: any) => (')
  })
  test('content break', () => {
    const originContent = `const PolicyLevelDecision = ({
      form,
      editable,
      section,
      layout,
      isShow,
      decisionCode,
      caseCategory,
    }: any) => {
      return (
        <AuthorizedAtom currentAuthority={UnderwriteDescrition.underwriteDescrition}>
          <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
            <FormItem
              isShow={isShow}
              layout={layout}
              form={form}
              editable={editable}
              decisionCode={decisionCode}
              caseCategory={caseCategory}
            />
          </ElementConfig.Field>
        </AuthorizedAtom>
      );
    };`
    const result = addFieldProps({
      content: originContent
    });
    expect(result).toEqual(`const PolicyLevelDecision = ({ field,
      form,
      editable,
      section,
      layout,
      isShow,
      decisionCode,
      caseCategory,
    }: any) => {
      return (
        <AuthorizedAtom currentAuthority={UnderwriteDescrition.underwriteDescrition}>
          <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
            <FormItem
              isShow={isShow}
              layout={layout}
              form={form}
              editable={editable}
              decisionCode={decisionCode}
              caseCategory={caseCategory}
            />
          </ElementConfig.Field>
        </AuthorizedAtom>
      );
    };`)
  })
  test('ignore form item', () => {
    const originContent = `const FormItem = ({ form, editable, section, layout, isShow, id }: any) => (`;
    const result = addFieldProps({
      content: originContent
    });
    expect(result).toEqual(originContent)
  })
  test('field has been exist', () => {
    const originContent = `const FormItem = ({ form, editable, section, layout, isShow, id, field }: any) => (`;
    const result = addFieldProps({
      content: originContent
    });
    expect(result).toEqual(originContent)
  })
})
