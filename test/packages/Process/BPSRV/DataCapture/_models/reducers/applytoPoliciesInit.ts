/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, hiddenApplyTo } = payload;
    if (!draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList) {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [];
    }

    if (lodash.size(draftState.processData?.policyInfo?.applyToPolicyInfoList) === 1) {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [
        `${transactionId}____${draftState.processData?.mainPolicyId}`,
      ];
    }

    if (lodash.size(draftState.processData?.policyInfo?.applyToPolicyInfoList) > 1) {
      // 如果applyToPolicyBOList中不存在mainPolicyId，则添加
      if (hiddenApplyTo) {
        draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [
          `${transactionId}____${draftState.processData?.mainPolicyId}`,
        ];
      }

      if (
        !lodash.find(
          draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList,
          (id: any) => id.split('____')[1] === draftState.processData?.mainPolicyId
        ) &&
        !hiddenApplyTo
      ) {
        draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList.push(
          `${transactionId}____${draftState.processData?.mainPolicyId}`
        );
      }
    }
  });
