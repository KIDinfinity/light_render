import React from 'react';
import { render } from '@testing-library/react';
import useSetButtonList from 'bpm/pages/OWBEntrance/Entrance/_hooks/useSetButtonList';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('../../_hooks/useHandleConfigCallback.ts', () => {
  return () =>
    jest.fn(({ buttonListFromServer, actionConfig }) => {
      if (buttonListFromServer.length && actionConfig) {
        return buttonListFromServer.map((item) => ({
          ...item,
          initStatus: 'default',
        }));
      }
      return [];
    });
});
describe('test set button list', () => {
  let taskDetail = {};
  let customizationButtonConfig = {};
  let actionConfig = {};
  let contextDispatch = jest.fn();
  let buttonListFromServer = [
    {
      buttonCode: 'save',
    },
  ];
  let commonActionLife = {};
  let bb = [];
  let setButtonList = jest.fn();
  beforeEach(() => {
    taskDetail = { taskId: '233' };
  });
  afterEach(() => {
    taskDetail = {};
    customizationButtonConfig = {};
    actionConfig = {};
    contextDispatch = jest.fn();
    buttonListFromServer = [];
    commonActionLife = {};
    setButtonList = jest.fn();
    jest.useRealTimers();
  });
  test('test set button list', (done) => {
    setButtonList = jest
      .fn(() => {
        console.log('do something here');
      })
      .mockImplementationOnce((list) => {
        console.log('first call', list);
      })
      .mockImplementationOnce((list) => {
        console.log('second first', list);
        bb = list;
        expect(setButtonList).toHaveBeenCalledWith([{ buttonCode: 'save', initStatus: 'default' }]);
        expect(bb).toEqual([{ buttonCode: 'save', initStatus: 'default' }]);
      })
      .mockImplementationOnce((list) => {
        console.log('third call', list);
        expect(setButtonList).toHaveBeenCalledWith([
          { buttonCode: 'submit', initStatus: 'default' },
        ]);
        done();
      });
    const TestComponent = (props) => {
      useSetButtonList({
        ...props,
      });
      return <div>test</div>;
    };

    const { rerender } = render(
      <TestComponent
        buttonListFromServer={buttonListFromServer}
        actionConfig={actionConfig}
        taskDetail={taskDetail}
        contextDispatch={contextDispatch}
        setButtonList={setButtonList}
        customizationButtonConfig={customizationButtonConfig}
        commonActionLife={commonActionLife}
      />
    );
    rerender(
      <TestComponent
        buttonListFromServer={[
          {
            buttonCode: 'submit',
          },
        ]}
        actionConfig={actionConfig}
        taskDetail={taskDetail}
        contextDispatch={contextDispatch}
        setButtonList={setButtonList}
        customizationButtonConfig={customizationButtonConfig}
        commonActionLife={commonActionLife}
      />
    );
  });
  test('context dispatch', (done) => {
    contextDispatch = jest.fn(({ type }: any) => {
      if (type === 'setButtonStatusAll') {
        expect(contextDispatch).toHaveBeenCalledWith({
          type: 'setButtonStatusAll',
          payload: {
            buttonStatus: {
              submit: {
                status: 'default',
                errorsCount: 0,
              },
            },
          },
        });
        console.log('aaaaa');
      }
      if (type === 'setFinalButtonList') {
        console.log('setFinalButtonList');
        expect(contextDispatch).toHaveBeenCalledTimes(2);
        done();
      }
    });
    renderHook(() =>
      useSetButtonList({
        buttonListFromServer: [
          {
            buttonCode: 'submit',
          },
        ],
        actionConfig,
        taskDetail,
        contextDispatch,
        setButtonList,
        customizationButtonConfig,
        commonActionLife,
      })
    );
  });
});
