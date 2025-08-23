import { renderHook } from '@testing-library/react-hooks';
import useGetPremiumPaymentDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumPaymentDisabled';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
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
    })
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
    });
});

describe('useGetPremiumPaymentDisabled', () => {
  test('premiumTermDisplayType has D , premiumTermType has A', () => {
    const renderer = renderHook(() =>
      useGetPremiumPaymentDisabled({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toBeTruthy();
  });
});
