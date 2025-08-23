/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import findSubTypeCodeByTransactionType from 'process/BPSRV/common/findSubTypeCodeByTransactionType';
import isChanged from '../../utils/isChanged';
import hasError from '../../utils/hasError';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id, changedFields, changePolicyId = false } = payload;

    draftState.entities.transactionTypesMap[id].paymentMode = {
      ...draftState.entities.transactionTypesMap[id].paymentMode,
      ...changedFields,
    };

    if (
      isChanged(
        draftState.processData?.policyInfo?.paymentMode,
        draftState.entities.transactionTypesMap?.[id]?.paymentMode
      ) ||
      hasError(draftState.entities.transactionTypesMap?.[id]?.paymentMode) ||
      (draftState.entities.transactionTypesMap[id].paymentMode && changePolicyId)
    ) {
      const policyInfoList = draftState.processData?.policyInfo?.applyToPolicyInfoList || [];
      const mainPolicyId = draftState.processData?.policyInfo?.mainPolicyId;
      const currentPaymentMode = policyInfoList.find((item: any) => item.policyId === mainPolicyId);
      draftState.entities.transactionTypesMap[id].paymentMode = {
        currentPaymentMode: currentPaymentMode?.billingFrequency,
        ...draftState.entities.transactionTypesMap[id].paymentMode,
        subTypeCode: findSubTypeCodeByTransactionType(
          draftState.transactionTypeCodeMap,
          'SRV002',
          /paymentmodechange/gi,
          'SRV_SUB003'
        ),
        policyId: draftState.processData.mainPolicyId,
        sourceSystem: draftState.processData.sourceSystem,
      };
    } else {
      draftState.entities.transactionTypesMap[id].paymentMode = null;
    }
  });
