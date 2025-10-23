import { renderHook } from '@testing-library/react-hooks';
import useGetRequriedByConfig from 'basic/hooks/useGetRequriedByConfig';

describe('useGetRequriedByConfig', () => {
  test('config required is N', () => {
    const rednerer = renderHook(() => {
      return useGetRequriedByConfig({
        config: {
          'field-props': {
            required: 'N',
          },
        },
        localConfig: {},
        requiredConditions: true,
      });
    });

    expect(rednerer.result.current).not.toBeTruthy();
  });

  test('config required is Y', () => {
    const rednerer = renderHook(() => {
      return useGetRequriedByConfig({
        config: {
          'field-props': {
            required: 'Y',
          },
        },
        localConfig: {},
        requiredConditions: false,
      });
    });

    expect(rednerer.result.current).toBeTruthy();
  });

  test('config required is C requiredConditions is true', () => {
    const rednerer = renderHook(() => {
      return useGetRequriedByConfig({
        config: {
          'field-props': {
            required: 'C',
          },
        },
        requiredConditions: true,
      });
    });

    expect(rednerer.result.current).toBeTruthy();
  });

  test('miss config, fieldProps is Y', () => {
    const rednerer = renderHook(() => {
      return useGetRequriedByConfig({
        localConfig: {
          'field-props': {
            required: 'Y',
          },
        },
        config: {},
        requiredConditions: true,
      });
    });

    expect(rednerer.result.current).toBeTruthy();
  });
});
