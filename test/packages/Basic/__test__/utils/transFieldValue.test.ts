import transFieldValue from 'basic/utils/transFieldValue';

jest.mock('moment', () => {
  return () => {
    return {
      format: jest.fn((format) => {
        return format === 'YYYY-MM' ? '2021-05' : '2021/2/2';
      }),
    };
  };
});
jest.mock('@/utils/cache', () => {
  return {
    SS: {
      getItem: jest.fn(() => {
        return {};
      }),
    },
    SSKey: {},
  };
});
jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: (obj: any) => {
      const typeCode = Object.keys(obj)[0];
      const dictCode = Object.values(obj)[0];
      const mockData = {
        gender: {
          M: 'Male',
        },
        Dropdown_COM_CrossSelling: {
          homeLoan: 'Home Loan',
          personalLoan: 'Personal Loan',
        },
      };
      return mockData[typeCode][dictCode];
    },
  };
});

describe('test trans fields value', () => {
  it('text type', () => {
    const result = transFieldValue({
      value: '233',
      configItem: {
        fieldType: 'Text',
      },
    });
    expect(result).toEqual('233');
  });
  it('has not text type', () => {
    const result = transFieldValue({
      value: '233',
      configItem: {},
    });
    expect(result).toEqual('233');
  });
  it('test date type', () => {
    const result = transFieldValue({
      value: '2021-05-17T10:33:55.000+0000',
      configItem: {
        fieldType: 'Date',
      },
    });
    expect(result).toEqual('2021/2/2');
  });
  it('test number type', () => {
    const result = transFieldValue({
      value: 2,
      configItem: {
        fieldType: 'Number',
      },
    });
    expect(result).toEqual('2.00');
  });
  it('test drop down', () => {
    const result = transFieldValue({
      value: 'M',
      configItem: {
        fieldType: 'Dropdown',
        dropdownTypeCode: 'gender',
      },
    });
    expect(result).toEqual('Male');
  });
  it('test date type', () => {
    const result = transFieldValue({
      value: '2021-05-17T10:33:55.000+0000',
      configItem: {
        fieldType: 'Date',
        format: 'YYYY-MM',
      },
    });
    expect(result).toEqual('2021-05');
  });

  it('test extraConfig', () => {
    const result = transFieldValue({
      value: 'F',
      configItem: {
        fieldType: 'Dropdown',
        dropdownTypeCode: 'gender',
        field: 'gender',
      },
      extraConfig: {
        gender: [
          {
            dictCode: 'F',
            dictName: 'Female',
          },
        ],
      },
    });
    expect(result).toEqual('Female');
  });

  it('test multipleDropdown', () => {
    const result = transFieldValue({
      value: 'personalLoan,homeLoan',
      configItem: {
        fieldType: 'Dropdown',
        dropdownTypeCode: 'Dropdown_COM_CrossSelling',
        field: 'crossSelling',
      },
      multipleDropdown: ['crossSelling'],
    });
    expect(result).toEqual('Personal Loan,Home Loan');
  });
});
