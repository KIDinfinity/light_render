import { renderHook } from '@testing-library/react-hooks';
import useGetTableColumnsByPageConfig from 'basic/hooks/useGetTableColumnsByPageConfig';
jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: (obj: any) => {
      const typeCode = Object.keys(obj)[0];
      const dictCode = Object.values(obj)[0];
      const mockData = {
        Label_BIZ_Claim: {
          age: 'customer age',
          name: 'user name',
        },
        gender: {
          M: 'Male',
        },
      };
      return mockData[typeCode][dictCode];
    },
  };
});
jest.mock('basic/components/Elements/hooks/useGetSectionAtomConfig', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        field: 'customerAge',
        fieldType: 'Text',
        'field-props': {
          visible: 'Y',
          'x-layout': {
            lg: {
              order: 2,
              span: 6,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'age',
          },
        },
      },
      {
        field: 'useName',
        fieldType: 'Text',
        'field-props': {
          visible: 'C',
          'x-layout': {
            lg: {
              order: 1,
              span: 2,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'name',
          },
        },
      },
      {
        field: 'test',
        fieldType: 'Text',
        'field-props': {
          visible: 'N',
          'x-layout': {
            lg: {
              order: 1,
              span: 2,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'name',
          },
        },
      },
    ];
  });
});

describe('getTableColumnsByPageConfig', () => {
  test('get columns', () => {
    const localConfig = {};
    const section = '';
    const renderer = renderHook(() => useGetTableColumnsByPageConfig({ localConfig, section }));
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'useName',
        id: 'useName',
        span: 2,
        title: 'user name',
        width: '20%',
      },
      {
        fieldName: 'customerAge',
        id: 'customerAge',
        span: 6,
        title: 'customer age',
        width: '60%',
      },
    ]);
  });
});
