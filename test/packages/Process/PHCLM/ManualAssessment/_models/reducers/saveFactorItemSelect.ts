import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveFactorItemSelect = (state: any, { payload }: any) => {
  return produce(state, (draftState: any) => {
    const { changedFields, productCode, policyNo, incidentId, factorCode }: any = payload;
    const key = `${policyNo}${productCode}${incidentId}`;

    const factorList = draftState.adjustmentFactorListMap?.[key]?.factorList;
    const factorItem = draftState.adjustmentFactorListMap?.[key]?.factorList?.[factorCode];

    draftState.adjustmentFactorListMap[key].factorList[factorCode] = {
      ...factorItem,
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      const isSelected = formUtils.queryValue(changedFields?.isSelected);

      const newFactorList = lodash.reduce(
        factorList,
        (obj, item) => {
          if (
            (isSelected &&
              item.radioGroup === factorItem?.radioGroup &&
              item.factorCode !== factorCode &&
              item.productCode !== '0' &&
              factorItem.benefitTypeCode !== '0') ||
            (!isSelected && item?.parentFactorCode === factorCode)
          ) {
            return {
              ...obj,
              [item?.factorCode]: {
                ...item,
                isSelected: 0,
              },
            };
          }
          return {
            ...obj,
            [item?.factorCode]: item,
          };
        },
        {}
      );
      draftState.adjustmentFactorListMap[key].factorList = newFactorList;
    }
  });
};

export default saveFactorItemSelect;
