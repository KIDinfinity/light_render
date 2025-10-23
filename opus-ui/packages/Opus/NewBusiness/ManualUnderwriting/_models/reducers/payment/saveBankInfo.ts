import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';
import PayType from 'opus/NewBusiness/ManualUnderwriting/_enum/PayType';
import BankInfoType from 'opus/NewBusiness/Enum/BankInfoType';

export default (state: any, action: any) => {
  const { changedFields, id, type } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const {
      // renewalPayType,
      bankInfoList = [],
    } = draftState.modalData.processData.planInfoData || {};

    // const coverageList = draftState.processData?.coverageList || [];

    const extra: any = {};

    const isFindBankCode =
      formUtils.queryValue(changedFields.bankCode) &&
      !!lodash.find(bankInfoList, ({ bankCode }) => {
        return formUtils.queryValue(bankCode) == formUtils.queryValue(changedFields.bankCode);
      });

    const isFindBranchCode =
      formUtils.queryValue(changedFields.branchCode) &&
      !!lodash.find(bankInfoList, ({ branchCode }) => {
        return formUtils.queryValue(branchCode) == formUtils.queryValue(changedFields.branchCode);
      });
    const isFirstTimeUpdateFactoringHouse = !id && (isFindBankCode || isFindBranchCode);

    if (!lodash.find(bankInfoList, { id }) && !isFirstTimeUpdateFactoringHouse) {
      draftState.modalData.processData.planInfoData.bankInfoList = [
        ...(draftState.modalData.processData.planInfoData.bankInfoList || []),
        {
          ...changedFields,
          id: uuidv4(),
          type,
        },
      ];
    }

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'renewalPayType')) {
        draftState.modalData.processData.planInfoData.renewalPayType = formUtils.queryValue(
          changedFields.renewalPayType
        );
      }
      if (lodash.has(changedFields, 'refundPayType')) {
        draftState.modalData.processData.planInfoData.refundPayType = formUtils.queryValue(
          changedFields.refundPayType
        );
      }
      if (lodash.has(changedFields, 'icpDividendPayType')) {
        const payType = formUtils.queryValue(changedFields.icpDividendPayType);
        draftState.modalData.processData.planInfoData.icpDividendPayType = payType;
        draftState.modalData.processData.planInfoData.icpPayType = payType;
        draftState.modalData.processData.planInfoData.dividendPayType = payType;
      }

      if (lodash.has(changedFields, 'annuityPayType')) {
        const payType = formUtils.queryValue(changedFields.annuityPayType);
        draftState.modalData.processData.planInfoData.annuityPayType = payType;
      }

      if (lodash.has(changedFields, 'bankAcctFactoryHouse')) {
        extra.bankAcctFactoryHouse = formUtils.queryValue(changedFields.bankAcctFactoryHouse);
      }
    }

    draftState.modalData.processData.planInfoData.bankInfoList = lodash
      .chain(draftState.modalData.processData.planInfoData?.bankInfoList || [])
      .map((el: any) => {
        return el.id === id ||
          formUtils.queryValue(el.bankCode) === formUtils.queryValue(changedFields.bankCode) ||
          formUtils.queryValue(el.branchCode) === formUtils.queryValue(changedFields.branchCode)
          ? {
              ...el,
              ...changedFields,
              ...extra,
            }
          : el;
      })

      .value();

    const currentItemIsBankTransfer = lodash
      .chain(draftState.modalData.processData.planInfoData.icpDividendPayType)
      .isEqual(PayType.BankTransfer)
      .value();

    const targetItem = lodash.find(
      draftState.modalData.processData.planInfoData.bankInfoList,
      (item: any) => item.id === id
    );

    if (currentItemIsBankTransfer) {
      draftState.modalData.processData.planInfoData.bankInfoList = lodash
        .chain(draftState.modalData.processData.planInfoData?.bankInfoList || [])
        .map((item) => {
          if (
            [BankInfoType.IcpPay, BankInfoType.Dividend, BankInfoType.ICPDividend].includes(
              item.type
            )
          ) {
            return {
              ...item,
              ...changedFields,
              ...extra,
            };
          }
          return item;
        })
        .value();
    }
  });

  return { ...nextState };
};
