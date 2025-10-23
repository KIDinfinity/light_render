import { renderHook } from '@testing-library/react-hooks';
import useGetLoadingPeriod from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingPeriod';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn(() => {
    return [
      {
        id: '233',
        coreCode: 'product-1',
        isMain: 'Y',
        payPeriod: '666',
        indemnifyPeriod: '999',
      },
      {
        id: '666',
        coreCode: 'product-2',
        isMain: 'N',
        payPeriod: '666',
        indemnifyPeriod: '999',
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
        basicPlanProductFeatureList: [
          {
            productCode: 'product-1',
            meTermFollowCode: 'PT',
          },
        ],
        otherPlanProductFeatureList: [
          {
            productCode: 'product-2',
            feTermFollowCode: 'RT',
          },
        ],
      };
    }),
  };
});
describe('useGetLoadingPeriod', () => {
  test('TEST PT , field = extraMortality', () => {
    const renderer = renderHook(() => {
      return useGetLoadingPeriod({
        coverageId: '233',
        field: 'extraMortality',
      });
    });

    expect(renderer.result.current).toEqual('666');
  });

  test('TEST RT and field = flatMortality', () => {
    const renderer = renderHook(() => {
      return useGetLoadingPeriod({
        coverageId: '666',
        field: 'flatMortality',
      });
    });

    expect(renderer.result.current).toEqual('999');
  });
});
