import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';
import { buildEmptyInvoice } from '../functions/handlePopUp';

export default (state: any, action: any) => {
  const { invoiceId, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const invoiceList = draftState.popUpInvoiceList;
    const claimNo = draftState.claimProcessData?.claimNo;
    const newInvoiceItem = buildEmptyInvoice({ claimNo });

    let newPopUpInvoiceList: any = [];
    newPopUpInvoiceList = lodash.map(invoiceList, (item) => {
      if (item?.id === invoiceId) {
        return { ...item, ...changedFields };
      }
      return { ...item };
    });

    if (lodash.has(changedFields, 'invoiceDate')) {
      newPopUpInvoiceList = lodash.map(newPopUpInvoiceList, (invoice: any) => {
        if (formUtils.queryValue(invoice.invoiceDate)) {
          const invoiceListMapData = formUtils.cleanValidateData(newPopUpInvoiceList);
          const newInvoiceList = filterInvoiceList(invoiceListMapData, invoice.invoiceDate);

          return lodash.map(newInvoiceList, (item: any, key) => {
            const invoiceNumber = key + 1;
            return { ...item, invoiceNo: getInvoiceNo(invoiceNumber, item.invoiceDate) };
          });
        }
        return invoice;
      });

      newPopUpInvoiceList = lodash
        .chain(newPopUpInvoiceList)
        .flatten()
        .uniqBy('id')
        .orderBy('invoiceDate')
        .value();
    }
    if (
      lodash.has(changedFields, 'invoiceDate') &&
      lodash.isEmpty(draftState.popUpAddInvoiceItem)
    ) {
      draftState.popUpAddInvoiceItem = newInvoiceItem;
    }
    draftState.popUpInvoiceList = newPopUpInvoiceList;
  });
  return { ...nextState };
};
