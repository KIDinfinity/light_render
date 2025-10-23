import { renderHook } from '@testing-library/react-hooks';
import useGetVisibleByConfig from 'basic/hooks/useGetVisibleByConfig';

describe('useGetVisibleByConfig', () => {
  test('config visible is N', () => {
    const renderer = renderHook(() =>
      useGetVisibleByConfig({
        config: {
          'field-props': {
            visible: 'N',
          },
        },
        visibleConditions: true,
      })
    );

    expect(renderer.result.current).not.toBeTruthy();
  });
  test('config visible is Y', () => {
    const renderer = renderHook(() =>
      useGetVisibleByConfig({
        config: {
          'field-props': {
            visible: 'Y',
          },
        },
        visibleConditions: false,
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });

  test('config visible is C', () => {
    const renderer = renderHook(() =>
      useGetVisibleByConfig({
        config: {
          'field-props': {
            visible: 'C',
          },
        },
        visibleConditions: false,
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });

  test('config has not field-props', () => {
    const config = {
      visible: 'N',
    };
    const visibleConditions = {};
    const renderer = renderHook(() => useGetVisibleByConfig({ config, visibleConditions }));
    expect(renderer.result.current).not.toBeTruthy();
  });
});
