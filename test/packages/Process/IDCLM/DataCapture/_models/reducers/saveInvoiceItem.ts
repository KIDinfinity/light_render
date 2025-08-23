import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';

const saveInvoiceItem = (state: any, action: any) => {
  const { invoiceId, changedFields } = action.payload;
  const finalChangedFields = { ...changedFields };
  const nextState = produce(state, (draftState: any) => {
    const fieldsArray = Object.entries(changedFields);
    draftState.claimEntities.invoiceListMap[invoiceId] = {
      ...state.claimEntities.invoiceListMap[invoiceId],
      ...finalChangedFields,
    };
    if (fieldsArray.length === 1 && tenant.isHK()) {
      const [name, { value }] = fieldsArray[0];

      if (name === 'invoiceDate' && value) {
        const invoiceListMapData = formUtils.cleanValidateData(
          draftState.claimEntities.invoiceListMap
        );
        lodash.map(invoiceListMapData, (invoice: any) => {
          const newInvoiceList = filterInvoiceList(invoiceListMapData, invoice.invoiceDate);

          lodash.map(newInvoiceList, (item: any, key) => {
            const invoiceNumber = key + 1;
            draftState.claimEntities.invoiceListMap[item.id].invoiceNo = getInvoiceNo(
              invoiceNumber,
              item.invoiceDate
            );
          });
        });
      }
    }
  });

  return { ...nextState };
};

export default saveInvoiceItem;
