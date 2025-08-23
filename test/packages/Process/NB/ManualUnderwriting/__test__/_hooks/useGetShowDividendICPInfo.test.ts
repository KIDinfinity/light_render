import { renderHook } from '@testing-library/react-hooks';
import useGetShowDividendICPInfo from 'process/NB/ManualUnderwriting/_hooks/useGetShowDividendICPInfo';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageProductList', () => {
  return jest
    .fn(() => [])
    .mockImplementationOnce(() => ['ZE01', 'ZE02'])
    .mockImplementationOnce(() => ['ZE01', 'ZE02'])
    .mockImplementationOnce(() => ['ZE01', 'ZE02']);
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');

  return {
    ...actual,
    useSelector: jest
      .fn()
      .mockImplementationOnce(() => {
        return {
          requiredProductCodeList: [],
          basicPlanProductFeatureList: [
            {
              productCode: 'ZE01',
              dividendInd: 'Y',
              icpInd: null,
            },
          ],
          otherPlanProductFeatureList: [
            {
              productCode: 'ZE02',
              dividendInd: null,
              icpInd: null,
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          requiredProductCodeList: [],
          basicPlanProductFeatureList: [
            {
              productCode: 'ZE01',
              dividendInd: null,
              icpInd: null,
            },
          ],
          otherPlanProductFeatureList: [
            {
              productCode: 'ZE02',
              dividendInd: null,
              icpInd: null,
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          requiredProductCodeList: [],
          basicPlanProductFeatureList: [
            {
              productCode: 'ZE01',
              dividendInd: null,
              icpInd: null,
            },
          ],
          otherPlanProductFeatureList: [
            {
              productCode: 'ZE02',
              dividendInd: null,
              icpInd: 'Y',
            },
          ],
        };
      }),
  };
});
describe('useGetShowDividendICPInfo', () => {
  test('basic product  dividendInd is Y', () => {
    const { result } = renderHook(() => useGetShowDividendICPInfo());
    expect(result.current).toBeTruthy();
  });
  test('all product  dividendInd & icpInd is null', () => {
    const { result } = renderHook(() => useGetShowDividendICPInfo());
    expect(result.current).not.toBeTruthy();
  });

  test('other product  icpInd is Y', () => {
    const { result } = renderHook(() => useGetShowDividendICPInfo());
    expect(result.current).toBeTruthy();
  });
});
