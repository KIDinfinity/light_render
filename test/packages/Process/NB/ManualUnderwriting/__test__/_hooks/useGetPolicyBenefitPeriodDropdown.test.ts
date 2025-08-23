import { renderHook } from '@testing-library/react-hooks';
import useGetPolicyBenefitPeriodDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyBenefitPeriodDropdown';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '66',
          policyTermType: 'A',
          policyTermDisplayType: 'D',
        },
        {
          policyTerm: '99',
          policyTermType: 'Y',
          policyTermDisplayType: 'T',
        },
      ];
    });
});

describe('useGetPolicyBenefitPeriodDropdown', () => {
  test('match condition', () => {
    const renderer = renderHook(() => useGetPolicyBenefitPeriodDropdown({ coverageItem: {} }));

    expect(renderer.result.current).toEqual([
      {
        dictCode: '66',
        dictName: '66',
      },
      {
        dictCode: '99',
        dictName: '99',
      },
    ]);
  });
});
