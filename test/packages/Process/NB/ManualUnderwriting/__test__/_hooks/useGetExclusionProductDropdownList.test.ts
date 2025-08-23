import { renderHook } from '@testing-library/react-hooks';
import useGetExclusionProductDropdownList from 'process/NB/ManualUnderwriting/_hooks/useGetExclusionProductDropdownList';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        productCode: 'test-1-prodcut-code-233',
        coreCode: 'test-1-prodcut-code',
        productName: 'test-1-name',
        coverageInsuredList: [
          {
            id: 'id-1',
            clientId: 'client-1',
          },
        ],
        coverageDecision: {
          uwDecision: 'S',
        },
      },
      {
        productCode: 'test-2',
        coreCode: 'test-2',
        productName: 'test-origin-name',
        coverageInsuredList: [
          {
            id: 'id-2',
            clientId: 'client-2',
          },
        ],
        coverageDecision: {
          uwDecision: 'NS',
        },
      },

      {
        productCode: 'test-1-prodcut-code-6666',
        coreCode: 'test-1-prodcut-code-55',
        productName: 'test-2-name',
        coverageInsuredList: [
          {
            id: 'id-3',
            clientId: 'client-3',
          },
        ],
        coverageDecision: {
          uwDecision: 'D',
        },
      },
    ];
  });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentContractTypeProductDicts', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        productCode: 'test-1-prodcut-code',
        productName: 'test-1-prodcut-dict-name',
      },
      {
        productCode: 'test-2',
        productName: 'test-2-dict-name',
      },
    ];
  });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn()

      // .mockImplementationOnce(() => {
      //   return {
      //     name: 'client-2',
      //   };
      // })

      .mockImplementationOnce(() => {
        return {
          name: 'client-1',
        };
      }),
  };
});

describe('test get product dropdown list', () => {
  // test('get prodcts test nonstandard', () => {
  //   const renderer = renderHook(() => useGetExclusionProductDropdownList());
  //   expect(renderer.result.current).toEqual([
  //     {
  //       dictCode: 'test-2',
  //       dictName: 'test-2-dict-name'
  //     }
  //   ]);
  // });

  test('get prodcts test standard', () => {
    const renderer = renderHook(() => useGetExclusionProductDropdownList());
    expect(renderer.result.current).toEqual([
      // {
      //   dictCode: 'test-1-prodcut-code',
      //   dictName: 'test-1-prodcut-dict-name',
      // },
    ]);
  });
});
