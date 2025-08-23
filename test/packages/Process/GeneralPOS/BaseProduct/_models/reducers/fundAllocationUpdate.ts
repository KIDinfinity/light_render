/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { StateSectionEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';

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
    const fundAllocationPath = `entities.transactionTypesMap[${transactionId}].fundAllocation`;

    if (!lodash.isArray(lodash.get(draftState, `${fundAllocationPath}.fundAllocationFundList`))) {
      lodash.set(draftState, `${fundAllocationPath}.fundAllocationFundList`, []);
    }

    const fundAllocationFundList = lodash.get(
      draftState,
      `${fundAllocationPath}.fundAllocationFundList`
    );
    const fundCode = formUtils.queryValue(fundAllocationFundList?.[index]?.fundCode);

    switch (type) {
      case OperationTypeEnum.ADD: {
        const newFund = {
          ...changedFields,
          isAdd: true,
          ...draftState.allFundConfigListMap[formUtils.queryValue(changedFields?.fundCode)],
        };
        draftState.entities.transactionTypesMap[
          transactionId
        ].fundAllocation.fundAllocationFundList.push(newFund);
        break;
      }

      case OperationTypeEnum.UPDATE: {
        lodash.set(draftState, `${fundAllocationPath}.fundAllocationFundList[${index}]`, {
          ...fundAllocationFundList[index],
          ...changedFields,
        });

        if (!validating) {
          if (lodash.hasIn(changedFields, 'allocation')) {
            lodash.set(
              draftState,
              `extraField.${StateSectionEnum.FUNDALLOCATIONFUNDLIST}.total`,
              lodash.sum(
                lodash
                  .get(draftState, `${fundAllocationPath}.fundAllocationFundList`)
                  .map((childItem) => Number(formUtils.queryValue(childItem.allocation) || 0))
              )
            );
          }
        }
        break;
      }

      case OperationTypeEnum.DELETE: {
        fundAllocationFundList.splice(index, 1);

        lodash.set(
          draftState,
          `extraField.${StateSectionEnum.FUNDALLOCATIONFUNDLIST}.total`,
          lodash.sum(
            draftState.entities.transactionTypesMap[
              transactionId
            ]?.fundAllocation?.fundAllocationFundList?.map((childItem) =>
              Number(formUtils.queryValue(childItem.allocation) || 0)
            )
          )
        );
        break;
      }
    }
  });
