/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import findSubTypeCodeByTransactionType from 'process/BPSRV/common/findSubTypeCodeByTransactionType';
import isChanged from '../../utils/isChanged';
import hasError from '../../utils/hasError';

const map = {
  A: '01',
  H: '02',
  Q: '04',
  M: '12',
};

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id, changedFields, changePolicyId = false } = payload;
    const finalChangedFields = { ...changedFields };

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'nextPaymentMode')) {
        finalChangedFields.nextPremiumAmount =
          draftState.policyPmMode?.[
            map[formUtils.queryValue(changedFields.nextPaymentMode)]
          ]?.premiumAmt;
      }
    }

    draftState.entities.transactionTypesMap[id].paymentMode = {
      ...draftState.entities.transactionTypesMap[id].paymentMode,
      ...finalChangedFields,
    };

    if (
      isChanged(
        draftState.processData?.policyInfo?.paymentMode,
        draftState.entities.transactionTypesMap?.[id]?.paymentMode
      ) ||
      hasError(draftState.entities.transactionTypesMap?.[id]?.paymentMode) ||
      (draftState.entities.transactionTypesMap[id].paymentMode && changePolicyId)
    ) {
      draftState.entities.transactionTypesMap[id].paymentMode = {
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
