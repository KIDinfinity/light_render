import React from 'react';
import { useDispatch } from 'dva';
import Item from '../Item';
import {SmartCircleKey} from 'navigator/enum/MachineKey'

export default ({ typeCode, dictCode }) => {
  const dispatch = useDispatch();
  return (
    <Item
      key="CreateCase"
      typeCode={typeCode}
      dictCode={dictCode}
      onClick={() => {
        dispatch({
          type: 'workspaceAI/saveMachineKey',
          payload: { machineKey: SmartCircleKey.ButtonCreateCase },
        });

        dispatch({
          type: 'workspaceCases/getRuleSetupCaseCategory',
        });

        dispatch({ type: 'workspaceAI/closeQueryList' });
        dispatch({ type: 'workspaceAI/enterRuleSetupOfStep1' });
        dispatch({ type: 'workspaceAI/enterRuleSetupOfStep2' });
      }}
    />
  );
};
