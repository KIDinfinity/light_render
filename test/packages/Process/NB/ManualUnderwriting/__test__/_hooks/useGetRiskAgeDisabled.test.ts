import { renderHook } from '@testing-library/react-hooks';
import useGetRiskAgeDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetRiskAgeDisabled';
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
          policyTermType: 'A',
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
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
      ];
    });
});

describe('useGetPermiumTermInputType', () => {
  test('policyTermType has y, policyTermDisplayType D', () => {
    const renderer = renderHook(() => useGetRiskAgeDisabled({ coverageTerm: {} }));
    expect(renderer.result.current).toBeTruthy();
  });
  test('policyTermType not has y, policyTermDisplayType D', () => {
    const renderer = renderHook(() => useGetRiskAgeDisabled({ coverageTerm: {} }));
    expect(renderer.result.current).not.toBeTruthy();
  });

  test('policyTermType not has y, policyTermDisplayType T', () => {
    const renderer = renderHook(() => useGetRiskAgeDisabled({ coverageTerm: {} }));
    expect(renderer.result.current).toBeTruthy();
  });
});
