/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { policyInfo } = payload;

    draftState.processData.policyInfo=policyInfo;

    draftState.processData.mainPolicyId = policyInfo.mainPolicyId;
    draftState.processData.mainOwnerClientId = policyInfo.mainOwnerClientId;
    draftState.processData.mainInsuredClientId = policyInfo.mainInsuredClientId;
    draftState.processData.sourceSystem = policyInfo.sourceSystem;

    if (
      draftState.processData.policyInfo.applyToPolicyInfoList.findIndex(
        (item: any) => item.policyId === draftState.processData?.mainPolicyId
      )
    ) {
      lodash.keys(draftState.entities.transactionTypesMap).forEach((transactionTypesId: any) => {
        if (!draftState.entities.transactionTypesMap[transactionTypesId]?.applyToPolicyBOList) {
          draftState.entities.transactionTypesMap[transactionTypesId].applyToPolicyBOList = [];
        }

        if (
          !draftState.entities.transactionTypesMap[
            transactionTypesId
          ].applyToPolicyBOList.findIndex(
            (id: any) => id.split('____')[1] === draftState.processData?.mainPolicyId
          )
        ) {
          draftState.entities.transactionTypesMap[transactionTypesId].applyToPolicyBOList.push(
            `${transactionTypesId}____${draftState.processData?.mainPolicyId}`
          );
        }
      });
    }
    // 触发初始化扁平
    draftState.servicingInit = !draftState.servicingInit;
  });
