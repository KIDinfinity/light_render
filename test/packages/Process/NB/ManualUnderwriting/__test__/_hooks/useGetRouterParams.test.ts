import { renderHook } from '@testing-library/react-hooks';
import useGetRouterParams from 'basic/hooks/useGetRouterParams';

describe('get router params', () => {
  test('data normal', () => {
    const renderer = renderHook(() => {
      return useGetRouterParams({
        match: {
          params: {
            taskId: '233',
          },
        },
        keys: ['taskId'],
      });
    });
    expect(renderer.result.current).toEqual({
      taskId: '233',
    });
  });
});
