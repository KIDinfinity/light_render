import lodash from 'lodash';
import { getFieldName } from 'bpm/pages/Envoy/_utils/dataTransferFn';
import getIsRequired from 'bpm/pages/Envoy/_utils/getIsRequired';

interface IAction {
  payload: {
    groupId: string;
    dataId: string;
    name: string;
    value: string;
  };
}

export default function saveReasonPolicy(state: any, { payload }: IAction) {
  const { groupId, dataId, name, value } = payload;
  const path = getFieldName(name);
  const newState = lodash.cloneDeep(state);
  lodash.forEach(newState.currentReasonGroups, (reasonGroup: any) => {
    if (reasonGroup?.id === groupId) {
      lodash.forEach(reasonGroup.reasonDetails, (reason: any) => {
        if (reason?.id === dataId) {
          const thPendPolicyReasonInfo: any = state?.thPendPolicyReasonInfo[`${reason.reasonCode}`];
          lodash.set(reason, path, value);
          lodash.forEach(reason?.policy, (policyItem) => {
            const reasonList = lodash.get(policyItem, 'reasonList');
            const { lastSelectReason, requiredDate } = getIsRequired(
              thPendPolicyReasonInfo,
              reasonList
            );
            if (!lodash.isEmpty(lastSelectReason?.code)) {
              policyItem.reasonList = [lastSelectReason?.code];
            }
            if (!requiredDate) {
              policyItem.date = '';
            }
            if (!lodash.includes(reasonList, 'OTHER')) {
              policyItem.otherReason = '';
            }
          });
        }
      });
    }
  });
  return newState;
}
