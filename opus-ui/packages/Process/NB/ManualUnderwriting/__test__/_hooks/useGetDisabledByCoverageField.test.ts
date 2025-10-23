import { renderHook } from '@testing-library/react-hooks';
import useGetDisabledByCoverageField from 'process/NB/ManualUnderwriting/_hooks/useGetDisabledByCoverageField';

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
  };
});

describe('useGetDisabledByCoverageField', () => {
  test('test data logic', () => {
    const renderer = renderHook(() =>
      useGetDisabledByCoverageField({
        id: '233',
        dataBasicField: 'policyTermEditInd',
        dataBasicFieldValue: 'N',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
});
