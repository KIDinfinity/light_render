import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';
import { buildEmptyInvoice } from '../functions/handlePopUp';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const claimNo = draftState.claimProcessData?.claimNo;
    const newInvoiceItem = buildEmptyInvoice({ claimNo });
    draftState.popUpAddInvoiceItem = { ...draftState.popUpAddInvoiceItem, ...changedFields };

    if (lodash.has(changedFields, 'invoiceDate')) {
      let newPopUpInvoiceList = [
        ...(draftState.popUpInvoiceList || []),
        draftState.popUpAddInvoiceItem,
      ];
      const invoiceListMapData = formUtils.cleanValidateData(newPopUpInvoiceList);
      newPopUpInvoiceList = lodash.map(invoiceListMapData, (invoice: any) => {
        const newInvoiceList = filterInvoiceList(invoiceListMapData, invoice.invoiceDate);

        return lodash.map(newInvoiceList, (item: any, key) => {
          const invoiceNumber = key + 1;
          return { ...item, invoiceNo: getInvoiceNo(invoiceNumber, item.invoiceDate) };
        });
      });

      draftState.popUpInvoiceList = lodash
        .chain(newPopUpInvoiceList)
        .flatten()
        .uniqBy('id')
        .orderBy('invoiceDate')
        .value();
      draftState.popUpAddInvoiceItem = newInvoiceItem;
    }
  });
  return { ...nextState };
};
