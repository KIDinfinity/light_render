import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';


const updateAmount = ({ newServiceList, serviceItemListMap, targetField }: any) => {
  return lodash
    .chain(serviceItemListMap)
    .pick(newServiceList)
    .reduce((sum, n) => {
      if (!valueIsEmpty(n[targetField])) {
        return sum + formUtils.queryValue(n[targetField]);
      }
      return sum;
    }, 0)
    .value();
};

const removeServiceItem = (state: any, action: any) => {
  const { invoiceId, serviceItemId } = action.payload;

  const newServiceList = lodash.filter(
    state.claimEntities.invoiceListMap[invoiceId].serviceItemList,
    (item) => item !== serviceItemId
  );

  const serviceItemListMap = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(state.claimEntities.serviceItemListMap)
  );

  const nextState = produce(state, (draftState) => {
    const expense = updateAmount({
      newServiceList,
      serviceItemListMap,
      targetField: 'expense',
    });

    const otherInsurerPaidAmount = updateAmount({
      newServiceList,
      serviceItemListMap,
      targetField: 'otherInsurerPaidAmount',
    });
    draftState.claimEntities.invoiceListMap[invoiceId] = {
      ...draftState.claimEntities.invoiceListMap[invoiceId],
      serviceItemList: newServiceList,
      expense,
      otherInsurerPaidAmount,
    };
    delete draftState.claimEntities.serviceItemListMap[serviceItemId];
  });

  return { ...nextState };
};

export default removeServiceItem;
