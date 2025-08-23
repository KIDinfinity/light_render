import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { v4 as uuid } from 'uuid';
import CardType from 'process/NewBusiness/ManualUnderwriting/_enum/CardType';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const coverageList = draftState.modalData?.processData?.coverageList || [];

    let bankCardInfoItem =
      draftState.modalData.processData?.planInfoData?.bankCardInfoList?.[0] || {};
    if (lodash.isEmpty(bankCardInfoItem)) {
      bankCardInfoItem = { id: uuid() };
    }

    let extra = {};

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'renewalPayType')) {
        draftState.modalData.processData.planInfoData.renewalPayType = formUtils.queryValue(
          changedFields.renewalPayType
        );
      }
      if (lodash.has(changedFields, 'icpDividendPayType')) {
        draftState.modalData.processData.planInfoData.icpDividendPayType = formUtils.queryValue(
          changedFields.icpDividendPayType
        );
      }
      if (lodash.has(changedFields, 'cardType')) {
        const cardType = formUtils.queryValue(changedFields?.cardType);
        const factoringHousesList = draftState?.factoringHousesList || [];

        const productCategory =
          lodash
            .chain(coverageList)
            .find((item: any) => item.isMain === 'Y')
            .get('productCategory')
            .value() || null;

        const factoringHouse = lodash
          .chain(factoringHousesList)
          .find((item: any) => {
            if (lodash.isEmpty(productCategory)) {
              return item?.bankCode === cardType;
            }
            return item?.bankCode === cardType && productCategory === item?.productCategory;
          })
          .get('factoringHouse')
          .value();

        extra = {
          ...extra,
          factoringHouse,
          sbcaca: cardType === CardType.SBC ? 'Y' : bankCardInfoItem.sbcaca,
        };
      }
    }

    draftState.modalData.processData.planInfoData.bankCardInfoList = [
      {
        ...bankCardInfoItem,
        ...changedFields,
        ...extra,
      },
    ];
  });

  return { ...nextState };
};
