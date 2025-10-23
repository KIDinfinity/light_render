import { renderHook } from '@testing-library/react-hooks';
import useGetBenefitDecisionDicts from 'process/NB/ManualUnderwriting/_hooks/useGetBenefitDecisionDicts';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn(() => {
      return [
        {
          dictCode: 'D',
          dictName: 'Decline',
        },
        {
          dictCode: 'NS',
          dictName: 'NonStandard',
        },
        {
          dictCode: 'P',
          dictName: 'Postpone',
        },
        {
          dictCode: 'S',
          dictName: 'Standard',
        },
        {
          dictCode: 'R',
          dictName: 'Refer',
        },
        [
          {
            dictCode: 'D',
            dictName: 'Decline',
          },
          {
            dictCode: 'NS',
            dictName: 'NonStandard',
          },
          {
            dictCode: 'P',
            dictName: 'Postpone',
          },
          {
            dictCode: 'S',
            dictName: 'Standard',
          },
          {
            dictCode: 'R',
            dictName: 'Refer',
          },
        ],
      ];
    }),
  };
});

jest.mock('@/utils/dictFormatMessage', () => {
  const actual = jest.requireActual('@/utils/dictFormatMessage');

  return {
    ...actual,
    getDrowDownList: jest.fn(() => {
      return [
        {
          dictCode: 'D',
          dictName: 'Decline',
        },
        {
          dictCode: 'NS',
          dictName: 'NonStandard',
        },
        {
          dictCode: 'P',
          dictName: 'Postpone',
        },
        {
          dictCode: 'S',
          dictName: 'Standard',
        },
        {
          dictCode: 'R',
          dictName: 'Refer',
        },
      ];
    }),
  };
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return (
    jest
      .fn(() => [])
      // // main benefit decision is Postpone
      // .mockImplementationOnce(() => {
      //   return [
      //     {
      //       coverageDecision: {
      //         uwDecision: 'P',
      //       },
      //       isMain: 'Y',
      //     },
      //   ];
      // })
      // // main benefit decision is decline
      // .mockImplementationOnce(() => {
      //   return [
      //     {
      //       coverageDecision: {
      //         uwDecision: 'D',
      //       },
      //       isMain: 'Y',
      //     },
      //   ];
      // })
      // main benefit decision is decline
      .mockImplementationOnce(() => {
        return [
          {
            coverageDecision: {
              uwDecision: 'D',
            },
            isMain: 'Y',
          },
        ];
      })
      // main benefit decision is nonStandard
      .mockImplementationOnce(() => {
        return [
          {
            coverageDecision: {
              uwDecision: 'N',
            },
            isMain: 'Y',
          },
        ];
      })
  );
});

describe('useGetBenefitDecisionDicts', () => {
  // test('main benefit decision is Postpone isMain is N', () => {
  //   const renderer = renderHook(() =>
  //     useGetBenefitDecisionDicts({
  //       dictTypeCode: 'Dropdown_UW_BenefitDecision',
  //       isMain: 'N',
  //     })
  //   );
  //   expect(renderer.result.current).toEqual([
  //     {
  //       dictCode: 'D',
  //       dictName: 'Decline',
  //     },
  //     {
  //       dictCode: 'P',
  //       dictName: 'Postpone',
  //     },
  //   ]);
  // });

  // test('main benefit decision is decline isMain is N', () => {
  //   const renderer = renderHook(() =>
  //     useGetBenefitDecisionDicts({
  //       dictTypeCode: 'Dropdown_UW_BenefitDecision',
  //       isMain: 'N',
  //     })
  //   );
  //   expect(renderer.result.current).toEqual([
  //     {
  //       dictCode: 'D',
  //       dictName: 'Decline',
  //     },
  //     {
  //       dictCode: 'P',
  //       dictName: 'Postpone',
  //     },
  //   ]);
  // });

  test('main benefit decision is decline isMain is Y', () => {
    const renderer = renderHook(() =>
      useGetBenefitDecisionDicts({
        dictTypeCode: 'Dropdown_UW_BenefitDecision',
        isMain: 'Y',
      })
    );
    expect(renderer.result.current).toEqual([
      {
        dictCode: 'D',
        dictName: 'Decline',
      },
      {
        dictCode: 'NS',
        dictName: 'NonStandard',
      },
      {
        dictCode: 'P',
        dictName: 'Postpone',
      },
      {
        dictCode: 'S',
        dictName: 'Standard',
      },
    ]);
  });

  // test('main benefit decision is nonstandard isMain is N addLoading is N ', () => {
  //   const regionCode = !Region.ID;
  //   const renderer = renderHook(() =>
  //     useGetBenefitDecisionDicts({
  //       dictTypeCode: 'Dropdown_UW_BenefitDecision',
  //       isMain: 'N',
  //       addLoading: 'N',
  //       regionCode: regionCode,
  //     })
  //   );
  //   expect(renderer.result.current).toEqual([
  //     {
  //       dictCode: 'D',
  //       dictName: 'Decline',
  //     },
  //     {
  //       dictCode: 'P',
  //       dictName: 'Postpone',
  //     },
  //     {
  //       dictCode: 'S',
  //       dictName: 'Standard',
  //     },
  //   ]);
  // });
});
