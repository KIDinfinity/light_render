/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import {
  DecisionEnum,
  OperationTypeEnum,
  PremiumTypeEnum,
  OptionEnum,
  StateSectionEnum,
} from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion, computeAmt } from 'process/GeneralPOS/common/utils';
import { tenant, Region } from '@/components/Tenant';

const OptionMapKey = {
  [OptionEnum.Unit]: 'withdrawalUnit',
  [OptionEnum.Amount]: 'writeWithdrawalAmt',
  [OptionEnum.Percent]: 'withdrawalPct',
};

export const updateTypeFn = {
  [OperationTypeEnum.ADD]: (state, cf, otherParams) => {
    const { isNotDataCapture, withdrawalOpt } = otherParams;
    let data = [
      {
        ...cf,
        premiumType: PremiumTypeEnum.BOTH,
        isAdd: true,
      },
    ];

    if (isNotDataCapture || tenant.isPH()) {
      const cleanFundCode = formUtils.queryValue(cf?.fundCode);

      const fundList = lodash
        .groupBy(state?.processData?.policyInfo?.policyFundDOList, 'fundCode')
        ?.[cleanFundCode]?.map((item) => ({
          ...item,
          isAdd: true,
        }));
      const unitPric = Number(state.priceByfundCode?.[cleanFundCode]?.[0]?.bidPrice || 0);
      if (tenant.isPH()) {
        data = [
          {
            ...(fundList?.[0] || {}),
            isAdd: true,
            unitHolding: fundList?.[0]?.unitHolding || 0,
            premiumType: PremiumTypeEnum.BOTH,
            unitPrice: fundList?.[0]?.pricePerUnit || 0,
            accountValue: fundList?.[0]?.pricePerUnit * fundList?.[0]?.unitHolding || 0,
            withdrawalOpt,
            ...cf,
          },
        ];
      } else {
        data = [
          ...fundList,
          {
            isAdd: true,
            unitHolding: lodash.sum(fundList.map((item) => Number(item.unitHolding || 0))),
            premiumType: PremiumTypeEnum.BOTH,
            unitPrice: unitPric,
            accountValue:
              unitPric * lodash.sum(fundList.map((item) => Number(item.unitHolding || 0))),
            withdrawalOpt,
            ...cf,
          },
        ];
      }
    }
    return data;
  },

  [OperationTypeEnum.LISTINFOUPDATE]: (state, cf, otherParams) => {
    const { index, transactionPath, validating, decision, isNotDataCapture, fundCode } =
      otherParams;
    const extra = {};
    if (!validating) {
      const changeKey = Object.keys(cf)[0];

      const cleanCurrentWithDrawal = formUtils.cleanValidateData(
        lodash.get(
          state,
          `${transactionPath}.partialWithdrawal.partialWithdrawalFundList[${index}]`
        )
      );
      const { unitPrice, unitHolding } = cleanCurrentWithDrawal || {};


      const isChange = formUtils.queryValue(cf[changeKey]) !== cleanCurrentWithDrawal?.[changeKey];

      lodash.set(state, 'processData.showReAssess', {
        show:
          decision !== DecisionEnum.D && isChange ? true : state.processData?.showReAssess?.show,
        change: isChange ? true : state.processData?.showReAssess?.change,
        warnMessage: isChange
          ? lodash.uniq([...(state.processData?.showReAssess?.warnMessage || []), 'MSG_000828'])
          : state.processData?.showReAssess?.warnMessage,
      });

      if (lodash.hasIn(cf, 'withdrawalUnit') || lodash.hasIn(cf, 'withdrawalPct')) {
        extra.withdrawalAmt = lodash.isEmpty(`${formUtils.queryValue(cf[changeKey])}`)
          ? null
          : Number(unitPrice || 0) *
            Number(formUtils.queryValue(cf[changeKey]) || 0) *
            (lodash.hasIn(cf, 'withdrawalPct') ? Number(unitHolding || 0) / 100 : 1);
      }

      if (lodash.hasIn(cf, 'fundCode')) {
        const data = updateTypeFn[OperationTypeEnum.ADD](state, cf, {
          isNotDataCapture,
        });
        const newList = lodash.get(
          state,
          `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`
        );

        const removeIndex = newList.findIndex(
          (item) => formUtils.queryValue(item.fundCode) === fundCode
        );

        newList.splice(removeIndex, 0, ...data);

        lodash.set(
          state,
          `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`,
          newList.filter((item) => formUtils.queryValue(item.fundCode) !== fundCode)
        );

        return state;
      }

      if (
        lodash.hasIn(cf, 'writeWithdrawalAmt') &&
        [Region.MY, Region.PH].includes(tenant.region())
      ) {
        extra.withdrawalAmt = lodash.isEmpty(`${formUtils.queryValue(cf.writeWithdrawalAmt)}`)
          ? null
          : formUtils.queryValue(cf.writeWithdrawalAmt);
      }
    }

    lodash.set(state, `${transactionPath}.partialWithdrawal.partialWithdrawalFundList[${index}]`, {
      ...lodash.get(
        state,
        `${transactionPath}.partialWithdrawal.partialWithdrawalFundList[${index}]`
      ),
      ...cf,
      ...extra,
    });
    return state;
  },

  [OperationTypeEnum.COVER]: (state, cf, otherParams) => {
    const { transactionPath, validating, isNotDataCapture } = otherParams;
    const oldOption = formUtils.queryValue(
      lodash.cloneDeep(lodash.get(state, `${transactionPath}.partialWithdrawal.withdrawalOpt`))
    );

    if (lodash.hasIn(cf, 'withdrawalOpt') && !validating) {
      lodash.set(state, `${transactionPath}.partialWithdrawal.withdrawalOpt`, cf.withdrawalOpt);
    }

    const newList = lodash
      .get(state, `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`, [])
      .map((item) => {
        const valueItem = formUtils.cleanValidateData(item);
        let otherData = {};

        if (lodash.hasIn(cf, 'withdrawalOpt') && !validating) {
          const withdrawalOpt = formUtils.queryValue(cf.withdrawalOpt);
          const { unitPrice, unitHolding } = valueItem || {};
          otherData = {
            withdrawalPct: null,
            withdrawalUnit: null,
            withdrawalAmt: null,
            writeWithdrawalAmt: null,
          };
          const lastData =
            withdrawalOpt === OptionEnum.Percent
              ? Number(Number(valueItem[OptionMapKey?.[oldOption]] || 0).toFixed()) || null
              : valueItem[OptionMapKey?.[oldOption]];

          otherData.withdrawalAmt = computeAmt[withdrawalOpt](lastData, unitPrice, unitHolding);

          otherData[OptionMapKey[withdrawalOpt]] = lastData;
        }

        return { ...item, ...cf, ...otherData };
      });
    lodash.set(state, `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`, newList);
  },
};

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    let {
      transactionId,
      fundCode,
      changedFields,
      type,
      validating = false,
      isNotDataCapture,
    } = payload;
    fundCode = formUtils.queryValue(fundCode);
    const decision = formUtils.queryValue(draftState.processData?.decision);
    const reasonChanged = lodash.get(changedFields, 'partialWithdrawalReason');

    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;

    if (!validating) {
      lodash.set(
        draftState,
        `${transactionPath}.transactionTypeCode`,
        formUtils.queryValue(lodash.get(draftState, `${transactionPath}.transactionTypeCode`))
      );
    }
    // 切换option，添加，删除的时候会触发
    if (type !== OperationTypeEnum.LISTINFOUPDATE && !validating && !reasonChanged) {
      draftState.processData.showReAssess = {
        show: decision !== DecisionEnum.D,
        change: true,
        warnMessage: lodash.uniq([
          ...(draftState.processData?.showReAssess?.warnMessage || []),
          'MSG_000828',
        ]),
      };
    }

    const partialWithdrawalFundList = lodash.get(
      draftState,
      `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`
    );

    switch (type) {
      case OperationTypeEnum.ADD: {
        const withdrawalOpt =
          partialWithdrawalFundList?.[0]?.withdrawalOpt ||
          defaultOptionByRegion(StateSectionEnum.PARTIALWITHDRAWALOPTION);

        draftState.entities.transactionTypesMap[
          transactionId
        ].partialWithdrawal.partialWithdrawalFundList.push(
          ...updateTypeFn[OperationTypeEnum.ADD](draftState, changedFields, {
            isNotDataCapture,
            withdrawalOpt,
          })
        );
        break;
      }

      case OperationTypeEnum.LISTINFOUPDATE: {
        changedFields = Object.fromEntries(
          Object.entries(changedFields).filter(([key, value]) =>
            ['fundCode', 'withdrawalUnit', 'withdrawalPct', 'writeWithdrawalAmt'].includes(key)
          )
        );
        const index = lodash
          .get(draftState, `${transactionPath}.partialWithdrawal.partialWithdrawalFundList`, [])
          ?.findIndex(
            (item: any) =>
              formUtils.queryValue(item.fundCode) === fundCode &&
              (isNotDataCapture
                ? formUtils.queryValue(item.premiumType) === PremiumTypeEnum.BOTH
                : true)
          );

        updateTypeFn[OperationTypeEnum.LISTINFOUPDATE](draftState, changedFields, {
          index,
          transactionPath,
          validating,
          decision,
          isNotDataCapture,
          fundCode,
        });
        break;
      }

      case OperationTypeEnum.DELETE: {
        draftState.entities.transactionTypesMap[
          transactionId
        ].partialWithdrawal.partialWithdrawalFundList = partialWithdrawalFundList.filter(
          (item) => formUtils.queryValue(item.fundCode) !== fundCode
        );

        break;
      }

      case OperationTypeEnum.COVER: {
        updateTypeFn[OperationTypeEnum.COVER](draftState, changedFields, {
          transactionPath,
          validating,
          isNotDataCapture,
        });

        break;
      }
      case OperationTypeEnum.UPDATE: {
        draftState.entities.transactionTypesMap[transactionId].partialWithdrawal = {
          ...draftState.entities.transactionTypesMap[transactionId].partialWithdrawal,
          ...changedFields,
        };
        if (!validating) {
          if (lodash.hasIn(changedFields, 'requestTotalAmount')) {
            draftState.entities.transactionTypesMap[
              transactionId
            ].partialWithdrawal.requestTotalPerc = null;
          }
          if (lodash.hasIn(changedFields, 'requestTotalPerc')) {
            draftState.entities.transactionTypesMap[
              transactionId
            ].partialWithdrawal.requestTotalAmount = null;
          }

          if (lodash.hasIn(changedFields, 'withdrawalLevel')) {
            draftState.entities.transactionTypesMap[
              transactionId
            ].partialWithdrawal.requestTotalAmount = formUtils.queryValue(
              draftState.entities.transactionTypesMap[transactionId].partialWithdrawal
                .requestTotalAmount
            );

            draftState.entities.transactionTypesMap[
              transactionId
            ].partialWithdrawal.requestTotalPerc = formUtils.queryValue(
              draftState.entities.transactionTypesMap[transactionId].partialWithdrawal
                .requestTotalPerc
            );
          }
        }
        break;
      }
    }
  });
