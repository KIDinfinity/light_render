/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import {
  StateSectionEnum,
  OperationTypeEnum,
  OptionEnum,
  DecisionEnum,
} from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';

const OptionMapKey = {
  [OptionEnum.Unit]: 'switchOutUnit',
  [OptionEnum.Amount]: 'switchOutAmount',
  [OptionEnum.Percent]: 'switchOutPerc',
};

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const {
      transactionId,
      index,
      changedFields: defaultChangedFields,
      type,
      validating = false,
    } = payload;
    let changedFields = defaultChangedFields;
    if (
      ![OperationTypeEnum.ADD, OperationTypeEnum.COVER].includes(type) &&
      (lodash.isObject(index) || lodash.isNaN(Number(index)) || Number(index) < 0)
    ) {
      return;
    }
    const defaultOption = defaultOptionByRegion(StateSectionEnum.FUNDSWITCHING);

    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const decision = formUtils.queryValue(draftState.processData?.decision);

    if (lodash.hasIn(changedFields, 'allocationPercentage')) {
      changedFields = lodash.omit(defaultChangedFields, 'allocationPercentage');
    }

    if (!validating) {
      lodash.set(
        draftState,
        `${transactionPath}.transactionTypeCode`,
        formUtils.queryValue(lodash.get(draftState, `${transactionPath}.transactionTypeCode`))
      );
      // 切换option，添加，删除的时候会触发
      if (type !== OperationTypeEnum.UPDATE) {
        draftState.processData.showReAssess = {
          show: decision !== DecisionEnum.D,
          change: true,
          warnMessage: lodash.uniq([
            ...(draftState.processData?.showReAssess?.warnMessage || []),
            'MSG_000828',
          ]),
        };
      }
    }

    if (lodash.isEmpty(lodash.get(draftState, `${transactionPath}.fundSwitching`))) {
      lodash.set(draftState, `${transactionPath}.fundSwitching`, {
        switchingOutOption: defaultOption,
        fundSwitchingFundList: [],
      });
    }

    const fundSwitchingFundList = lodash.get(
      draftState,
      `${transactionPath}.fundSwitching.fundSwitchingFundList`
    );

    switch (type) {
      case OperationTypeEnum.ADD: {
        const newFund = {
          ...changedFields,
          isAdd: true,
          unitHolding: 0,
          ...draftState.allFundConfigListMap[formUtils.queryValue(changedFields?.fundCode)],
          switchingOutOption: fundSwitchingFundList?.[0]?.switchingOutOption || OptionEnum.Unit,
        };

        draftState.entities.transactionTypesMap[
          transactionId
        ].fundSwitching.fundSwitchingFundList.push(newFund);
        break;
      }

      case OperationTypeEnum.UPDATE: {
        if (!validating) {
          const changeKey = Object.keys(changedFields)[0];

          const cleanFundSwitching = formUtils.cleanValidateData(
            lodash.get(
              draftState,
              `${transactionPath}.fundSwitching.fundSwitchingFundList[${index}]`
            )
          );
          const isChange =
            formUtils.queryValue(changedFields[changeKey]) !== cleanFundSwitching?.[changeKey];

          lodash.set(draftState, 'processData.showReAssess', {
            show:
              decision !== DecisionEnum.D && isChange
                ? true
                : draftState.processData?.showReAssess?.show,
            change: isChange ? true : draftState.processData?.showReAssess?.change,
            warnMessage: isChange
              ? lodash.uniq([
                  ...(draftState.processData?.showReAssess?.warnMessage || []),
                  'MSG_000828',
                ])
              : draftState.processData?.showReAssess?.warnMessage,
          });

          lodash.set(
            draftState,
            `${transactionPath}.fundSwitching.fundSwitchingFundList[${index}]`,
            {
              ...fundSwitchingFundList[index],
              ...changedFields,
            }
          );

          if (lodash.hasIn(changedFields, 'switchInPerc')) {
            lodash.set(
              draftState,
              `extraField.${StateSectionEnum.FUNDSWITCHING}.total`,
              lodash.sum(
                lodash
                  .get(draftState, `${transactionPath}.fundSwitching.fundSwitchingFundList`)
                  .map((childItem) => Number(formUtils.queryValue(childItem.switchInPerc) || 0))
              )
            );
          }
        } else {
          lodash.set(
            draftState,
            `${transactionPath}.fundSwitching.fundSwitchingFundList[${index}]`,
            {
              ...fundSwitchingFundList[index],
              ...changedFields,
            }
          );
        }

        break;
      }

      case OperationTypeEnum.DELETE: {
        fundSwitchingFundList.splice(index, 1);

        lodash.set(
          draftState,
          `extraField.${StateSectionEnum.FUNDSWITCHING}.total`,
          lodash.sum(
            draftState.entities.transactionTypesMap[
              transactionId
            ]?.fundSwitching?.fundSwitchingFundList?.map((childItem) =>
              Number(formUtils.queryValue(childItem.switchInPerc) || 0)
            )
          )
        );
        break;
      }

      case OperationTypeEnum.COVER: {
        if (!validating) {
          const switchingOutOption = formUtils.queryValue(changedFields.switchingOutOption);
          const oldOption = formUtils.queryValue(
            lodash.cloneDeep(
              lodash.get(
                draftState,
                `${transactionPath}.fundSwitching.switchingOutOption`,
                switchingOutOption
              )
            )
          );

          lodash.set(
            draftState,
            `${transactionPath}.fundSwitching.switchingOutOption`,
            switchingOutOption
          );
          lodash.set(
            draftState,
            `${transactionPath}.fundSwitching.fundSwitchingFundList`,
            fundSwitchingFundList.map((item) => {
              const switchingOutOption = formUtils.queryValue(changedFields.switchingOutOption);
              const valueItem = formUtils.cleanValidateData(item);
              const otherData = {
                switchOutAmount: null,
                switchOutUnit: null,
                switchOutPerc: null,
              };

              const lastData =
                switchingOutOption === OptionEnum.Percent
                  ? Number(Number(valueItem[OptionMapKey?.[oldOption]] || 0).toFixed()) || null
                  : valueItem[OptionMapKey?.[oldOption]];

              otherData[OptionMapKey[switchingOutOption]] = lastData;

              return { ...item, ...changedFields, ...otherData };
            })
          );
        }
      }
    }
  });
