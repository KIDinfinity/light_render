/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import { findSubTypeCodeByTransactionType } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionTypeCode, transactionId } = payload;

    draftState.entities.transactionTypesMap[transactionId] = {
      ...draftState.entities.transactionTypesMap[transactionId],
      subTransactionTypeCode: findSubTypeCodeByTransactionType(
        draftState.transactionTypeCodeMap,
        formUtils.queryValue(transactionTypeCode),
        undefined,
        undefined
      ),
    };
  });
