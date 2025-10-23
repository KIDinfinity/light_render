import { renderHook } from '@testing-library/react-hooks';
import useToggleClientDetail from 'process/NB/ManualUnderwriting/_hooks/useToggleClientDetail';
import { NAMESPACE } from '../../activity.config';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useDispatch: () => {
      return jest.fn((params) => {
        return params;
      });
    },
  };
});
describe('test toolgle client detail', () => {
  test('when expand is true', () => {
    let expand = true;
    const renderer = renderHook(() => {
      const func = useToggleClientDetail({ expand });
      return func('455');
    });
    expect(renderer.result.current).toEqual({
      type: `${NAMESPACE}/closeClientDetail`,
    });
    expand = false;
    const re = renderer.rerender();
    expect(renderer.result.current).toEqual({
      type: `${NAMESPACE}/openClientDetail`,
      payload: {
        expendedClient: '455',
      },
    });
  });
});
