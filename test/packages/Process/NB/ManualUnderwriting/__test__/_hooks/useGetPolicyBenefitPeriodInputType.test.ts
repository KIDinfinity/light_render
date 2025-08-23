import { renderHook } from '@testing-library/react-hooks';
import useGetPolicyBenefitPeriodInputType from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyBenefitPeriodInputType';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
        {
          policyTerm: '20',
          policyTermType: 'Y',
          policyTermDisplayType: 'D',
        },
      ];
    });
});

describe('useGetPolicyBenefitPeriodInputType', () => {
  test('match condition', () => {
    const renderer = renderHook(() => useGetPolicyBenefitPeriodInputType({ coverageItem: {} }));

    expect(renderer.result.current).toEqual('Dropdown');
  });
});
