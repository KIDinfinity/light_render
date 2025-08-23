import lodash from 'lodash';

export default (payableItem: any, entities: any) => {
  const newClaimEntities = entities;
  const editPayableItem = payableItem;
  const treatmentList = lodash.get(editPayableItem, 'treatmentPayableList');
  let invoiceList = lodash.get(editPayableItem, 'invoicePayableList') || [];
  let serviceList = lodash.get(editPayableItem, 'serviceItemPayableList') || [];
  if (!lodash.isEmpty(treatmentList)) {
    lodash.forEach(treatmentList, (id) => {
      const treatmentOfinvoiceList = lodash.get(
        newClaimEntities.treatmentPayableListMap[id],
        'invoicePayableList'
      );
      invoiceList = [...invoiceList, ...treatmentOfinvoiceList];
    });
    lodash.forEach(invoiceList, (id) => {
      const invoiceOfserviceList = lodash.get(
        newClaimEntities.invoicePayableListMap[id],
        'serviceItemPayableList'
      );
      serviceList = [...serviceList, ...invoiceOfserviceList];
    });
    lodash.forEach(invoiceList, (id) => {
      delete newClaimEntities.invoicePayableListMap[id];
    });
    lodash.forEach(treatmentList, (id) => {
      delete newClaimEntities.treatmentPayableListMap[id];
    });
    lodash.forEach(serviceList, (id) => {
      delete newClaimEntities.servicePayableListMap[id];
    });
    editPayableItem.treatmentPayableList = [];
  }
};
