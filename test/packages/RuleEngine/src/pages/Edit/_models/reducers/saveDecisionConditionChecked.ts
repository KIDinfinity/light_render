import { produce }  from 'immer';
import lodash from 'lodash';

const saveDecisionConditionChecked = (state: any, action: any) => {
  const { branchId, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = lodash.map(
      draftState.decisionEditData.branchVO.branchList,
      (branchItem: any) => {
        return branchItem.id === branchId
          ? {
              ...branchItem,
              conditions: lodash.map(branchItem.conditions, (conditionItem: any) => {
                return conditionItem.id === id
                  ? {
                      ...conditionItem,
                      checked: !conditionItem.checked,
                    }
                  : conditionItem;
              }),
            }
          : branchItem;
      }
    );
  });

  return { ...nextState };
};

export default saveDecisionConditionChecked;
