import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { conditionId, formulaInfo } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const index = lodash.findIndex(
      draftState.editData.conditions,
      (item) => item.id === conditionId
    );

    if (index !== -1) {
      const condition = draftState.editData.conditions[index];
      condition.formulaInfo = formulaInfo;
    }
  });

  return { ...nextState };
};
