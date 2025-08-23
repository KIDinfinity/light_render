import { renderHook } from '@testing-library/react-hooks';
import useGetLoadingColumns from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingColumns';

jest.mock('basic/hooks/useGetTableColumnsByPageConfig', () => {
  return jest.fn(() => {
    return [
      {
        fieldName: 'emPeriod',
        id: 'emPeriod',
        span: 2,
      },
      {
        fieldName: 'extraMortality',
        id: 'extraMortality',
        span: 3,
      },
      {
        fieldName: 'pmLoading',
        id: 'pmLoading',
        span: 4,
      },
      {
        fieldName: 'flatMortality',
        id: 'flatMortality',
        span: 5,
      },
    ];
  });
});
describe('useGetLoadingColumns', () => {
  test('meAllowIndicator is N', () => {
    const loadingRule = {
      meAllowIndicator: 'N',
    };
    const localConfig = {};
    const renderer = renderHook(() =>
      useGetLoadingColumns({
        loadingRule,
        localConfig,
      })
    );
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'pmLoading',
        id: 'pmLoading',
        span: 4,
      },
      {
        fieldName: 'flatMortality',
        id: 'flatMortality',
        span: 5,
      },
    ]);
  });
  test('meAllowIndicator is Y', () => {
    const loadingRule = {
      meAllowIndicator: 'Y',
    };
    const localConfig = {};
    const renderer = renderHook(() =>
      useGetLoadingColumns({
        loadingRule,
        localConfig,
      })
    );
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'emPeriod',
        id: 'emPeriod',
        span: 2,
      },
      {
        fieldName: 'extraMortality',
        id: 'extraMortality',
        span: 3,
      },
      {
        fieldName: 'pmLoading',
        id: 'pmLoading',
        span: 4,
      },
      {
        fieldName: 'flatMortality',
        id: 'flatMortality',
        span: 5,
      },
    ]);
  });
  test('loadingRule is Empty', () => {
    const loadingRule = {};
    const localConfig = {};
    const renderer = renderHook(() =>
      useGetLoadingColumns({
        loadingRule,
        localConfig,
      })
    );
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'emPeriod',
        id: 'emPeriod',
        span: 2,
      },
      {
        fieldName: 'extraMortality',
        id: 'extraMortality',
        span: 3,
      },
      {
        fieldName: 'pmLoading',
        id: 'pmLoading',
        span: 4,
      },
      {
        fieldName: 'flatMortality',
        id: 'flatMortality',
        span: 5,
      },
    ]);
  });
  test('rateAllowIndicator is N', () => {
    const loadingRule = {
      rateAllowIndicator: 'N',
    };
    const localConfig = {};
    const renderer = renderHook(() =>
      useGetLoadingColumns({
        loadingRule,
        localConfig,
      })
    );
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'emPeriod',
        id: 'emPeriod',
        span: 2,
      },
      {
        fieldName: 'extraMortality',
        id: 'extraMortality',
        span: 3,
      },
      {
        fieldName: 'flatMortality',
        id: 'flatMortality',
        span: 5,
      },
    ]);
  });
  test('rateAllowIndicator is Y', () => {
    const loadingRule = {
      rateAllowIndicator: 'Y',
    };
    const localConfig = {};
    const renderer = renderHook(() =>
      useGetLoadingColumns({
        loadingRule,
        localConfig,
      })
    );
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'emPeriod',
        id: 'emPeriod',
        span: 2,
      },
      {
        fieldName: 'extraMortality',
        id: 'extraMortality',
        span: 3,
      },
      {
        fieldName: 'pmLoading',
        id: 'pmLoading',
        span: 4,
      },
      {
        fieldName: 'flatMortality',
        id: 'flatMortality',
        span: 5,
      },
    ]);
  });
  test('feAllowIndicator is N', () => {
    const loadingRule = {
      feAllowIndicator: 'N',
    };
    const localConfig = {};
    const renderer = renderHook(() =>
      useGetLoadingColumns({
        loadingRule,
        localConfig,
      })
    );
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'emPeriod',
        id: 'emPeriod',
        span: 2,
      },
      {
        fieldName: 'extraMortality',
        id: 'extraMortality',
        span: 3,
      },
      {
        fieldName: 'pmLoading',
        id: 'pmLoading',
        span: 4,
      },
    ]);
  });
  test('feAllowIndicator is Y', () => {
    const loadingRule = {
      feAllowIndicator: 'Y',
    };
    const localConfig = {};
    const renderer = renderHook(() =>
      useGetLoadingColumns({
        loadingRule,
        localConfig,
      })
    );
    expect(renderer.result.current).toEqual([
      {
        fieldName: 'emPeriod',
        id: 'emPeriod',
        span: 2,
      },
      {
        fieldName: 'extraMortality',
        id: 'extraMortality',
        span: 3,
      },
      {
        fieldName: 'pmLoading',
        id: 'pmLoading',
        span: 4,
      },
      {
        fieldName: 'flatMortality',
        id: 'flatMortality',
        span: 5,
      },
    ]);
  });
});
