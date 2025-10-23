/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { findSubTypeCodeByTransactionType } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId, validating } = payload;

    draftState.entities.transactionTypesMap[transactionId] = {
      ...draftState.entities.transactionTypesMap[transactionId],
      ...changedFields,
    };

    if (!validating && lodash.hasIn(changedFields, 'transactionTypeCode')) {
      const transactionTypeCodeMap = draftState.transactionTypeCodeMap;
      const cftFlag =
        transactionTypeCodeMap?.[formUtils.queryValue(changedFields.transactionTypes)]?.[0]
          ?.cftFlag;
      draftState.processData.cftFlag = cftFlag;
      const transactionMapById = draftState.entities.transactionTypesMap[transactionId];
      const newData = {
        id: transactionMapById?.id,
        isManualAdd: transactionMapById?.isManualAdd,
        ...changedFields,
      };
      if (transactionMapById?.branchReceivedDate) {
        newData.branchReceivedDate = transactionMapById?.branchReceivedDate;
      }
      if (transactionMapById?.requestDate) {
        newData.requestDate = transactionMapById?.requestDate;
      }
      if (transactionMapById?.hoReceivedDate) {
        newData.hoReceivedDate = transactionMapById?.hoReceivedDate;
      }
      draftState.entities.transactionTypesMap[transactionId] = newData;
    }

    if (
      lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId]?.subTransactionTypeCode)
    ) {
      draftState.entities.transactionTypesMap[transactionId] = {
        ...draftState.entities.transactionTypesMap[transactionId],
        subTransactionTypeCode: findSubTypeCodeByTransactionType(
          draftState.transactionTypeCodeMap,
          formUtils.queryValue(
            draftState.entities.transactionTypesMap[transactionId].transactionTypeCode
          ),
          undefined,
          undefined
        ),
      };
    }
  });
