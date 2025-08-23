import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { changedFields, ntuDate } = action?.payload;
  const changedFieldsNtuDate = formUtils.queryValue(lodash.get(changedFields, 'ntuDate'));
  const nextState = produce(state, (draftState: any) => {
    if (lodash.isEmpty(draftState.businessData)) {
      return;
    }
    lodash.set(draftState, 'businessData.policyList[0].ntuDate', changedFieldsNtuDate || ntuDate);
  });
  return { ...nextState };
};
