import { renderHook } from '@testing-library/react-hooks';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';
jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      queryValue: jest.fn((param) => {
        if (typeof param === 'object') {
          return param.value;
        }
        return param;
      }),
      formatFlattenValue: (param) => param,
      cleanValidateData: (param) => param,
    },
  };
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientNameConfig', () => {
  return jest.fn(() => {
    return [
      {
        id: '8fd21edb-8a73-4490-ae78-3553f41f216c',
        creator: 'hedy',
        gmtCreate: '2022-02-16T09:36:47.000+0000',
        modifier: 'hedy',
        gmtModified: '2022-02-16T09:36:47.000+0000',
        deleted: 0,
        transId: '0570f969-dec3-4f20-b527-e8732190acb2',
        region: 'MY',
        codeType: 'premiumBreakDownOrder',
        defaultValue: 'NBP,NBR,NBT,NBA,NST,NSD,ADP,loading Premium',
        remark: 'premium break down order ',
      },
      {
        id: 'b4e43d7a-00b2-4d06-91d1-346b2ec1ce7a',
        creator: 'hedy',
        gmtCreate: '2022-02-15T09:41:54.000+0000',
        modifier: 'hedy',
        gmtModified: '2022-02-15T09:41:54.000+0000',
        deleted: 0,
        transId: '4659e9a8-77aa-418e-b271-dd2fbb9aa597',
        region: 'MY',
        codeType: 'fullNameMerge',
        defaultValue: 'MERGE_WITH_TITLE',
        remark: 'full name merge config ',
      },
      {
        id: 'd66097ba-b2ef-4ece-9728-c389fedd160f',
        creator: 'hedy',
        gmtCreate: '2022-02-15T09:41:54.000+0000',
        modifier: 'hedy',
        gmtModified: '2022-02-15T09:41:54.000+0000',
        deleted: 0,
        transId: '4659e9a8-77aa-418e-b271-dd2fbb9aa597',
        region: 'MY',
        codeType: 'clientName',
        defaultValue: 'Local Name',
        remark: 'client name language config : English Name/Local Name',
      },
    ];
  });
});

jest.mock('basic/components/Elements/hooks/useGetSectionAtomConfig', () => {
  return jest.fn(() => {
    return [
      {
        caseCategory: 'BP_NB_CTG001',
        activityCode: 'BP_NB_ACT004',
        section: 'CommonClientInfo-Field',
        field: 'title',
        fieldType: 'Dropdown',
        regionCode: 'TH',
        magnification: null,
        changeOperation: null,
        changeParam: null,
        changeResultLimitMin: null,
        'field-props': {
          visible: 'Y',
          editable: 'Y',
          required: 'N',
          expand: 'N',
          maxLength: null,
          label: {
            dictTypeCode: 'Label_BIZ_Individual',
            dictCode: 'Title',
            type: null,
          },
          layouts: [
            {
              layoutName: 'x-layout',
              layout: {
                xs: {
                  span: 12,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                sm: {
                  span: 12,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                md: {
                  span: 12,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                lg: {
                  span: 12,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                xl: {
                  span: 12,
                  offset: null,
                  pull: null,
                  order: 2,
                },
                xxl: {
                  span: 12,
                  offset: null,
                  pull: null,
                  order: 2,
                },
              },
            },
          ],
          'editable-condition': null,
          'visible-condition': null,
          'required-condition': null,
          'x-rules': null,
          'x-layout': {
            xs: {
              span: 12,
              offset: null,
              pull: null,
              order: 2,
            },
            sm: {
              span: 12,
              offset: null,
              pull: null,
              order: 2,
            },
            md: {
              span: 12,
              offset: null,
              pull: null,
              order: 2,
            },
            lg: {
              span: 12,
              offset: null,
              pull: null,
              order: 2,
            },
            xl: {
              span: 12,
              offset: null,
              pull: null,
              order: 2,
            },
            xxl: {
              span: 12,
              offset: null,
              pull: null,
              order: 2,
            },
          },
          'x-dict': {
            dictTypeCode: 'TMP_Dropdown_IND_Title',
          },
        },
      },
    ];
  });
});

jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: (obj: any) => {
      const typeCode = Object.keys(obj)[0];
      const dictCode = Object.values(obj)[0];
      const mockData = {
        TMP_Dropdown_IND_Title: {
          TTT: 'title name',
        },
      };
      return mockData[typeCode][dictCode];
    },
  };
});
describe('useGetClientNameByConfigCallback', () => {
  test('individal & default is local name get default name ', () => {
    const renderer = renderHook(() =>
      useGetClientNameByConfigCallback({
        isDefault: true,
      })
    );
    const handler = renderer.result.current;
    expect(
      handler({
        clientInfo: {
          customerType: 'P',
          firstName: 'FFF',
          surname: 'SSS',
          title: 'TTT',
        },
      })
    ).toEqual('title name FFF SSS');
  });
  test('entity & default is local name get default name', () => {
    const renderer = renderHook(() =>
      useGetClientNameByConfigCallback({
        isDefault: true,
      })
    );
    const handler = renderer.result.current;

    expect(
      handler({
        clientInfo: {
          customerType: 'C',
          firstName: 'FFF',
          surname: 'SSS',
          title: 'TTT',
        },
      })
    ).toEqual('SSS');
  });
  test('individal  default is local name get not default name', () => {
    const renderer = renderHook(() =>
      useGetClientNameByConfigCallback({
        isDefault: false,
      })
    );
    const handler = renderer.result.current;
    expect(
      handler({
        clientInfo: {
          customerType: 'P',
          firstName: 'FFF',
          surname: 'SSS',
          title: 'TTT',
          customerEnFirstName: 'EFFF',
          customerEnSurname: 'ESSS',
        },
      })
    ).toEqual('title name EFFF ESSS');
  });

  test('individal  default is local name get not default name, name param all empty', () => {
    const renderer = renderHook(() =>
      useGetClientNameByConfigCallback({
        isDefault: false,
      })
    );
    const handler = renderer.result.current;
    expect(
      handler({
        clientInfo: {
          customerType: 'P',
          firstName: 'FFF',
          surname: 'SSS',
          title: 'TTT',
          customerEnFirstName: '',
          customerEnSurname: '',
        },
      })
    ).toEqual('');
  });

  test('individal  default is local name get not default name, customerEnFirstName param is empty', () => {
    const renderer = renderHook(() =>
      useGetClientNameByConfigCallback({
        isDefault: false,
      })
    );
    const handler = renderer.result.current;
    const result = handler({
      clientInfo: {
        customerType: 'P',
        firstName: 'FFF',
        surname: 'SSS',
        title: 'TTT',
        customerEnFirstName: '',
        customerEnSurname: 'ESSS',
      },
    });
    expect(result).toEqual('title name ESSS');
  });

  test('individal  default is local name get not default name, customerEnSurname param is empty', () => {
    const renderer = renderHook(() =>
      useGetClientNameByConfigCallback({
        isDefault: false,
      })
    );
    const handler = renderer.result.current;
    expect(
      handler({
        clientInfo: {
          customerType: 'P',
          firstName: 'FFF',
          surname: 'SSS',
          title: 'TTT',
          customerEnFirstName: 'EFFF',
          customerEnSurname: '',
        },
      })
    ).toEqual('title name EFFF');
  });
});
