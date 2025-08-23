const { removeElementConfigTagEnd } = require('../removeElementConfigTagEnd');

describe('removeElementConfigTagEnd', () => {
  test('remove tag end', () => {
    const originContent = ` <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>`;
  const reuslt = removeElementConfigTagEnd({ content: originContent });
  expect(reuslt).toEqual(` <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
</Authority>`)
  })
})
