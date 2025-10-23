import useFormatSectionData from 'basic/hooks/useFormatSectionData';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return [];
      })
      .mockImplementationOnce(() => {
        return [];
      }),
  };
});

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

jest.mock('moment', () => {
  return () => {
    return {
      format: jest.fn(() => {
        return '2021/2/2';
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
jest.mock('basic/components/Form', () => {
  return {
    Rule: jest.fn(() => true),
  };
});
describe('test use format data', () => {
  test('when data not a object', () => {
    const renderer = renderHook(() => useFormatSectionData({ data: 233, config: {} }));
    expect(renderer.result.current).toEqual(233);
  });
  test('test order', () => {
    const mockData = {
      age: 1,
      name: 2,
    };
    const config = [
      {
        field: 'age',
        'field-props': {
          'x-layout': {
            lg: {
              order: 1,
              span: 4,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'b',
          },
          visible: 'Y',
        },
      },
      {
        field: 'name',
        'field-props': {
          'x-layout': {
            lg: {
              order: 2,
              span: 6,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'a',
          },
          visible: 'Y',
        },
      },
    ];
    const renderer = renderHook(() => useFormatSectionData({ data: mockData, config }));
    expect(renderer.result.current).toEqual([
      {
        label: 'age',
        value: 1,
        field: 'age',
        span: 4,
      },
      {
        label: 'name',
        value: 2,
        field: 'name',
        span: 6,
      },
    ]);
  });

  test('drop down type', () => {
    const mockData = {
      gender: 'M',
      age: 2,
    };
    const config = [
      {
        field: 'age',
        'field-props': {
          'x-layout': {
            lg: {
              order: 1,
              span: 2,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'b',
          },
          visible: 'Y',
        },
      },
      {
        field: 'gender',
        fieldType: 'Dropdown',
        'field-props': {
          'x-layout': {
            lg: {
              order: 1,
              span: 4,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'a',
          },
          'x-dict': {
            dictTypeCode: 'gender',
          },
          visible: 'Y',
        },
      },
    ];
    const renderer = renderHook(() => useFormatSectionData({ data: mockData, config }));
    expect(renderer.result.current).toEqual([
      {
        label: 'age',
        value: 2,
        span: 2,
        field: 'age',
      },
      {
        label: 'name',
        value: 'Male',
        span: 4,
        field: 'gender',
      },
    ]);
  });
  test('date type field', () => {
    const mockData = {
      a: '2021-05-17T10:33:55.000+0000',
      b: 2,
    };
    const config = [
      {
        field: 'a',
        fieldType: 'Date',
        'field-props': {
          'x-layout': {
            lg: {
              order: 1,
              span: 6,
            },
          },
          label: {
            dictTypeCode: 'Label_BIZ_Claim',
            dictCode: 'a',
          },
          visible: 'Y',
        },
      },
    ];
    const renderer = renderHook(() => useFormatSectionData({ data: mockData, config }));
    expect(renderer.result.current).toEqual([
      {
        label: 'name',
        value: '2021/2/2',
        span: 6,
        field: 'a',
      },
    ]);
  });
});
