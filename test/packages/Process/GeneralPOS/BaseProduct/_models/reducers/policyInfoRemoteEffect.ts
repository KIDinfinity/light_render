/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { caseCategory, activityKey } = payload;
    (draftState.clientNameByclientId = lodash.map(
      draftState?.processData?.policyInfo?.clientInfoList,
      (item) => {
        return {
          dictCode: item?.clientId,
          dictName: [item?.firstName, item?.middleName, item?.surname].join(' '),
        };
      }
    )),
      (draftState.entities.transactionTypesMap = Object.fromEntries(
        Object.entries(draftState.entities.transactionTypesMap || {}).map(([key, value]) => {
          if (formUtils.queryValue(value.transactionTypeCode) === 'SRV003') {
            const defaultOption = defaultOptionByRegion(StateSectionEnum.FUNDSWITCHING);

            const transferList = Object.values(
              lodash.groupBy(draftState.processData?.policyInfo?.policyFundDOList || [], 'fundCode')
            ).map((itemList) => {
              return {
                fundCode: itemList[0]?.fundCode,
                fundName: itemList[0]?.fundName,
                unitHolding: lodash.sum(itemList.map((item) => Number(item.unitHolding || 0))),
              };
            });

            const newFundSwitching = [
              ...value.fundSwitching.fundSwitchingFundList,
              ...transferList.filter((item) => {
                return !value?.fundSwitching?.fundSwitchingFundList.find(
                  (valueItem) => formUtils.queryValue(valueItem.fundCode) === item.fundCode
                );
              }),
            ];

            draftState.entities.transactionTypesMap[key].fundSwitching = {
              switchingOutOption: defaultOption,
              fundSwitchingFundList: newFundSwitching.map((item) => ({
                ...item,
                switchingOutOption: defaultOption,
                total: lodash.sum(
                  newFundSwitching.map((item) =>
                    Number(formUtils.queryValue(item?.switchInPerc) || 0)
                  )
                ),
              })),
            };
          }

          return [key, value];
        })
      ));
  });
