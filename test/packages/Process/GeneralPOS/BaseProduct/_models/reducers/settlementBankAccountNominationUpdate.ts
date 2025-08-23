/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OperationTypeEnum, OptionEnum } from 'process/GeneralPOS/common/Enum';
import { tenant } from '@/components/Tenant';

const updateTypeFn = {
  [OperationTypeEnum.ADD]: (state, cf, otherParams) => {
    const { transactionPath } = otherParams;

    const newData = lodash
      .get(state, `${transactionPath}.paymentMethodList[0].txPmBankList`, [])
      .map((item) => ({ ...item, selected: false }));

    const otherData = tenant.isPH()
      ? {
          typeOfAccount: 'Savings',
          bankCurrency: 'PHP',
        }
      : {};

    newData.push({
      ...cf,
      ...otherData,
      bankNewAdd: 'Y',
      bankName: state?.allBank?.find((item) => item.dictCode === formUtils.queryValue(cf.bankCode))
        ?.name,
      selected: true,
    });
    return newData;
  },

  [OperationTypeEnum.UPDATE]: (state, cf, otherParams) => {
    const { transactionPath, validating } = otherParams;
    const mainPolicyId = lodash.get(state, `processData.mainPolicyId`);
    const payoutPaymentMethod = lodash.get(state, `${transactionPath}.defaultPayoutPaymentMethod`);
    let setPreferredPayout = lodash.get(
      state,
      `${transactionPath}.paymentMethodList[0].setPreferredPayout`
    );
    const txPmBankList =
      lodash.get(state, `${transactionPath}.paymentMethodList[0].txPmBankList`) || [];
    const originTXPmBankList = lodash
      .chain(state.processData?.policyInfo?.clientBankAccountList)
      ?.filter(
        (item) =>
          !lodash.isEmpty(item.bankAccountNo) &&
          !lodash.isEmpty(item.clientId) &&
          !lodash.isEmpty(state?.processData?.policyInfo?.mainOwnerClientId) &&
          item?.clientId === state?.processData?.policyInfo?.mainOwnerClientId
      )
      ?.reduce((res, i) => {
        if (
          payoutPaymentMethod == OptionEnum.BTR &&
          i.preferPaymentFlow == 'O' &&
          i.policyId == mainPolicyId
        ) {
          i.isDefaultPayoutBank = true;
          res.unshift(i);
        } else {
          res.push(i);
        }
        return res;
      }, [])
      ?.map((bankItem, itemIndex) => ({
        ...bankItem,
        bankNewAdd: 'N',
        selected: itemIndex === 0 ? true : false,
        onlyKey: `${bankItem?.bankCode}${bankItem?.bankAccountNo}${bankItem?.bankAccountName}`,
      }))
      ?.uniqBy('onlyKey')
      .value();

    if (!validating && lodash.hasIn(cf, 'payoutOption')) {
      switch (formUtils.queryValue(cf.payoutOption)) {
        case OptionEnum.BTR: {
          lodash.set(state, `${transactionPath}.paymentMethodList`, [
            {
              ...lodash.get(state, `${transactionPath}.paymentMethodList[0]`),
              txPmBankList: lodash.isEmpty(txPmBankList) ? originTXPmBankList : txPmBankList,
            },
          ]);
          break;
        }
      }
      setPreferredPayout = '';
    }

    const data = Object.values(cf);
    lodash.set(state, `${transactionPath}.paymentMethodList[0]`, {
      ...lodash.get(state, `${transactionPath}.paymentMethodList[0]`),
      ...(!validating
        ? data.reduce((res, i) => {
            res[i.name] = i.value;
            return res;
          }, {})
        : cf),
      setPreferredPayout,
    });
  },

  [OperationTypeEnum.LISTINFOUPDATE]: (state, cf, otherParams) => {
    const { transactionPath, index, txPmBankList } = otherParams;

    if (lodash.hasIn(cf, 'promptPayId')) {
      lodash.set(state, `${transactionPath}.paymentMethodList[0].txPmPromptPayList`, [cf]);
      return;
    }
    if (lodash.hasIn(cf, 'sourceBank')) {
      lodash.set(state, `${transactionPath}.paymentMethodList[0].txPmChequeList[0]`, cf);
      return;
    }
    if (index === -1 || !lodash.isNumber(index) || lodash.isEmpty(txPmBankList)) {
      return;
    }

    const bankCode = formUtils.queryValue(txPmBankList[index]?.bankCode);
    const newData = txPmBankList[index];

    if (lodash.hasIn(cf, 'bankCode')) {
      const bankName = state.allBank?.find(
        (item) => item.dictCode === formUtils.queryValue(cf.bankCode)
      )?.name;
      newData.bankName = bankName;
      if (tenant.isPH()) {
        newData.branchCode = formUtils.queryValue(cf.bankCode);
      }
    }
    if (lodash.hasIn(cf, 'branchCode')) {
      const bankBranchName = state.bankBranchByCodeMap?.[bankCode]?.find(
        (item) => item.dictCode === formUtils.queryValue(cf.branchCode)
      )?.name;
      newData.bankBranchName = bankBranchName;
    }
    lodash.set(state, `${transactionPath}.paymentMethodList[0].txPmBankList[${index}]`, {
      ...newData,
      ...cf,
    });
  },
};

export { updateTypeFn };

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, index, changedFields, type, validating = false } = payload;

    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const paymentMethodList = lodash.get(draftState, `${transactionPath}.paymentMethodList`);
    const txPmBankList = paymentMethodList?.[0]?.txPmBankList || [];

    if (!validating) {
      lodash.set(
        draftState,
        `${transactionPath}.paymentMethodList[0].payoutOption`,
        formUtils.cleanValidateData({
          payoutOption: lodash.get(
            draftState,
            `${transactionPath}.paymentMethodList[0].payoutOption`
          ),
        }).payoutOption
      );
    }

    switch (type) {
      case OperationTypeEnum.ADD: {
        const data = updateTypeFn[OperationTypeEnum.ADD](draftState, changedFields, {
          transactionPath,
        });

        lodash.set(draftState, `${transactionPath}.paymentMethodList[0].txPmBankList`, data);

        break;
      }

      case OperationTypeEnum.UPDATE: {
        updateTypeFn[OperationTypeEnum.UPDATE](draftState, changedFields, {
          transactionPath,
          validating,
        });

        break;
      }

      case OperationTypeEnum.LISTINFOUPDATE: {
        updateTypeFn[OperationTypeEnum.LISTINFOUPDATE](draftState, changedFields, {
          transactionPath,
          index,
          txPmBankList,
        });
        break;
      }

      case OperationTypeEnum.DELETE: {
        if (paymentMethodList[0].txPmBankList[index]?.selected) {
          lodash.set(
            draftState,
            `${transactionPath}.paymentMethodList[0].txPmBankList[0].selected`,
            true
          );
        }

        paymentMethodList[0].txPmBankList.splice(index, 1);
        break;
      }

      case OperationTypeEnum.COVER:
        {
          if (!validating && lodash.hasIn(changedFields, 'selected')) {
            const preSelectedIdx = lodash
              .get(draftState, `${transactionPath}.paymentMethodList[0].txPmBankList`)
              .findIndex((i) => i.selected);

            if (preSelectedIdx > -1 && preSelectedIdx !== index) {
              lodash.set(
                draftState,
                `${transactionPath}.paymentMethodList[0].setPreferredPayout`,
                ''
              );
            }

            lodash.set(
              draftState,
              `${transactionPath}.paymentMethodList[0].txPmBankList`,
              txPmBankList.map((item, payIndex) => ({
                ...item,
                selected: payIndex === index ? true : false,
              }))
            );
          }
        }
        break;
    }
  });
