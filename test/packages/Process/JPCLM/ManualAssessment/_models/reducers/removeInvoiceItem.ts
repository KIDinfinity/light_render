import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';
import { valueIsEmpty } from '@/utils/claimUtils';

const removeInvoiceItem = (state: any, action: any) => {
  const { treatmentId, invoiceId, newServiceList } = action.payload;

  const nextState = produce(state, (draftState) => {
    const expense = lodash
      .chain(draftState.claimEntities.serviceItemListMap)
      .pick(newServiceList)
      .reduce((sum, n) => {
        if (!valueIsEmpty(n.expense)) {
          return sum + formUtils.queryValue(n.expense);
        }
        return sum;
      }, 0)
      .value();
    if (lodash.isEmpty(newServiceList)) {
      const { treatmentListMap } = draftState.claimEntities;
      const serviceIdList = draftState.claimEntities.invoiceListMap[invoiceId]?.serviceItemList; // 获取特定发票的服务项列表

      const invoiceList = draftState.claimEntities.treatmentListMap[treatmentId]?.invoiceList; //获取特定治疗的发票列表。

      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = lodash.filter(
        invoiceList,
        (itemId) => itemId !== invoiceId
      );
      const invoiceDate = formUtils.queryValue(
        draftState?.claimEntities?.invoiceListMap[invoiceId]?.invoiceDate
      );
      delete draftState.claimEntities.invoiceListMap[invoiceId];
      lodash.map(serviceIdList, (itemId) => {
        delete draftState.claimEntities.serviceItemListMap[itemId];
      });

      lodash.map(treatmentListMap, (treatment: any) => {
        const invoiceListMapDataN = formUtils.cleanValidateData(
          draftState.claimEntities.invoiceListMap
        );

        const newInvoiceList = filterInvoiceList(invoiceListMapDataN, invoiceDate);
        lodash.map(newInvoiceList, (item: any, key) => {
          const invoiceNumber = key + 1;
          draftState.claimEntities.invoiceListMap[item.id].invoiceNo = getInvoiceNo(
            invoiceNumber,
            item.invoiceDate
          );
        });
      });
    } else {
      draftState.claimEntities.invoiceListMap[invoiceId] = {
        ...draftState.claimEntities.invoiceListMap[invoiceId],
        serviceItemList: newServiceList,
        expense,
      };
    }
  });

  return { ...nextState };
};

export default removeInvoiceItem;
