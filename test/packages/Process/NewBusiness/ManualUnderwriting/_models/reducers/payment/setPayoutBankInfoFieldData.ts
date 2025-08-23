import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { changedFields, id, type } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const { renewalPayType, bankInfoList = [] } =
      draftState.modalData.processData.planInfoData || {};

    const coverageList = draftState.processData?.coverageList || [];

    const extra: any = {};

    if (!lodash.find(bankInfoList, { id })) {
      draftState.modalData.processData.planInfoData.bankInfoList = [
        ...(draftState.modalData.processData.planInfoData.bankInfoList || []),
        {
          ...changedFields,
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
      if (lodash.has(changedFields, 'bankCode') || lodash.has(changedFields, 'bankName')) {
        // 这里去掉了bankName的判断,因为没有banName字段
        const productCategory =
          lodash
            .chain(coverageList)
            .find((item: any) => item.isMain === 'Y')
            .get('productCategory')
            .value() || null;

        const bankCode =
          formUtils.queryValue(changedFields?.bankCode) ||
          formUtils.queryValue(changedFields?.bankName);

        extra.bankAcctFactoryHouse = lodash
          .chain(draftState.factoringHousesList || [])
          .find((item: any) => {
            const findCondition = item?.bankCode === bankCode;

            return lodash.isEmpty(productCategory)
              ? findCondition
              : findCondition && productCategory === item.productCategory;
          })
          .get('factoringHouse')
          .value();
      }
    }

    draftState.modalData.processData.planInfoData.bankInfoList = lodash
      .chain(draftState.modalData.processData.planInfoData?.bankInfoList || [])
      .map((el: any) => {
        return el.id === id
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
