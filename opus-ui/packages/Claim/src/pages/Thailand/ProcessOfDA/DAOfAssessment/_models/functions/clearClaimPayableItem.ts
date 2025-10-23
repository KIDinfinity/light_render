import lodash, { isPlainObject } from 'lodash';

export default (editPayableItem: any, newClaimEntities: any) => {
  const treatmentList = lodash.get(editPayableItem, 'treatmentPayableList') || [];
  let invoiceList = lodash.get(editPayableItem, 'invoicePayableList') || [];
  let serviceList = lodash.get(editPayableItem, 'serviceItemPayableList') || [];

  if (!lodash.isEmpty(lodash.compact(treatmentList))) {
    lodash.map(treatmentList, (id) => {
      const treatmentOfinvoiceList = lodash.get(
        newClaimEntities.treatmentPayableListMap[id],
        'invoicePayableList'
      );
      invoiceList = [...invoiceList, ...lodash.compact(treatmentOfinvoiceList)];
    });
    lodash.map(invoiceList, (id) => {
      const invoiceOfserviceList = lodash.get(
        newClaimEntities.invoicePayableListMap[id],
        'serviceItemPayableList'
      );
      serviceList = [...serviceList, ...lodash.compact(invoiceOfserviceList)];
    });
    lodash.map(invoiceList, (id) => {
      if (isPlainObject(newClaimEntities.invoicePayableListMap))
        delete newClaimEntities.invoicePayableListMap[id];
    });
    lodash.map(treatmentList, (id) => {
      if (isPlainObject(newClaimEntities.treatmentPayableListMap))
        delete newClaimEntities.treatmentPayableListMap[id];
    });
    editPayableItem.treatmentPayableList = [];
  }
  if (
    lodash.isEmpty(lodash.compact(treatmentList)) &&
    !lodash.isEmpty(lodash.compact(invoiceList))
  ) {
    lodash.each(invoiceList, (id) => {
      const invoiceOfserviceList = lodash.get(
        newClaimEntities.invoicePayableListMap[id],
        'serviceItemPayableList'
      );
      serviceList = [...serviceList, ...lodash.compact(invoiceOfserviceList)];
    });
    lodash.each(invoiceList, (id) => {
      if (isPlainObject(newClaimEntities.invoicePayableListMap))
        delete newClaimEntities.invoicePayableListMap[id];
    });
    editPayableItem.invoicePayableList = [];
  }
  lodash.map(lodash.compact(serviceList), (id) => {
    if (isPlainObject(newClaimEntities.servicePayableListMap))
      delete newClaimEntities.servicePayableListMap[id];
  });
};
