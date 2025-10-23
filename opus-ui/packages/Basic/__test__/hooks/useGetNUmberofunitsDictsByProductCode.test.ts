import { renderHook } from '@testing-library/react-hooks';
import useGetNumberofunitsDictsByProductCode from 'process/NB/ManualUnderwriting/_hooks/useGetNumberofunitsDictsByProductCode';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
          coreCode: 'HC03',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
          coreCode: 'HC03',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
          coreCode: 'HC03',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
          coreCode: 'HC03',
        },
      ];
    });
});

jest.mock('@/utils/dictFormatMessage', () => {
  const actual = jest.requireActual('@/utils/dictFormatMessage');

  return {
    ...actual,
    getDrowDownList: jest.fn(() => {
      return [];
    }),
  };
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCfgPlanDictProduct', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          planHospitalBenefitUnitList: [
            {
              id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
              creator: 'Jennifer',
              gmtCreate: '2022-02-20T17:00:00.000+0000',
              modifier: 'Jennifer',
              gmtModified: '2022-02-20T17:00:00.000+0000',
              deleted: 0,
              transId: '6d414828-d2bf-4164-bbd2-81f1b8b55acb',
              regionCode: 'ID',
              benefitPlan: 'AA',
              numberOfUnits: 1,
            },
          ],
          planHospitalBenefitList: [{ regionCode: 'ID', benefitPlan: 'AA', productCode: 'HC03' }],
          productCode: 'HC03',
          existList: true,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          planHospitalBenefitUnitList: null,
          planHospitalBenefitList: [{ regionCode: 'ID', benefitPlan: 'AA', productCode: 'HC03' }],
          productCode: 'HC03',
          existList: false,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          planHospitalBenefitUnitList: [],
          planHospitalBenefitList: [{ regionCode: 'ID', benefitPlan: 'AA', productCode: 'HC03' }],
          productCode: 'HC03',
          existList: false,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          planHospitalBenefitUnitList: null,
          planHospitalBenefitList: null,
          productCode: 'HC03',
          existList: false,
        },
      ];
    });
});
jest.mock('dva', () => {
  const ActualEntity = jest.requireActual('dva');
  return {
    ...ActualEntity,
    useSelector: () => {
      return {};
    },
  };
});

jest.mock('@/utils/dictFormatMessage', () => {
  const actual = jest.requireActual('@/utils/dictFormatMessage');

  return {
    ...actual,
    getDrowDownList: jest.fn(() => {
      return [];
    }),
  };
});

describe('useGetNumberofunitsDictsByProductCode.ts', () => {
  test('has unit list', () => {
    const renderer = renderHook(() =>
      useGetNumberofunitsDictsByProductCode({
        id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
      })
    );
    expect(renderer.result.current).toEqual({
      dictCode: 'numberOfUnits',
      dictName: 'numberOfUnits',
      dictData: [
        {
          id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
          creator: 'Jennifer',
          gmtCreate: '2022-02-20T17:00:00.000+0000',
          modifier: 'Jennifer',
          gmtModified: '2022-02-20T17:00:00.000+0000',
          deleted: 0,
          transId: '6d414828-d2bf-4164-bbd2-81f1b8b55acb',
          regionCode: 'ID',
          benefitPlan: 'AA',
          numberOfUnits: 1,
        },
      ],
    });
  });
  test('no unit list, has benifitPlan list', () => {
    const renderer = renderHook(() =>
      useGetNumberofunitsDictsByProductCode({
        id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
      })
    );
    expect(renderer.result.current).toEqual({
      dictCode: 'hospitalPlanCode',
      dictName: 'hospitalPlanName',
      dictData: [{ hospitalPlanCode: 'AA', hospitalPlanName: 'AA' }],
    });
  });
  test('empty unit list, has benefitPlan list', () => {
    const renderer = renderHook(() =>
      useGetNumberofunitsDictsByProductCode({
        id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
      })
    );
    expect(renderer.result.current).toEqual({
      dictCode: 'hospitalPlanCode',
      dictName: 'hospitalPlanName',
      dictData: [{ hospitalPlanCode: 'AA', hospitalPlanName: 'AA' }],
    });
  });
  test('no both list', () => {
    const renderer = renderHook(() =>
      useGetNumberofunitsDictsByProductCode({
        id: 'e4b16ebe-80d3-4b81-b1eb-42b1d599dc57',
      })
    );
    expect(renderer.result.current).toEqual({
      dictCode: 'hospitalPlanCode',
      dictName: 'hospitalPlanName',
      dictData: [],
    });
  });
});
