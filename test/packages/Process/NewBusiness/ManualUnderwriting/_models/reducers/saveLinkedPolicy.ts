import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { changedFields, policyNoIndex, isLast } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (isLast && !!changedFields?.policyNo?.value) {
      draftState.policyNoList.push(changedFields.policyNo.value);
    } else {
      lodash.set(draftState, `policyNoList[${policyNoIndex}]`, changedFields.policyNo.value);
    }
  });
  return { ...nextState };
};
