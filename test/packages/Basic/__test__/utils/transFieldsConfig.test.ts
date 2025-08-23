import transFieldsConfig from 'basic/utils/transFieldsConfig';

jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: (obj: any) => {
      const typeCode = Object.keys(obj)[0];
      const dictCode = Object.values(obj)[0];
      const mockData = {
        Label_BIZ_Claim: {
          a: 'name',
          b: 'age',
        },
        gender: {
          M: 'Male',
        },
      };
      return mockData[typeCode][dictCode];
    },
  };
});

describe('test transFieldsConfig', () => {
  it('config not a array', () => {
    const result = transFieldsConfig({
      config: 233,
    });
    expect(result).toEqual([]);
  });
  it('test visible is Y', () => {
    const config = [
      {
        field: 'b',
        fieldType: 'Dropdown',
        'field-props': {
          'x-layout': {
            lg: {
              order: 1,
              span: 3,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'b',
          },
          'x-dict': {
            dictTypeCode: 'gender',
          },
          visible: 'Y',
        },
      },
    ];
    const result = transFieldsConfig({
      config,
    });
    expect(result).toEqual([
      {
        order: 1,
        field: 'b',
        label: 'age',
        fieldType: 'Dropdown',
        dropdownTypeCode: 'gender',
        span: 3,
        visible: 'Y',
      },
    ]);
  });
  it('test visible is C', () => {
    const config = [
      {
        field: 'b',
        fieldType: 'Dropdown',
        'field-props': {
          'x-layout': {
            lg: {
              order: 1,
              span: 3,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'b',
          },
          'x-dict': {
            dictTypeCode: 'gender',
          },
          visible: 'C',
        },
      },
    ];
    const result = transFieldsConfig({
      config,
    });
    expect(result).toEqual([
      {
        order: 1,
        field: 'b',
        label: 'age',
        fieldType: 'Dropdown',
        dropdownTypeCode: 'gender',
        span: 3,
        visible: 'C',
      },
    ]);
  });
});
