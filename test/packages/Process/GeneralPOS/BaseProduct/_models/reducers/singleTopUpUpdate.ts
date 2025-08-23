/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
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
    const singleTopupPath = `entities.transactionTypesMap[${transactionId}].singleTopup`;
    if (!lodash.isArray(lodash.get(draftState, `${singleTopupPath}.fundList`))) {
      lodash.set(draftState, `${singleTopupPath}.fundList`, []);
    }

    const fundList = lodash.get(draftState, `${singleTopupPath}.fundList`);
    switch (type) {
      case OperationTypeEnum.ADD: {
        const newFund = {
          ...changedFields,
          isAdd: true,
          ...draftState.allFundConfigListMap[formUtils.queryValue(changedFields?.fundCode)],
        };
        draftState.entities.transactionTypesMap[transactionId].singleTopup.fundList.push(newFund);

        break;
      }

      case OperationTypeEnum.UPDATE: {
        lodash.set(draftState, `${singleTopupPath}.fundList[${index}]`, {
          ...fundList[index],
          ...changedFields,
        });
        if (!validating) {
          if (lodash.hasIn(changedFields, 'topupAmount')) {
            lodash.set(
              draftState,
              `${singleTopupPath}.totalTopupAmount`,
              lodash.sum(
                lodash
                  .get(draftState, `${singleTopupPath}.fundList`)
                  .map((childItem) => Number(formUtils.queryValue(childItem?.topupAmount) || 0))
              )
            );
          }
        }
        break;
      }

      case OperationTypeEnum.DELETE: {
        fundList.splice(index, 1);
        lodash.set(
          draftState,
          `${singleTopupPath}.totalTopupAmount`,
          lodash.sum(
            lodash
              .get(draftState, `${singleTopupPath}.fundList`)
              .map((childItem) => Number(formUtils.queryValue(childItem?.topupAmount) || 0))
          )
        );
        break;
      }
    }
  });
