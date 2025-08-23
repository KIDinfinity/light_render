import { renderHook } from '@testing-library/react-hooks';
import useGetPremiumPaymentTermInputType from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumPaymentTermInputType';

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

describe('useGetPremiumPaymentTermInputType', () => {
  test('premiumTermDisplayType includes D , premiumTermType includes Y', () => {
    const renderer = renderHook(() =>
      useGetPremiumPaymentTermInputType({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toEqual('Dropdown');
  });
});
