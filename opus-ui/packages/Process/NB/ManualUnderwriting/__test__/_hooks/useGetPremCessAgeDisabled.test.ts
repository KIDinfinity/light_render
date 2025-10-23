import { renderHook } from '@testing-library/react-hooks';
import useGetPremCessAgeDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetPremCessAgeDisabled';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          premiumTerm: '10',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'D',
        },
        {
          premiumTerm: '20',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'D',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          premiumTerm: '10',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'T',
        },
        {
          premiumTerm: '20',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'T',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          premiumTerm: '10',
          premiumTermType: 'A',
          premiumTermDisplayType: 'D',
        },
        {
          premiumTerm: '20',
          premiumTermType: 'A',
          premiumTermDisplayType: 'D',
        },
      ];
    });
});

describe('useGetPremCessAgeDisabled', () => {
  test('premiumTermDisplayType is D, premiumTermDisplayType is Y', () => {
    const renderer = renderHook(() => useGetPremCessAgeDisabled({ coverageItem: {} }));

    expect(renderer.result.current).toBeTruthy();
  });

  test('premiumTermDisplayType is T, premiumTermDisplayType is Y', () => {
    const renderer = renderHook(() => useGetPremCessAgeDisabled({ coverageItem: {} }));

    expect(renderer.result.current).toBeTruthy();
  });
});
