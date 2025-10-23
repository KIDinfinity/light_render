import React from 'react';
import useTimerAction from 'bpm/pages/OWBEntrance/Entrance/_hooks/useTimerAction';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

describe('test timer', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    jest.useFakeTimers();
  });
  afterEach(() => {
    // cleanup on exiting
    jest.useRealTimers();
  });
  it('auto action only when data difference', () => {
    const action = jest.fn();
    const TestComponent = () => {
      const buttonList = [
        {
          buttonCode: 'save',
          action,
          timer: 30,
        },
      ];
      useTimerAction({ buttonList, taskId: '233' });
      return <div>test</div>;
    };

    act(() => {
      render(<TestComponent />);
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(action).toHaveBeenCalledTimes(1);
  });
  test('button list change', () => {
    const action = jest.fn();

    const TestComponent = ({ buttonList, taskId }: any) => {
      useTimerAction({ buttonList, taskId });
      return <div>test</div>;
    };
    let rr = null;
    act(() => {
      const { rerender } = render(
        <TestComponent
          buttonList={[
            {
              buttonCode: 'save',
              action,
              timer: 30,
            },
          ]}
          taskId="233"
        />
      );
      rr = rerender;
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    act(() => {
      rr(<TestComponent buttonList={[]} taskId="666" />);
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(action).toHaveBeenCalledTimes(1);
  });
});
