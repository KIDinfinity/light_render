/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, index, changedFields, type, validating = false } = payload;
    if (
      type !== OperationTypeEnum.ADD &&
      (lodash.isObject(index) || lodash.isNaN(Number(index)) || Number(index) < 0)
    ) {
      return;
    }
    if (!validating) {
      lodash.set(
        draftState,
        `entities.transactionTypesMap[${transactionId}].transactionTypeCode`,
        formUtils.queryValue(
          draftState.entities.transactionTypesMap[transactionId].transactionTypeCode
        )
      );
    }
    const requestForMaturityBoosterPath = `entities.transactionTypesMap[${transactionId}].maturityBooster`;
    if (!lodash.isArray(lodash.get(draftState, `${requestForMaturityBoosterPath}.eventList`))) {
      lodash.set(draftState, `${requestForMaturityBoosterPath}.eventList`, []);
    }

    const eventList = lodash.get(draftState, `${requestForMaturityBoosterPath}.eventList`);
    switch (type) {
      case OperationTypeEnum.ADD: {
        const newEventcode = {
          ...changedFields,
          isAdd: true,
          ...draftState.allFundConfigListMap[formUtils.queryValue(changedFields?.eventCode)],
        };
        draftState.entities.transactionTypesMap[transactionId].maturityBooster.eventList.push(
          newEventcode
        );

        break;
      }

      case OperationTypeEnum.UPDATE: {
        lodash.set(draftState, `${requestForMaturityBoosterPath}.eventList[${index}]`, {
          ...eventList[index],
          ...changedFields,
        });
        break;
      }

      case OperationTypeEnum.DELETE: {
        eventList.splice(index, 1);
        break;
      }
    }
  });
