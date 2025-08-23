import lodash from 'lodash';

export default (editPayableItem: any, newClaimEntities: any) => {
  const treatmentList = lodash.get(editPayableItem, 'treatmentPayableList');
  const temp = newClaimEntities;
  const invoiceList = lodash.chain(treatmentList)
  .map(id => temp?.treatmentPayableListMap?.[id]?.invoicePayableList)
  .flatten()
  .value()
  const serviceList = lodash.chain(invoiceList)
  .map(id => temp?.invoicePayableListMap?.[id]?.serviceItemPayableList)
  .flatten()
  .value()
  temp.treatmentPayableListMap = lodash.omit(newClaimEntities.treatmentPayableListMap, treatmentList);
  temp.invoicePayableListMap = lodash.omit(newClaimEntities.invoicePayableListMap, invoiceList);
  temp.serviceItemPayableListMap = lodash.omit(newClaimEntities.serviceItemPayableListMap,serviceList)
  const edtiTemp = editPayableItem;
  edtiTemp.treatmentPayableList = [];
};
