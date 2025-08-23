import replaceTemplateParams from 'bpm/pages/Envoy/_utils/replaceTemplateParams';

describe('replaceTemplateParams', () => {
  it('test replace', () => {
    const template = 'Hello, my name is {{name}}';
    const values = {
      name: 'grey'
    }
    const result = replaceTemplateParams({
      values,
      template,
    });
    expect(result).toEqual('Hello, my name is {{grey}}')
  })
  it('replace multiple time', () => {
    const template = 'He is {{name}}, {{name}} is a FE';
    const values = {
      name: 'grey'
    }
    const result = replaceTemplateParams({
      values,
      template,
    });
    expect(result).toEqual('He is {{grey}}, {{grey}} is a FE')
  })
  it('replace multiple param', () => {
    const template = 'he is {{age}} old, and he is a {{title}}';
    const values = {
      age: 28,
      title: 'FE'
    }
    const result = replaceTemplateParams({
      values,
      template
    })
    expect(result).toEqual('he is {{28}} old, and he is a {{FE}}')
  })
})
