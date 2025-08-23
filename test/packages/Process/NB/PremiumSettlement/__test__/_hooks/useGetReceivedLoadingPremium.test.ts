import { renderHook } from '@testing-library/react-hooks';
import useGetReceivedLoadingPremium from 'process/NB/PremiumSettlement/_hooks/useGetReceivedLoadingPremium';

describe('useGetReceivedLoadingPremium', () => {
  test('receiptAmt > receivableAmount', () => {
    const premiumBreakdownList = [
      {
        paymentAmt: 100.89,
        loadingPremium: 20.18,
        receiptAmt: 100.32,
      },
      {
        paymentAmt: '43.86',
        loadingPremium: '13.24',
        receiptAmt: '88.09',
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivedLoadingPremium({
        premiumBreakdownList,
      })
    );
    expect(renderer.result.current).toEqual(77.08);
  });

  test('receiptAmt <= receivableAmount', () => {
    const premiumBreakdownList = [
      {
        paymentAmt: 100.89,
        loadingPremium: 20.18,
        receiptAmt: 33.32,
      },
      {
        paymentAmt: 43.86,
        loadingPremium: 13.24,
        receiptAmt: 30.62,
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivedLoadingPremium({
        premiumBreakdownList,
      })
    );
    expect(renderer.result.current).toEqual(0);
  });

  test('receiptAmt > receivableAmount and receiptAmt <= receivableAmount', () => {
    const premiumBreakdownList = [
      {
        paymentAmt: 100.89,
        loadingPremium: 20.18,
        receiptAmt: 100.32,
      },
      {
        paymentAmt: 43.86,
        loadingPremium: 13.24,
        receiptAmt: 9.64,
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivedLoadingPremium({
        premiumBreakdownList,
      })
    );
    expect(renderer.result.current).toEqual(19.61);
  });

  test('Parameter contains undefined', () => {
    const premiumBreakdownList = [
      {
        paymentAmt: 100.89,
        loadingPremium: 20.18,
        receiptAmt: 100.32,
      },
      {
        paymentAmt: 43.86,
        loadingPremium: undefined,
        receiptAmt: 88.09,
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivedLoadingPremium({
        premiumBreakdownList,
      })
    );
    expect(renderer.result.current).toEqual(63.84);
  });
});
