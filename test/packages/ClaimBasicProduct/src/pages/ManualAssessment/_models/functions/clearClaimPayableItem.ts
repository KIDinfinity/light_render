import lodash from 'lodash';

export default (editPayableItem: any, newClaimEntities: any) => {
  const treatmentList = lodash.get(editPayableItem, 'treatmentPayableList');
  let invoiceList = lodash.get(editPayableItem, 'invoicePayableList') || [];
  let serviceList = lodash.get(editPayableItem, 'serviceItemPayableList') || [];
  if (!lodash.isEmpty(treatmentList)) {
    lodash.each(treatmentList, (id) => {
      const treatmentOfinvoiceList = lodash.get(
        newClaimEntities.treatmentPayableListMap[id],
        'invoicePayableList'
      );
      invoiceList = [...invoiceList, ...treatmentOfinvoiceList];
    });
    lodash.each(invoiceList, (id) => {
      const invoiceOfserviceList = lodash.get(
        newClaimEntities.invoicePayableListMap[id],
        'serviceItemPayableList'
      );
      serviceList = [...serviceList, ...invoiceOfserviceList];
    });
    lodash.each(invoiceList, (id) => {
      delete newClaimEntities.invoicePayableListMap[id];
    });
    lodash.each(treatmentList, (id) => {
      delete newClaimEntities.treatmentPayableListMap[id];
    });
    lodash.each(serviceList, (id) => {
      delete newClaimEntities.servicePayableListMap[id];
    });
    editPayableItem.treatmentPayableList = [];
  }
};
