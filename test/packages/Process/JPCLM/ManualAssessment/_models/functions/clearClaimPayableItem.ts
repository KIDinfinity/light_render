import lodash from 'lodash';

export default (editPayableItem: any, newClaimEntities: any) => {
  const treatmentList = lodash.get(editPayableItem, 'treatmentPayableList');
  const temp = newClaimEntities;
  const invoiceList = lodash
    .chain(treatmentList)
    .map((id) => temp?.treatmentPayableListMap?.[id]?.invoicePayableList)
    .flatten()
    .value();
  const serviceList = lodash
    .chain(invoiceList)
    .map((id) => temp?.invoicePayableListMap?.[id]?.serviceItemPayableList)
    .flatten()
    .value();
  const procedureList = lodash
    .chain(treatmentList)
    .map((id) => temp?.treatmentPayableListMap?.[id]?.procedurePayableList)
    .flatten()
    .value();
  const otherProcedureList = lodash
    .chain(treatmentList)
    .map((id) => temp?.treatmentPayableListMap?.[id]?.otherProcedurePayableList)
    .flatten()
    .value();
  const opTreatmentPayableList = lodash
    .chain(treatmentList)
    .map((id) => temp?.treatmentPayableListMap?.[id]?.opTreatmentPayableList)
    .flatten()
    .value();
  const claimIncidentPayableList = lodash.get(editPayableItem, 'claimIncidentPayableList');

  temp.treatmentPayableListMap = lodash.omit(
    newClaimEntities.treatmentPayableListMap,
    treatmentList
  );
  temp.invoicePayableListMap = lodash.omit(newClaimEntities.invoicePayableListMap, invoiceList);
  temp.serviceItemPayableListMap = lodash.omit(
    newClaimEntities.serviceItemPayableListMap,
    serviceList
  );
  temp.procedurePayableListMap = lodash.omit(
    newClaimEntities.procedurePayableListMap,
    procedureList
  );
  temp.otherProcedureListMap = lodash.omit(
    newClaimEntities.otherProcedureListMap,
    otherProcedureList
  );
  temp.opTreatmentPayableListMap = lodash.omit(
    newClaimEntities.opTreatmentPayableListMap,
    opTreatmentPayableList
  );
  temp.claimIncidentPayableListMap = lodash.omit(
    newClaimEntities.claimIncidentPayableListMap,
    claimIncidentPayableList
  )
  const edtiTemp = editPayableItem;
  edtiTemp.treatmentPayableList = [];
};
