import { renderHook } from '@testing-library/react-hooks';
import useGetPolicyBenefitPeriodDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyBenefitPeriodDisabled';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '20',
          policyTermType: 'Y',
          policyTermDisplayType: 'D',
        },
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '20',
          policyTermType: 'Y',
          policyTermDisplayType: 'T',
        },
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '20',
          policyTermType: 'Y',
          policyTermDisplayType: 'T',
        },
        {
          policyTerm: '20',
          policyTermType: 'Y',
          policyTermDisplayType: 'T',
        },
      ];
    });
});

describe('useGetPolicyBenefitPeriodDisabled', () => {
  test('policyTermDisplayType is D , policyTermType has A', () => {
    const renderer = renderHook(() =>
      useGetPolicyBenefitPeriodDisabled({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toBeTruthy();
  });

  test('policyTermDisplayType is T, policyTermType has A', () => {
    const renderer = renderHook(() =>
      useGetPolicyBenefitPeriodDisabled({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toBeTruthy();
  });

  test('policyTermType not includes A', () => {
    const renderer = renderHook(() =>
      useGetPolicyBenefitPeriodDisabled({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).not.toBeTruthy();
  });
});
