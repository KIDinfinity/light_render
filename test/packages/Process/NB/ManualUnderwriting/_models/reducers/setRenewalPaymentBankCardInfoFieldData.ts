import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CardType from 'process/NB/ManualUnderwriting/Enum/CardType';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  const coverageList = lodash.get(state, 'businessData.policyList[0].coverageList') || [];

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0].bankCardInfoList[0]', {
      ...lodash.get(draftState, 'businessData.policyList[0].bankCardInfoList[0]'),
      ...changedFields,
    });
    if (lodash.has(changedFields, 'cardType') && lodash.size(changedFields) === 1) {
      const cardType = formUtils.queryValue(changedFields?.cardType);
      const factoringHousesList = draftState?.factoringHousesList || [];

      const productCategory =
        lodash
          .chain(coverageList)
          .find((item: any) => item.isMain === 'Y')
          .get('productCategory')
          .value() || null;

      const factoringHouseValue = lodash
        .chain(factoringHousesList)
        .find((item: any) => {
          if (lodash.isEmpty(productCategory)) {
            return item?.bankCode === cardType;
          }
          return item?.bankCode === cardType && productCategory === item?.productCategory;
        })
        .get('factoringHouse')
        .value();

      lodash.set(
        draftState,
        'businessData.policyList[0].bankCardInfoList[0].factoringHouse',
        factoringHouseValue
      );
      // 添加对SBC类型cardType对sbcaca值更改
      if (cardType === CardType.SBC) {
        lodash.set(draftState, 'businessData.policyList[0].bankCardInfoList[0].sbcaca', 'Y');
      }
    }
  });

  return { ...nextState };
};
