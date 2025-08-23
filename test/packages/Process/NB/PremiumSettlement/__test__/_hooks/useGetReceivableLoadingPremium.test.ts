import { renderHook } from '@testing-library/react-hooks';
import useGetReceivableLoadingPremium from 'process/NB/PremiumSettlement/_hooks/useGetReceivableLoadingPremium';

describe('useGetReceivableLoadingPremium', () => {
  test('add number', () => {
    const premiumBreakdownList = [
      {
        loadingPremium: 1.2,
      },
      {
        loadingPremium: 2.3,
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivableLoadingPremium({
        premiumBreakdownList,
      })
    );
    expect(renderer.result.current).toEqual(3.5);
  });

  test('number string add', () => {
    const premiumBreakdownList = [
      {
        loadingPremium: '5.12',
      },
      {
        loadingPremium: '3.56',
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivableLoadingPremium({
        premiumBreakdownList,
      })
    );

    expect(renderer.result.current).toEqual(8.68);
  });

  test('number add string', () => {
    const premiumBreakdownList = [
      {
        loadingPremium: '5.12',
      },
      {
        loadingPremium: 3.56,
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivableLoadingPremium({
        premiumBreakdownList,
      })
    );

    expect(renderer.result.current).toEqual(8.68);
  });

  test('0.1 +  0.2', () => {
    const premiumBreakdownList = [
      {
        loadingPremium: 0.1,
      },
      {
        loadingPremium: 0.2,
      },
    ];

    const renderer = renderHook(() =>
      useGetReceivableLoadingPremium({
        premiumBreakdownList,
      })
    );

    expect(renderer.result.current).toEqual(0.3);
  });

  test('null + 0.1', () => {
    const premiumBreakdownList = [
      {
        loadingPremium: 0.1,
      },
      {
        loadingPremium: null,
      },
    ];
    const renderer = renderHook(() =>
      useGetReceivableLoadingPremium({
        premiumBreakdownList,
      })
    );
    expect(renderer.result.current).toEqual(0.1);
  });

  test('undefined + 0.1', () => {
    const premiumBreakdownList = [
      {
        loadingPremium: 0.1,
      },
      {
        loadingPremium: undefined,
      },
    ];
    const renderer = renderHook(() =>
      useGetReceivableLoadingPremium({
        premiumBreakdownList,
      })
    );
    expect(renderer.result.current).toEqual(0.1);
  });
});
