const { addConfigProps } = require('../addConfigProps');

describe('addConfigProps', () => {
  test('config is not exist', () => {
    const originContent = `const Clientname = ({ form, editable, section, layout, isShow, id }: any) => (`;
    const result = addConfigProps({
      content: originContent
    });
    expect(result).toEqual('const Clientname = ({ config, form, editable, section, layout, isShow, id }: any) => (')
  })
  test('ignore form item', () => {
    const originContent = `const FormItem = ({ form, editable, section, layout, isShow, id }: any) => (`;
    const result = addConfigProps({
      content: originContent
    });
    expect(result).toEqual(originContent)
  })
  test('config has been exist', () => {
    const originContent = `const FormItem = ({ form, editable, section, layout, isShow, id, config }: any) => (`;
    const result = addConfigProps({
      content: originContent
    });
    expect(result).toEqual(originContent)
  })
})
