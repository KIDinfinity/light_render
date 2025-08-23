import { produce }  from 'immer';
import lodash from 'lodash';

const removeDecisionCondition = (state: any, action: any) => {
  const { id, branchId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = lodash.map(
      draftState.decisionEditData.branchVO.branchList,
      (item: any) => {
        return item.id === branchId
          ? {
              ...item,
              conditions: item.conditions?.filter((el) => el.id !== id),
            }
          : item;
      }
    );
  });

  return { ...nextState };
};

export default removeDecisionCondition;
