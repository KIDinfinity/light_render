import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';

const removeInvoiceItem = (state: any, action: any) => {
  const { treatmentId, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { treatmentListMap } = draftState.claimEntities;
    const serviceIdList = draftState.claimEntities.invoiceListMap[invoiceId]?.serviceItemList;
    const invoiceList = draftState.claimEntities.treatmentListMap[treatmentId]?.invoiceList;
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
  });

  return { ...nextState };
};

export default removeInvoiceItem;
