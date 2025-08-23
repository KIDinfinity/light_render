import lodash from 'lodash';

export default (editPayableItem: any, newClaimEntities: any) => {
  const treatmentList = lodash.get(editPayableItem, 'treatmentPayableList') || [];
  let invoiceList = lodash.get(editPayableItem, 'invoicePayableList') || [];
  let serviceList = lodash.get(editPayableItem, 'serviceItemPayableList') || [];

  if (!lodash.isEmpty(lodash.compact(treatmentList))) {
    lodash.each(treatmentList, (id) => {
      const treatmentOfinvoiceList = lodash.get(
        newClaimEntities.treatmentPayableListMap[id],
        'invoicePayableList'
      );
      invoiceList = [...invoiceList, ...lodash.compact(treatmentOfinvoiceList)];
    });
    lodash.each(invoiceList, (id) => {
      const invoiceOfserviceList = lodash.get(
        newClaimEntities.invoicePayableListMap[id],
        'serviceItemPayableList'
      );
      serviceList = [...serviceList, ...lodash.compact(invoiceOfserviceList)];
    });
    lodash.each(invoiceList, (id) => {
      delete newClaimEntities.invoicePayableListMap[id];
    });
    lodash.each(treatmentList, (id) => {
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
      delete newClaimEntities.invoicePayableListMap[id];
    });
    editPayableItem.invoicePayableList = [];
  }
  lodash.each(lodash.compact(serviceList), (id) => {
    delete newClaimEntities.servicePayableListMap[id];
  });
};
