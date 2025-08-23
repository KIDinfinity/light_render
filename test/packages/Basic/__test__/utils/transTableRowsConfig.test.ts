import transTableRowsConfig from 'basic/utils/transTableRowsConfig';

jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: (obj: any) => {
      const typeCode = Object.keys(obj)[0];
      const dictCode = Object.values(obj)[0];
      const mockData = {
        Label_BIZ_Claim: {
          user: 'User',
          age: 'Age',
        },
      };
      return mockData[typeCode][dictCode];
    },
  };
});
jest.mock('basic/utils/transFieldValue', () => {
  return ({ configItem }: any) => {
    if (configItem.fieldType === 'Dropdown') {
      return '6666';
    }
    if (configItem.fieldType === 'Date') {
      return '2021/2/2';
    }
    if (configItem.fieldType === 'Number') {
      return 2;
    }
  };
});
describe('test trans to table rows', () => {
  it('config is empty', () => {
    const config = [];
    const result = transTableRowsConfig({
      config,
    });
    expect(result).toEqual([]);
  });
  // it('test text type', () => {
  //   const config = [
  //     {
  //       field: 'user',
  //       fieldType: 'Text',
  //       'field-props': {
  //         'x-layout': {
  //           lg: {
  //             order: 1,
  //           },
  //         },
  //         label: {
  //           dictTypeCode: 'Label_BIZ_Claim',
  //           dictCode: 'user',
  //         },
  //         'x-dict': {
  //           dictTypeCode: 'gender',
  //         },
  //         visible: 'Y'
  //       },
  //     },
  //   ];
  //   const result = transTableRowsConfig({
  //     config,
  //   });
  //   expect(result).toEqual([
  //     {
  //       key: 'user',
  //       title: 'User',
  //       dataIndex: 'user',
  //     },
  //   ]);
  // });
  // it('test number type', () => {
  //   const config = [
  //     {
  //       field: 'user',
  //       fieldType: 'Number',
  //       'field-props': {
  //         'x-layout': {
  //           lg: {
  //             order: 1,
  //           },
  //         },
  //         label: {
  //           dictTypeCode: 'Label_BIZ_Claim',
  //           dictCode: 'user',
  //         },
  //         'x-dict': {
  //           dictTypeCode: 'gender',
  //         },
  //         visible: 'Y'
  //       },
  //     },
  //   ];
  //   const result = transTableRowsConfig({
  //     config,
  //   });
  //   expect(result[0].render()).toBe(2);
  // });
  // it('test dropdown type', () => {
  //   const config = [
  //     {
  //       field: 'user',
  //       fieldType: 'Dropdown',
  //       'field-props': {
  //         'x-layout': {
  //           lg: {
  //             order: 1,
  //           },
  //         },
  //         label: {
  //           dictTypeCode: 'Label_BIZ_Claim',
  //           dictCode: 'user',
  //         },
  //         'x-dict': {
  //           dictTypeCode: 'gender',
  //         },
  //         visible: 'Y'
  //       },
  //     },
  //   ];
  //   const result = transTableRowsConfig({
  //     config,
  //   });
  //   expect(result[0].render()).toBe('6666');
  // });
  // it('test date type', () => {
  //   const config = [
  //     {
  //       field: 'user',
  //       fieldType: 'Text',
  //       'field-props': {
  //         'x-layout': {
  //           lg: {
  //             order: 1,
  //             span: 12,
  //           },
  //         },
  //         label: {
  //           dictTypeCode: 'Label_BIZ_Claim',
  //           dictCode: 'user',
  //         },
  //         'x-dict': {
  //           dictTypeCode: 'gender',
  //         },
  //         visible: 'Y'
  //       },
  //     },
  //     {
  //       field: 'age',
  //       fieldType: 'Text',
  //       'field-props': {
  //         'x-layout': {
  //           lg: {
  //             order: 1,
  //             span: 12,
  //           },
  //         },
  //         label: {
  //           dictTypeCode: 'Label_BIZ_Claim',
  //           dictCode: 'age',
  //         },
  //         'x-dict': {
  //           dictTypeCode: 'gender',
  //         },
  //         visible: 'Y'
  //       },
  //     },
  //   ];
  //   const result = transTableRowsConfig({
  //     config,
  //   });
  //   expect(result).toEqual([
  //     {
  //       key: 'user',
  //       title: 'User',
  //       dataIndex: 'user',
  //       width: '50%',
  //     },
  //     {
  //       key: 'age',
  //       title: 'Age',
  //       dataIndex: 'age',
  //       width: '50%',
  //     },
  //   ]);
  // });
  it('test span config', () => {});
});
