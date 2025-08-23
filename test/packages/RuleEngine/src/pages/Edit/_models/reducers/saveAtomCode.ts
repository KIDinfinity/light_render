import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { conditionId, atomCode } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const index = lodash.findIndex(
      draftState.editData.conditions,
      (item) => item.id === conditionId
    );

    if (index !== -1) {
      const condition = draftState.editData.conditions[index];
      condition.atomCode = formUtils.queryValue(atomCode);
    }
  });

  return { ...nextState };
};
