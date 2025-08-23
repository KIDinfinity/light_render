/* eslint-disable no-param-reassign */
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields, validating } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;

    draftState.entities.transactionTypesMap[transactionId].contactInfo = {
      ...draftState.entities.transactionTypesMap[transactionId].contactInfo,
      ...changedFields,
    };

    if (
      !lodash.some(
        lodash.toPairs(draftState.entities.transactionTypesMap[transactionId].contactInfo),
        ([key, obj]: any) =>
          ['email', 'homeNo', 'phoneNo', 'workNo'].includes(key) && formUtils.queryValue(obj)
      )
    ) {
      draftState.entities.transactionTypesMap[
        transactionId
      ].contactInfo = formUtils.cleanValidateData(
        draftState.entities.transactionTypesMap[transactionId].contactInfo || {}
      );
    }

    draftState.entities.transactionTypesMap[transactionId].contactInfo = {
      ...draftState.entities.transactionTypesMap[transactionId].contactInfo,
      clientId: draftState.processData?.mainOwnerClientId,
      subTypeCode: findSubTypeCodeByTransactionType(
        draftState.transactionTypeCodeMap,
        'SRV001',
        /contactchange/gi,
        'SRV_SUB002'
      ),
      policyId: draftState.processData.mainPolicyId,
      sourceSystem: draftState.processData.sourceSystem,
    };

    if (!validating) {
      draftState.entities.transactionTypesMap[transactionId].contactInfo.editFlag = 1;
      lodash.set(
        draftState,
        `${transactionPath}.transactionTypeCode`,
        formUtils.queryValue(lodash.get(draftState, `${transactionPath}.transactionTypeCode`))
      );
    }
  });
