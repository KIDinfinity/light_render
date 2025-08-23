import { renderHook } from '@testing-library/react-hooks';
import useFilterHiddenButtons from 'bpm/pages/OWBEntrance/Entrance/_hooks/useFilterHiddenButtons';

describe('test filter hidden buttons', () => {
  test('when hidden is boolean', () => {
    const { result } = renderHook(() =>
      useFilterHiddenButtons({
        buttonList: [
          {
            buttonCode: 'save',
            hidden: true,
          },
          {
            buttonCode: 'default',
          },
        ],
        taskDetail: {},
      })
    );
    expect(result.current).toEqual([{ buttonCode: 'default' }]);
  });
  test('when hidden is function', () => {
    const { result } = renderHook(() =>
      useFilterHiddenButtons({
        buttonList: [
          {
            buttonCode: 'save',
            hidden: () => true,
          },
          {
            buttonCode: 'default',
          },
        ],
        taskDetail: {},
      })
    );
    expect(result.current).toEqual([{ buttonCode: 'default' }]);
  });
});
