import { renderHook } from '@testing-library/react-hooks';
import useJudgeIsDisplayPlanOption from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsDisplayPlanOption';

jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      queryValue: (item: any) => {
        return item;
      },
    },
  };
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test-match',
          coreCode: 'CCCC',
          productType: 'ILP',
        },
        {
          id: 'test-not-match',
          coreCode: 'DDD',
          productType: 'T2',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test-match',
          coreCode: 'CCCC',
          productType: 'ILP',
        },
        {
          id: 'test-not-match',
          coreCode: 'DDD',
          productType: 'T2',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test-match',
          coreCode: 'CCCC',
          productType: 'ILP',
        },
        {
          id: 'test-not-match',
          coreCode: 'DDD',
          productType: 'T2',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test-match',
          coreCode: 'CCCC',
          productType: 'T1',
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
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          existList: false,
          planHospitalBenefitUnitList: null,
          productCode: 'UR01',
          productType: 'ILP',
        },
        {
          planHospitalBenefitUnitList: null,
          productType: 'T',
          productCode: 'HR10',
          existList: false,
        },
        {
          planHospitalBenefitUnitList: null,
          productType: 'RT',
          productCode: 'RT01',
          existList: false,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          existList: false,
          planHospitalBenefitUnitList: [],
          productCode: 'UR01',
          productType: 'ILP',
        },
        {
          planHospitalBenefitUnitList: [],
          productType: 'T',
          productCode: 'HR10',
          existList: false,
        },
        {
          planHospitalBenefitUnitList: [],
          productType: 'RT',
          productCode: 'RT01',
          existList: false,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          planHospitalBenefitUnitList: null,
          productType: 'ILP',
          productCode: 'UR04',
          existList: false,
        },
        {
          planHospitalBenefitUnitList: [
            {
              id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
              creator: 'Jennifer',
              gmtCreate: '2022-02-20T16:00:00.000+0000',
              modifier: 'Jennifer',
              gmtModified: '2022-02-20T16:00:00.000+0000',
              deleted: 0,
              transId: '6d414828-d2bf-4164-bbd2-81f1b8b55acb',
              regionCode: 'PH',
              benefitPlan: 'AA',
              numberOfUnits: 1,
            },
            {
              id: '2b4a7ae9-c4b7-4e82-95b7-442fc6f80bc1',
              creator: 'Jennifer',
              gmtCreate: '2022-02-20T16:00:00.000+0000',
              modifier: 'Jennifer',
              gmtModified: '2022-02-20T16:00:00.000+0000',
              deleted: 0,
              transId: '6d414828-d2bf-4164-bbd2-81f1b8b55acb',
              regionCode: 'PH',
              benefitPlan: 'BB',
              numberOfUnits: 2,
            },
            {
              id: 'c4d56e22-e89b-44b1-970b-68e27d5f01fc',
              creator: 'Jennifer',
              gmtCreate: '2022-02-20T16:00:00.000+0000',
              modifier: 'Jennifer',
              gmtModified: '2022-02-20T16:00:00.000+0000',
              deleted: 0,
              transId: '6d414828-d2bf-4164-bbd2-81f1b8b55acb',
              regionCode: 'PH',
              benefitPlan: 'CC',
              numberOfUnits: 3,
            },
            {
              id: '3b6291b5-883c-4407-8d18-c972f2db600b',
              creator: 'Jennifer',
              gmtCreate: '2022-02-20T16:00:00.000+0000',
              modifier: 'Jennifer',
              gmtModified: '2022-02-20T16:00:00.000+0000',
              deleted: 0,
              transId: '6d414828-d2bf-4164-bbd2-81f1b8b55acb',
              regionCode: 'PH',
              benefitPlan: 'DD',
              numberOfUnits: 4,
            },
          ],
          productType: 'T',
          productCode: 'TR13',
          existList: true,
        },
      ];
    });
});

describe('useJudgeIsDisplayPlanOption', () => {
  test('no hospital plan benefitPlan', () => {
    const renderer = renderHook(() => useJudgeIsDisplayPlanOption());
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('empty hospital plan benefitPlan', () => {
    const renderer = renderHook(() => useJudgeIsDisplayPlanOption());
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('has hospital plan benefitPlan', () => {
    const renderer = renderHook(() => useJudgeIsDisplayPlanOption());
    expect(renderer.result.current).toBeTruthy();
  });
});
