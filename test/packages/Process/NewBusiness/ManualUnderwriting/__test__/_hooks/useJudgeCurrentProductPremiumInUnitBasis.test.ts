import { renderHook } from '@testing-library/react-hooks';
import useJudgeCurrentProductPremiumInUnitBasis from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgeCurrentProductPremiumInUnitBasis';

jest.mock('process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: '1',

          coreCode: 'mock-1',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: '2',
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

describe('useJudgeCurrentProductPremiumInUnitBasis', () => {
  test('premiumInUnitBasis is Y', () => {
    const renderer = renderHook(() =>
      useJudgeCurrentProductPremiumInUnitBasis({
        coverageId: '1',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });

  test('premiumInUnitBasis is N', () => {
    const renderer = renderHook(() =>
      useJudgeCurrentProductPremiumInUnitBasis({
        coverageId: '2',
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
});
