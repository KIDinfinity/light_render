import { renderHook } from '@testing-library/react-hooks';
import useSetButtonsDisabled from 'bpm/pages/OWBEntrance/Entrance/_hooks/useSetButtonsDisabled';

describe('test filter hidden buttons', () => {
  test('when disabled is function', () => {
    const { result } = renderHook(() =>
      useSetButtonsDisabled({
        buttonList: [
          {
            buttonCode: 'save',
            disabled: () => true,
          },
          {
            buttonCode: 'default',
          },
        ],
        taskDetail: {},
      })
    );
    expect(result.current).toEqual([
      {
        buttonCode: 'save',
        disabled: true,
      },
      { buttonCode: 'default' },
    ]);
  });
});
