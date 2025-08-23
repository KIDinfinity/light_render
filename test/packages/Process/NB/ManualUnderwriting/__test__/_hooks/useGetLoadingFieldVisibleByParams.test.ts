import { renderHook } from '@testing-library/react-hooks';
import useGetLoadingFieldVisibleByParams from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByParams';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageLoadingRule', () => {
  return (
    jest
      .fn()
      // field config visible is no
      .mockImplementationOnce(() => {
        return {
          params: 'Y',
        };
      })
      // field config visible is Y
      .mockImplementationOnce(() => {
        return {
          params: 'Y',
        };
      })
      // field config is C  and match loadingRule
      .mockImplementationOnce(() => {
        return {
          feAllowIndicator: 'N',
        };
      })
      // field config is C and not match loadingRule
      .mockImplementationOnce(() => {
        return {
          feAllowIndicator: 'Y',
        };
      })
      // loadingRule is Empty
      .mockImplementationOnce(() => {
        return {};
      })
  );
});

describe('useGetLoadingFieldVisibleByParams', () => {
  test('field config visible is N', () => {
    const renderer = renderHook(() =>
      useGetLoadingFieldVisibleByParams({
        coverageId: 233,
        fieldConfig: {
          visible: 'N',
        },
        key: 'param',
        value: 'N',
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('field config visible is Y ', () => {
    const renderer = renderHook(() =>
      useGetLoadingFieldVisibleByParams({
        coverageId: 233,
        fieldConfig: {
          visible: 'Y',
        },
        key: 'param',
        value: 'N',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('field config is C  and match loadingRule', () => {
    const renderer = renderHook(() =>
      useGetLoadingFieldVisibleByParams({
        coverageId: 233,
        fieldConfig: {
          visible: 'C',
        },
        key: 'feAllowIndicator',
        value: 'N',
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
  test('field config is C and not match loadingRule', () => {
    const renderer = renderHook(() =>
      useGetLoadingFieldVisibleByParams({
        coverageId: 233,
        fieldConfig: {
          visible: 'C',
        },
        key: 'feAllowIndicator',
        value: 'N',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('loadingRule is Empty', () => {
    const renderer = renderHook(() =>
      useGetLoadingFieldVisibleByParams({
        coverageId: 233,
        fieldConfig: {
          visible: 'C',
        },
        key: 'feAllowIndicator',
        value: 'N',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
});
