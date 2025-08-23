/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id } = payload;

    draftState.entities.transactionTypesMap[id].paymentMode = {
      currentPaymentMode: draftState.processData.policyInfo?.applyToPolicyInfoList.find(
        (item: any) => item.policyId === draftState.processData?.mainPolicyId
      )?.billingFrequency,
      ...draftState.entities.transactionTypesMap[id].paymentMode,
    };
  });
