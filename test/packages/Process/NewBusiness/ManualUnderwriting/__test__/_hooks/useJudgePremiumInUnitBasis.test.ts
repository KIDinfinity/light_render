import { renderHook } from '@testing-library/react-hooks';
import useJudgePremiumInUnitBasis from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgePremiumInUnitBasis';

jest.mock('process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          coreCode: 'mock-1',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          coreCode: 'mock-2',
        },
      ];
    });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {})
      .mockImplementationOnce(() => {
        return {
          basicPlanProductFeatureList: [],
          otherPlanProductFeatureList: [
            {
              productCode: 'mock-1',
              premiumInUnitBasis: 'Y',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          basicPlanProductFeatureList: [],
          otherPlanProductFeatureList: [
            {
              productCode: 'mock-2',
              premiumInUnitBasis: 'N',
            },
          ],
        };
      }),
  };
});
describe('useJudgePremiumInUnitBasis', () => {
  test('has premiumInUnitBasis Y', () => {
    const renderer = renderHook(() => {
      return useJudgePremiumInUnitBasis();
    });
    expect(renderer.result.current).toBeTruthy();
  });
  test('has no premiumInUnitBasis Y', () => {
    const renderer = renderHook(() => {
      return useJudgePremiumInUnitBasis();
    });
    expect(renderer.result.current).not.toBeTruthy();
  });
});
