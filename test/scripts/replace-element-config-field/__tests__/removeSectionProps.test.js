const { removeSectionProps } = require('../removeSectionProps')

describe('removeSectionProps from content', () => {
  test('should remove', () => {
    const content = `const Accountholdername = ({ field, config, form, editable, section, layout, isShow }: any) => (`
    const result = removeSectionProps({
      content
    });
    expect(result).toEqual(`const Accountholdername = ({ field, config, form, editable, layout, isShow }: any) => (`)
  })
})
