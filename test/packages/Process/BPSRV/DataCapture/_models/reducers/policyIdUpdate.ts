/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { trim } from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields } = payload;

    if (!draftState.processData) {
      draftState.processData = {};
    }

    if (!changedFields.policyId?.errors) {
      draftState.processData.mainPolicyId =
        trim(formUtils.queryValue(changedFields.policyId)) || '';
    } else {
      draftState.processData.mainPolicyId = changedFields.policyId || '';
    }
  });
