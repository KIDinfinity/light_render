/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { OptionEnum, StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion, computeAmt } from 'process/GeneralPOS/common/utils';
import { tenant, Region } from '@/components/Tenant';
import { updateTypeFn } from './partialWithdrawalUpdate';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;

    if (
      lodash.isEmpty(lodash.get(draftState, `${transactionPath}.partialWithdrawal`)) &&
      lodash.isEmpty(lodash.get(draftState, `${transactionPath}.partialWithdrawalList`))
    ) {
      lodash.set(
        draftState,
        `${transactionPath}.partialWithdrawal.withdrawalLevel`,
        defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALLEVEL)
      );
      lodash.set(
        draftState,
        `${transactionPath}.partialWithdrawal.withdrawalOpt`,
        defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALOPTION)
      );
      lodash.set(draftState, `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`, []);
    }

    // 兼容旧case的数据结构
    if (
      lodash.isEmpty(
        lodash.get(draftState, `${transactionPath}.partialWithdrawal.withdrawalOpt`)
      ) &&
      !lodash.isEmpty(lodash.get(draftState, `${transactionPath}.partialWithdrawalList`))
    ) {
      lodash.set(
        draftState,
        `${transactionPath}.partialWithdrawal.withdrawalOpt`,
        lodash.get(
          draftState,
          `${transactionPath}.partialWithdrawal.partialWithdrawalFundList[0].withdrawalOpt`
        ) || defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALOPTION)
      );
      lodash.set(
        draftState,
        `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`,
        lodash.get(draftState, `${transactionPath}.partialWithdrawalList`)
      );
    }

    const partialWithdrawalFundList =
      lodash.get(
        draftState,
        `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`,
        []
      ) || [];

    if (tenant.isPH() && lodash.isEmpty(partialWithdrawalFundList)) {
      lodash.forEach(draftState?.processData?.policyInfo?.policyFundDOList, (item) => {
        partialWithdrawalFundList.push(
          ...updateTypeFn.ADD(
            draftState,
            { fundCode: item?.fundCode },
            {
              isNotDataCapture: true,
              withdrawalOpt:
                partialWithdrawalFundList?.[0]?.withdrawalOpt ||
                defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALOPTION),
            }
          )
        );
      });
    }
    lodash.set(
      draftState,
      `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`,
      partialWithdrawalFundList?.map((item) => {
        let writeWithdrawalAmt = null;
        let withdrawalAmt = null;
        if (
          lodash.get(draftState, `${transactionPath}.partialWithdrawal.withdrawalOpt`) ===
          OptionEnum.Amount
        ) {
          writeWithdrawalAmt =
            item?.withdrawalAmt || item?.withdrawalAmt === 0
              ? item?.withdrawalAmt
              : item?.writeWithdrawalAmt;
          withdrawalAmt = computeAmt[OptionEnum.Amount](writeWithdrawalAmt);
        }

        if (
          lodash.get(draftState, `${transactionPath}.partialWithdrawal.withdrawalOpt`) ===
          OptionEnum.Unit
        ) {
          writeWithdrawalAmt = null;
          withdrawalAmt = computeAmt[OptionEnum.Unit](item?.withdrawalUnit, item?.unitPrice);
        }

        if (
          lodash.get(draftState, `${transactionPath}.partialWithdrawal.withdrawalOpt`) ===
          OptionEnum.Percent
        ) {
          writeWithdrawalAmt = null;
          withdrawalAmt = computeAmt[OptionEnum.Percent](
            item?.withdrawalPct,
            item?.unitPrice,
            item?.unitHolding
          );
        }
        return {
          ...item,
          isAdd: true,
          writeWithdrawalAmt: tenant.region({
            [Region.MY]:
              lodash.get(draftState, `${transactionPath}.partialWithdrawal.withdrawalOpt`) ===
              OptionEnum.Amount
                ? item?.withdrawalAmt || item?.withdrawalAmt === 0
                  ? item?.withdrawalAmt
                  : item?.writeWithdrawalAmt
                : 0,
            [Region.PH]: writeWithdrawalAmt,
            notMatch: null,
          }),
          withdrawalAmt: tenant.region({
            [Region.MY]:
              lodash.get(draftState, `${transactionPath}.partialWithdrawal.withdrawalOpt`) ===
              OptionEnum.Amount
                ? item?.withdrawalAmt || item?.withdrawalAmt === 0
                  ? item?.withdrawalAmt
                  : item?.writeWithdrawalAmt
                : Number(item?.unitPrice || 0) * Number(item?.withdrawalUnit || 0),
            [Region.PH]: withdrawalAmt,
            notMatch: withdrawalAmt,
          }),
        };
      })
    );
  });
