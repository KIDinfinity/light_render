import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveApplicationItem = (state: any, action: any) => {
  const { changedFields, applicationId } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (
      lodash.has(changedFields, 'policyNoArray') &&
      lodash.isEmpty(formUtils.queryValue(changedFields.policyNoArray))
    ) {
      changedFields.documentTypeArray = [];
      changedFields.applicationTypeArray = [];
    }
    draftState.claimEntities.applicationListMap[applicationId] = {
      ...draftState.claimEntities.applicationListMap[applicationId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveApplicationItem;
