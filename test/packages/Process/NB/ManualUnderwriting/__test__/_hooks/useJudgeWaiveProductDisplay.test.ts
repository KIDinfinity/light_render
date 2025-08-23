import { renderHook } from '@testing-library/react-hooks';
import useJudgeWaiveProductDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeWaiveProductDisplay';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          coreCode: 'product-1',
          productCode: 'product1',
        },
        {
          coreCode: 'product-2',
          productCode: 'product2',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          coreCode: 'product-1',
        },
        {
          coreCode: 'product-2',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          coreCode: 'product-1',
        },
        {
          coreCode: 'product-2',
        },
      ];
    });
});
jest.mock('dva', () => {
  const actual = jest.requireActual('dva');

  const useSelector = jest
    .fn(() => {
      return {};
    })
    .mockImplementationOnce(() => {
      return null;
    })
    .mockImplementationOnce(() => {
      return {
        basicPlanProductFeatureList: [{ waiveCode: null }],
        otherPlanProductFeatureList: [
          { waiveCode: null, productCode: 'product1' },
          { waiveCode: null, productCode: 'product2' },
        ],
      };
    })
    .mockImplementationOnce(() => {
      return {
        basicPlanProductFeatureList: [{ waiveCode: null }],
        otherPlanProductFeatureList: [
          { waiveCode: null, productCode: 'product-1' },
          { waiveCode: 'MW', productCode: 'product-2' },
        ],
      };
    });
  return {
    ...actual,
    useSelector,
  };
});

describe('useJudgeWaiveProductDisplay', () => {
  test('test no planProductConfig', () => {
    const renderer = renderHook(() => useJudgeWaiveProductDisplay());
    expect(renderer.result.current).toBeFalsy();
  });
  test('test with planProductConfig, but no waiveProducts, expect to be fasly', () => {
    const renderer = renderHook(() => useJudgeWaiveProductDisplay());
    expect(renderer.result.current).toBeFalsy();
  });
  test('test with planProductConfig, contain waiveProducts, expect to be truthfuly', () => {
    const renderer = renderHook(() => useJudgeWaiveProductDisplay());
    expect(renderer.result.current).toBeTruthy();
  });
});
