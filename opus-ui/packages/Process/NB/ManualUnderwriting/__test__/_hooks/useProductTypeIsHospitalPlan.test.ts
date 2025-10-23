import { renderHook } from '@testing-library/react-hooks';
import useProductTypeIsHospitalPlan from 'process/NB/ManualUnderwriting/_hooks/useProductTypeIsHospitalPlan';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn(() => {
    return [
      {
        id: 'test-match',
        coreCode: 'CCCC',
        productType: 'RT',
      },
      {
        id: 'test-not-match',
        coreCode: 'DDD',
        productType: 'T2',
      },
    ];
  });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCfgPlanDictProduct', () => {
  return jest.fn(() => {
    return [
      {
        productType: 'T1',
      },
    ];
  });
});

describe('useProductTypeIsHospitalPlan', () => {
  test('match config product type', () => {
    const renderer = renderHook(() =>
      useProductTypeIsHospitalPlan({
        id: 'test-match',
      })
    );
    expect(renderer.result.current).toEqual(true);
  });
  test('not match product type', () => {
    const renderer = renderHook(() =>
      useProductTypeIsHospitalPlan({
        id: 'test-not-match',
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
});
