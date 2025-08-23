import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { changedFields, id, type } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const {
      // renewalPayType,
      bankInfoList = [],
    } = draftState.modalData.processData.planInfoData || {};

    // const coverageList = draftState.processData?.coverageList || [];

    const extra: any = {};

    console.log('bankInfoList', id, lodash.cloneDeep(bankInfoList));
    const isFirstTimeUpdateFactoringHouse =
      !id &&
      !!lodash.find(bankInfoList, ({ bankCode }) => {
        return formUtils.queryValue(bankCode) == formUtils.queryValue(changedFields.bankCode);
      });

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
        draftState.modalData.processData.planInfoData.icpDividendPayType = formUtils.queryValue(
          changedFields.icpDividendPayType
        );
      }
      if (lodash.has(changedFields, 'bankAcctFactoryHouse')) {
        extra.bankAcctFactoryHouse = formUtils.queryValue(changedFields.bankAcctFactoryHouse);
      }
    }

    draftState.modalData.processData.planInfoData.bankInfoList = lodash
      .chain(draftState.modalData.processData.planInfoData?.bankInfoList || [])
      .map((el: any) => {
        return el.id === id ||
          formUtils.queryValue(el.bankCode) === formUtils.queryValue(changedFields.bankCode)
          ? {
              ...el,
              ...changedFields,
              ...extra,
            }
          : el;
      })
      .value();
  });

  return { ...nextState };
};
