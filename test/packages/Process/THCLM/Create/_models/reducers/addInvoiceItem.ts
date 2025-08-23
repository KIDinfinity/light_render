import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterInvoiceList, getInvoiceNo } from 'claim/pages/utils/handleInvoiceData';

const addInvoiceItem = (state: any, action: any) => {
  const { treatmentId, addInvoiceItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { treatmentListMap } = draftState.claimEntities;
    if (!draftState.claimEntities.treatmentListMap[treatmentId].invoiceList) {
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      addInvoiceItem.id,
    ];
    const dateOfConsultation =
      draftState.claimEntities.treatmentListMap[treatmentId]?.dateOfConsultation;

    draftState.claimEntities.invoiceListMap[addInvoiceItem.id] = {
      ...addInvoiceItem,
      invoiceDate: formUtils.queryValue(dateOfConsultation),
    };

    lodash.map(treatmentListMap, (treatment: any) => {
      const newInvoiceListMapData = formUtils.cleanValidateData(draftState.claimEntities.invoiceListMap);

      const newInvoiceList = filterInvoiceList(newInvoiceListMapData, treatment.dateOfConsultation);

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

export default addInvoiceItem;
