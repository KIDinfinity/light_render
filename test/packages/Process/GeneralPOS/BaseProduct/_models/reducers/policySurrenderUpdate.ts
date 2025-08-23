/* eslint-disable no-param-reassign */
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import { findSubTypeCodeByTransactionType, diffTime } from 'process/GeneralPOS/common/utils';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload, select }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields, validating = false, isDataCapture } = payload;

    if (!validating && lodash.hasIn(changedFields, 'addrContactChangeInd') && isDataCapture) {
      if (formUtils.queryValue(changedFields.addrContactChangeInd) === 'Y') {
        const id = uuidv4();
        draftState.processData.transactionTypes.push(id);
        draftState.entities.transactionTypesMap[id] = {
          id,
          isManualAdd: true,
          transactionTypeCode: TransactionTypeEnum.SRV011,
          subTransactionTypeCode: findSubTypeCodeByTransactionType(
            draftState.transactionTypeCodeMap,
            TransactionTypeEnum.SRV011,
            undefined,
            undefined
          ),
        };
      } else {
        try {
          const id = Object.values(draftState.entities.transactionTypesMap)?.find(
            (item) => formUtils.queryValue(item?.transactionTypeCode) === TransactionTypeEnum.SRV001
          )?.id;

          draftState.processData.transactionTypes = draftState.processData.transactionTypes?.filter(
            (item: string) => item !== id
          );
          delete draftState.entities.transactionTypesMap[id];
        } catch (error) {}
      }
    }

    if (
      !validating &&
      lodash.hasIn(changedFields, 'cvDate') &&
      diffTime(
        changedFields.cvDate,
        draftState.entities.transactionTypesMap[transactionId].policySurrender?.cvDate
      )
    ) {
      lodash.set(draftState, 'processData.showReAssess', {
        show: true,
        change: true,
        warnMessage: lodash.uniq([
          ...(draftState.processData?.showReAssess?.warnMessage || []),
          'MSG_000828',
        ]),
      });
      draftState.entities.transactionTypesMap[transactionId].effectiveDate = changedFields.cvDate;
    }
    draftState.entities.transactionTypesMap[transactionId].policySurrender = {
      ...draftState.entities.transactionTypesMap[transactionId].policySurrender,
      ...changedFields,
    };
  });
