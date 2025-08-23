import { renderHook } from '@testing-library/react-hooks';
import useIsClientDetailExpand from 'process/NB/ManualUnderwriting/_hooks/useIsClientDetailExpand';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: () => {
      return '233';
    },
  };
});
describe('test get client detail', () => {
  test('get detail', () => {
    const renderer = renderHook(() => {
      return useIsClientDetailExpand({ id: '233' });
    });
    expect(renderer.result.current).toBeTruthy();
  });
});
