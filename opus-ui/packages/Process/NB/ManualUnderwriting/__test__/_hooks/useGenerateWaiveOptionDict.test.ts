import { renderHook } from '@testing-library/react-hooks';
import useGenerateWaiveOptionDict from 'process/NB/ManualUnderwriting/_hooks/useGenerateWaiveOptionDict';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return [];
      })
      .mockImplementationOnce(() => {
        return [];
      })
      .mockImplementationOnce(() => {
        return [
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC3',
            waivePolicy: 'Y',
            excludeZeroPremium: 'N',
            excludeSelf: 'N',
          },
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC4',
            waivePolicy: 'Y',
            excludeZeroPremium: 'N',
            excludeSelf: 'N',
          },
        ];
      })

      .mockImplementationOnce(() => {
        return [
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC3',
            waivePolicy: 'Y',
            excludeZeroPremium: 'Y',
            excludeSelf: 'N',
          },
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC4',
            waivePolicy: 'Y',
            excludeZeroPremium: 'Y',
            excludeSelf: 'N',
          },
        ];
      })
      .mockImplementationOnce(() => {
        return [
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC3',
            waivePolicy: 'Y',
            excludeZeroPremium: 'N',
            excludeSelf: 'Y',
          },
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC4',
            waivePolicy: 'Y',
            excludeZeroPremium: 'N',
            excludeSelf: 'Y',
          },
        ];
      })
      .mockImplementationOnce(() => {
        return [
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC3',
            waivePolicy: 'Y',
            excludeZeroPremium: 'Y',
            excludeSelf: 'Y',
          },
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC4',
            waivePolicy: 'Y',
            excludeZeroPremium: 'Y',
            excludeSelf: 'Y',
          },
        ];
      })
      .mockImplementationOnce(() => {
        return [
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC3',
            waivePolicy: 'N',
            excludeZeroPremium: 'Y',
            excludeSelf: 'Y',
          },
          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'CFC4',
            waivePolicy: 'N',
            excludeZeroPremium: 'Y',
            excludeSelf: 'Y',
          },

          {
            regionCode: 'MY',
            productCode: 'WFM1',
            waiveProduct: 'product-4',
            waivePolicy: 'N',
            excludeZeroPremium: 'Y',
            excludeSelf: 'Y',
          },
        ];
      }),
  };
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'product-1',
          coreCode: 'product-1',
          planName: 'plan-1',
        },
        {
          productCode: 'product-2',
          coreCode: 'product-2',
          planName: 'plan-2',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'product-1',
          coreCode: 'product-1',
          planName: 'plan-1',
          instalmentPremiumWithTax: 0,
          grossPremium: 1,
        },
        {
          productCode: 'product-2',
          coreCode: 'product-2',
          planName: 'plan-2',
          instalmentPremiumWithTax: 1,
          grossPremium: 0,
        },
        {
          productCode: 'product-3',
          coreCode: 'product-3',
          planName: 'plan-3',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
        {
          productCode: 'product-4',
          coreCode: 'product-4',
          planName: 'plan-4',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
      ];
    })

    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'product-1',
          coreCode: 'product-1',
          planName: 'plan-1',
          instalmentPremiumWithTax: 0,
          grossPremium: 1,
        },
        {
          productCode: 'product-2',
          coreCode: 'product-2',
          planName: 'plan-2',
          instalmentPremiumWithTax: 1,
          grossPremium: 0,
        },
        {
          productCode: 'WFM1',
          coreCode: 'WFM1',
          planName: 'plan-6',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
      ];
    })

    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'product-1',
          coreCode: 'product-1',
          planName: 'plan-1',
          instalmentPremiumWithTax: 0,
          grossPremium: 1,
        },
        {
          productCode: 'product-2',
          coreCode: 'product-2',
          planName: 'plan-2',
          instalmentPremiumWithTax: 1,
          grossPremium: 0,
        },
        {
          productCode: 'product-3',
          coreCode: 'product-3',
          planName: 'plan-3',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
        {
          productCode: 'product-4',
          coreCode: 'product-4',
          planName: 'plan-4',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
        {
          productCode: 'WFM1',
          coreCode: 'WFM1',
          planName: 'plan-6',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'product-1',
          coreCode: 'product-1',
          planName: 'plan-1',
          instalmentPremiumWithTax: 0,
          grossPremium: 1,
        },
        {
          productCode: 'product-2',
          coreCode: 'product-2',
          planName: 'plan-2',
          instalmentPremiumWithTax: 1,
          grossPremium: 0,
        },
        {
          productCode: 'product-3',
          coreCode: 'product-3',
          planName: 'plan-3',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
        {
          productCode: 'product-4',
          coreCode: 'product-4',
          planName: 'plan-4',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
        {
          productCode: 'WFM1',
          coreCode: 'WFM1',
          planName: 'plan-6',
          instalmentPremiumWithTax: 1,
          grossPremium: 1,
        },
      ];
    });
});

describe('useGenerateWaiveOptionDict', () => {
  test('waiverProductsList is empty', () => {
    const renderer = renderHook(() =>
      useGenerateWaiveOptionDict({
        coreCode: 'CFM1',
      })
    );

    expect(renderer.result.current).toEqual([]);
  });

  test('waive_policy is Y  exclude_zero_premium is N exclude_self is N', () => {
    const renderer = renderHook(() =>
      useGenerateWaiveOptionDict({
        coreCode: 'WFM1',
      })
    );
    // expect(renderer.result.current).toEqual([])
    expect(renderer.result.current).toEqual([
      {
        waiveProduct: 'product-1',
        productName: 'plan-1',
      },
      {
        waiveProduct: 'product-2',
        productName: 'plan-2',
      },
    ]);
  });

  test('waive_policy is Y  exclude_zero_premium is Y exclude_self is N', () => {
    const renderer = renderHook(() =>
      useGenerateWaiveOptionDict({
        coreCode: 'WFM1',
      })
    );
    // expect(renderer.result.current).toEqual([])
    expect(renderer.result.current).toEqual([
      {
        waiveProduct: 'product-3',
        productName: 'plan-3',
      },
      {
        waiveProduct: 'product-4',
        productName: 'plan-4',
      },
    ]);
  });

  test('waive_policy is Y  exclude_zero_premium is N exclude_self is Y', () => {
    const renderer = renderHook(() =>
      useGenerateWaiveOptionDict({
        coreCode: 'WFM1',
      })
    );
    // expect(renderer.result.current).toEqual([])
    expect(renderer.result.current).toEqual([
      {
        waiveProduct: 'product-1',
        productName: 'plan-1',
      },
      {
        waiveProduct: 'product-2',
        productName: 'plan-2',
      },
    ]);
  });

  test('waive_policy is Y  exclude_zero_premium is Y exclude_self is Y', () => {
    const renderer = renderHook(() =>
      useGenerateWaiveOptionDict({
        coreCode: 'WFM1',
      })
    );
    // expect(renderer.result.current).toEqual([])
    expect(renderer.result.current).toEqual([
      {
        waiveProduct: 'product-3',
        productName: 'plan-3',
      },
      {
        waiveProduct: 'product-4',
        productName: 'plan-4',
      },
    ]);
  });

  test('waive_policy is N', () => {
    const renderer = renderHook(() =>
      useGenerateWaiveOptionDict({
        coreCode: 'WFM1',
      })
    );
    // expect(renderer.result.current).toEqual([])
    expect(renderer.result.current).toEqual([
      {
        regionCode: 'MY',
        productCode: 'WFM1',
        waiveProduct: 'product-4',
        waivePolicy: 'N',
        excludeZeroPremium: 'Y',
        excludeSelf: 'Y',
        productName: 'plan-4',
      },
    ]);
  });
});
