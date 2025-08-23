import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

const addDecisionCondition = (state: any, action: any) => {
  const { id, newList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const newId = id || draftState.currentBranchVOId;

    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = lodash.map(
      draftState?.decisionEditData?.branchVO?.branchList,
      (item: any) => {
        return item.id === newId
          ? {
              ...item,
              // eslint-disable-next-line no-nested-ternary
              conditions: newList
                ? lodash.concat(...item.conditions, ...newList)
                : [
                    ...item.conditions,
                    {
                      id: uuidv4(),
                      conditionId: uuidv4(),
                    },
                  ],
            }
          : item;
      }
    );
  });

  return { ...nextState };
};

export default addDecisionCondition;
