import { renderHook } from '@testing-library/react-hooks';
import useGetPremiumPaymentTermDicts from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumPaymentTermDicts';

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
          premiumTerm: '30',
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
          premiumTermDisplayType: 'D',
        },
        {
          premiumTerm: '31',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'D',
        },

        {
          premiumTerm: '30',
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

describe('useGetPremiumPaymentTermDicts', () => {
  test('premiumTermDisplayType includes D , premiumTermType includes Y', () => {
    const renderer = renderHook(() =>
      useGetPremiumPaymentTermDicts({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toEqual([
      {
        dictCode: '10',
        dictName: '10',
      },
      {
        dictCode: '30',
        dictName: '30',
      },
    ]);
  });
  test('test unique', () => {
    const renderer = renderHook(() =>
      useGetPremiumPaymentTermDicts({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toEqual([
      {
        dictCode: '10',
        dictName: '10',
      },
      {
        dictCode: '20',
        dictName: '20',
      },
    ]);
  });

  test('test order', () => {
    const renderer = renderHook(() =>
      useGetPremiumPaymentTermDicts({
        coverageItem: {},
      })
    );

    expect(renderer.result.current).toEqual([
      {
        dictCode: '10',
        dictName: '10',
      },
      {
        dictCode: '30',
        dictName: '30',
      },
      {
        dictCode: '31',
        dictName: '31',
      },
    ]);
  });
});
