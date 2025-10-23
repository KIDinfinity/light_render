import { renderHook } from '@testing-library/react-hooks';
import useGetProductDropdownListForLoading from 'process/NB/ManualUnderwriting/_hooks/useGetProductDropdownListForLoading';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        productCode: 'test-1-prodcut-code',
        productName: 'test-1-name',
        coverageDecision: {
          uwDecision: 'NS',
        },
        coverageInsuredList: [
          {
            clientId: 'test-name',
          },
        ],
      },

      {
        productCode: 'test-1-prodcut-code',
        productName: 'test-1-name',
        coverageDecision: {
          uwDecision: 'NS',
        },
        coverageInsuredList: [
          {
            clientId: 'test-name-2',
          },
        ],
      },
      {
        productCode: 'test-2-prodcut-code',
        productName: 'test-2-name',
        coverageDecision: {
          uwDecision: 'S',
        },
      },
    ];
  });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          name: 'test-name',
        };
      }),
  };
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentContractTypeProductDicts', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        productCode: 'test-1-prodcut-code',
        productName: 'test-1-prodcut-dict-name',
      },
    ];
  });
});

describe('test get product dropdown list', () => {
  test('get prodcts', () => {
    const renderer = renderHook(() => useGetProductDropdownListForLoading());
    expect(renderer.result.current).toEqual([
      {
        dictCode: 'test-1-prodcut-code',
        dictName: 'test-1-prodcut-dict-name',
      },
    ]);
  });
});
