/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { isSelect, transactionId } = payload;

    const mainPolicyId = draftState.processData?.mainPolicyId;

    if (isSelect) {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList =
        draftState.processData?.policyInfo?.policyInfoList
          ?.map(({ policyId }: any) => {
            if (policyId === mainPolicyId) return;
            return `${transactionId}____${policyId}`;
          })
          ?.filter((item) => item) || [];
    } else {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [];
    }
  });
