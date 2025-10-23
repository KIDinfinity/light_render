import findFieldConfig from 'basic/utils/findFieldConfig';

describe('findFieldConfig', () => {
  test('params error', () => {
    const result = findFieldConfig({
      configs: 233,
      field: '',
    });
    expect(result).toEqual({});
  });
  test('find field config ', () => {
    const result = findFieldConfig({
      field: 'a',
      configs: [
        {
          field: 'a',
          label: 'a',
          fieldType: 'Text',
        },
        {
          field: 'b',
          label: 'b',
          fieldType: 'Text',
        },
      ],
    });
    expect(result).toEqual({
      field: 'a',
      label: 'a',
      fieldType: 'Text',
    });
  });
});
