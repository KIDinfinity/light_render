import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { branchItem, conditionId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO = {
      ...draftState.decisionEditData.branchVO,
      branchList: lodash.map(draftState.decisionEditData.branchVO.branchList, (item: any) => {
        return item.id === branchItem.id
          ? {
              ...item,
              conditions: lodash.map(item.conditions, (conditionItem: any) => {
                return conditionItem.conditionId === conditionId
                  ? lodash.omit(conditionItem, ['originFormulaInfo', 'formulaInfo'])
                  : conditionItem;
              }),
            }
          : item;
      }),
    };
  });

  return { ...nextState };
};
