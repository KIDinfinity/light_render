import { renderHook } from '@testing-library/react-hooks';
import useGetFieldDisabledByData from 'process/NB/ManualUnderwriting/_hooks/useGetFieldDisabledByData';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetProductDicts', () => {
  return jest.fn(() => {
    return [
      {
        productCode: 'code',
        productName: 'productName',
        policyTermEditInd: 'N',
      },
    ];
  });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');

  return {
    ...actual,
    useSelector: jest.fn(() => {
      return {
        policyList: [
          {
            coverageList: [
              {
                id: '233',
                coreCode: 'code',
              },
            ],
          },
        ],
      };
    }),
    // .mockImplementationOnce(() => {
    //   return {
    //     policyList: [{
    //       coverageList: [{
    //         id: '233',
    //         coreCode: 'code'
    //       }]
    //     }]
    //   }
    // })
  };
});

describe('useGetPolicyPermDisabled', () => {
  test('test data logic', () => {
    const renderer = renderHook(() =>
      useGetFieldDisabledByData({
        editable: true,
        id: '233',
        dataBasicField: 'policyTermEditInd',
        dataBasicFieldValue: 'N',
        config: {
          editable: 'C',
        },
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('editable config is Y', () => {
    const renderer = renderHook(() =>
      useGetFieldDisabledByData({
        editable: true,
        id: '233',
        dataBasicField: 'policyTermEditInd',
        dataBasicFieldValue: 'N',
        config: {
          editable: 'Y',
        },
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('editable config is N', () => {
    const renderer = renderHook(() =>
      useGetFieldDisabledByData({
        editable: true,
        id: '233',
        dataBasicField: 'policyTermEditInd',
        dataBasicFieldValue: 'N',
        config: {
          editable: 'N',
        },
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
});
