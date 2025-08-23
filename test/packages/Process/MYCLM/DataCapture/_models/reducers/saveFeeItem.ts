import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { updateAmount, updateNetExpense } from '../functions/updateServiceItemExpense';

const saveFeeItem = (state: any, action: any) => {
  const { feeItemId, serviceItemId, changedFields, invoiceId }: any = action.payload;

  const nextState = produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'feeAmount')) {
        const feeItemList =
          draftState.claimEntities?.serviceItemListMap[serviceItemId]?.feeItemList;
        const feeItemListMap = draftState.claimEntities.feeItemListMap;

        const newExpense = lodash.reduce(
          lodash.pull(lodash.cloneDeep(feeItemList), feeItemId),
          (sum, item: any) => {
            return add(sum, formUtils.queryValue(feeItemListMap?.[item]?.feeAmount) || 0);
          },
          formUtils.queryValue(changedFields.feeAmount) || 0
        );

        draftState.claimEntities.serviceItemListMap[serviceItemId].expense = lodash.isNumber(
          newExpense
        )
          ? newExpense
          : formUtils.queryValue(
              draftState.claimEntities?.serviceItemListMap?.[serviceItemId]?.expense
            ) || 0;

        updateAmount({
          targetField: 'expense',
          value: formUtils.queryValue(
            draftState.claimEntities.serviceItemListMap[serviceItemId].expense
          ),
          draftState,
          serviceItemId,
          invoiceId,
        });

        updateNetExpense({
          draftState,
          serviceItemId,
        });
      }
    }
    draftState.claimEntities.feeItemListMap[feeItemId] = {
      ...(state.claimEntities?.feeItemListMap?.[feeItemId] || {}),
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveFeeItem;
