/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { policyInfo } = payload;

    draftState.processData.policyInfo = policyInfo;

    draftState.servicingInit = !draftState.servicingInit;

    // 接口要求
    draftState.processData.mainPolicyId = policyInfo.mainPolicyId;
    draftState.processData.mainOwnerClientId = policyInfo.mainOwnerClientId;
    draftState.processData.mainInsuredClientId = policyInfo.mainInsuredClientId;
    draftState.processData.sourceSystem = policyInfo.sourceSystem;
  });
