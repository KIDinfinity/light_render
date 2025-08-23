import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { changedFields, factoringHousesList, bankInfoIndex, bankInfoType } = action.payload;

  const renewalPayType = lodash.get(state, 'businessData.policyList[0].renewalPayType');
  const bankInfoList = lodash.get(state, 'businessData.policyList[0].bankInfoList') || [];
  const coverageList = lodash.get(state, 'businessData.policyList[0].coverageList') || [];
  const nextState = produce(state, (draftState: any) => {
    if (bankInfoIndex === -1) {
      lodash.set(draftState, `businessData.policyList[0].bankInfoList`, [
        ...bankInfoList,
        { ...changedFields, type: bankInfoType },
      ]);
    } else {
      lodash.set(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`, {
        ...lodash.get(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`),
        ...changedFields,
        type:
          bankInfoIndex === bankInfoList?.length
            ? bankInfoType
            : lodash.get(
                draftState,
                `businessData.policyList[0].bankInfoList[${bankInfoIndex}].type`
              ),
      });
    }

    if (lodash.has(changedFields, 'bankCode') || lodash.has(changedFields, 'bankName')) {
      const bankCode =
        formUtils.queryValue(changedFields?.bankCode) ||
        formUtils.queryValue(changedFields?.bankName);

      const productCategory = lodash
        .chain(coverageList)
        .find((item: any) => item.isMain === 'Y')
        .get('productCategory')
        .value();

      const factoringHouseValue = lodash
        .chain(factoringHousesList)
        .find((item: any) => {
          const findCondition =
            item.renewalPayType === formUtils.queryValue(renewalPayType) &&
            item.bankCode === bankCode;
          if (lodash.isEmpty(productCategory)) {
            return findCondition;
          }
          return findCondition && productCategory === item.productCategory;
        })
        .get('factoringHouse')
        .value();
      const currentIndex = (() => {
        if (bankInfoIndex === -1) {
          return lodash.get(draftState, `businessData.policyList[0].bankInfoList`)?.length;
        } else {
          return bankInfoIndex;
        }
      })();
      lodash.set(draftState, `businessData.policyList[0].bankInfoList[${currentIndex}]`, {
        ...lodash.get(draftState, `businessData.policyList[0].bankInfoList[${currentIndex}]`),
        bankAcctFactoryHouse: factoringHouseValue,
        type:
          bankInfoIndex === bankInfoList?.length
            ? bankInfoType
            : lodash.get(
                draftState,
                `businessData.policyList[0].bankInfoList[${currentIndex}].type`
              ),
      });
    }
  });

  return { ...nextState };
};
