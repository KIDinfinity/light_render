/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { isSelect, transactionId } = payload;

    const mainPolicyId = draftState.processData?.mainPolicyId;

    if (isSelect) {
      draftState.processData?.policyInfo?.applyToPolicyInfoList?.forEach(({ policyId }: any) => {
        if (policyId === mainPolicyId) return;
        draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList.push(
          `${transactionId}____${policyId}`
        );
      });
    } else {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [
        `${transactionId}____${mainPolicyId}`,
      ];
    }
  });
