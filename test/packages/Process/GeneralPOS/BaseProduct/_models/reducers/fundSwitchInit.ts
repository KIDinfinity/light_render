/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const defaultOption = defaultOptionByRegion(StateSectionEnum.FUNDSWITCHING);
    // 兼容旧case的数据结构
    if (
      lodash.isEmpty(
        lodash.get(draftState, `${transactionPath}.fundSwitching.switchingOutOption`)
      ) &&
      lodash.isArray(lodash.get(draftState, `${transactionPath}.fundSwitching`)) &&
      !lodash.isEmpty(lodash.get(draftState, `${transactionPath}.fundSwitching`))
    ) {
      lodash.set(draftState, `${transactionPath}.fundSwitching`, {
        switchingOutOption:
          lodash.get(draftState, `${transactionPath}.fundSwitching[0].switchingOutOption`) ||
          defaultOption,
        fundSwitchingFundList: lodash.get(draftState, `${transactionPath}.fundSwitching`),
      });
    }

    if (lodash.isEmpty(lodash.get(draftState, `${transactionPath}.fundSwitching`))) {
      const transferList =
        lodash
          .chain(
            Object.values(
              lodash.groupBy(draftState.processData?.policyInfo?.policyFundDOList || [], 'fundCode')
            )
          )
          .map((itemList) => {
            return {
              fundCode: itemList[0]?.fundCode,
              fundName: itemList[0]?.fundName,
              unitHolding: lodash.sum(itemList.map((item) => Number(item.unitHolding || 0))),
            };
          })
          .sortBy('unitHolding')
          .reverse()
          .value() || [];

      lodash.set(draftState, `${transactionPath}.fundSwitching`, {
        switchingOutOption: defaultOption,
        fundSwitchingFundList: transferList.map((item) => ({
          ...item,
          switchingOutOption: defaultOption,
          total: lodash.sum(
            transferList.map((item) => Number(formUtils.queryValue(item?.switchInPerc) || 0))
          ),
        })),
      });
    } else {
      const originFundList =
        draftState.processData?.policyInfo?.policyFundDOList?.map((item) => item?.fundCode) || [];

      const fundSwitchingFundList = lodash.get(
        draftState,
        `${transactionPath}.fundSwitching.fundSwitchingFundList`,
        []
      );

      lodash.set(
        draftState,
        `${transactionPath}.fundSwitching.fundSwitchingFundList`,
        fundSwitchingFundList?.map((item) => ({
          ...item,
          isAdd: !originFundList.includes(formUtils.queryValue(item?.fundCode)),
          switchingOutOption: item?.switchingOutOption || defaultOption,
        }))
      );

      lodash.set(
        draftState,
        `extraField.${StateSectionEnum.FUNDSWITCHING}.total`,
        lodash.sum(
          fundSwitchingFundList?.map((item) => Number(formUtils.queryValue(item.switchInPerc) || 0))
        )
      );
    }
  });
