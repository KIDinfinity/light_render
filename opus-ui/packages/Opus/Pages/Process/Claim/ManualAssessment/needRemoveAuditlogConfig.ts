
const needRemoveItemList = [
  {
    label: 'Add Plan Information',
    path: 'planInfoData.bankInfoList',
  },
  {
    path: 'claimPayableList.treatmentPayableList.process',
    type: 'Remove',
  },
  {
    path: 'claimPayableList.treatmentPayableList.process',
    type: 'Add',
  },
  {
    path: 'claimPayableList.treatmentPayableList',
    type: 'Remove',
  },
  {
    path: 'claimPayableList.treatmentPayableList.otherProcedurePayableList',
    type: 'Remove',
  },
  {
    path: 'claimPayableList.treatmentPayableList.otherProcedurePayableList',
    type: 'Add',
  },
  {
    path: 'claimPayableList.treatmentPayableList',
    type: 'Add',
  },
  {
    path: 'relationshipWithInsured.treatmentPayableList',
    type: 'Add',
  },
  {
    fieldName: 'relationshipWithInsured',
    path: 'payeeList',
    type: 'Update',
  },
  {
    fieldName: 'payableAmount',
    path: 'claimPayableList',
    type: 'Update',
  },
  {
    path: 'policyBenefitList',
    type: 'Remove',
  },
  {
    includePath: 'c360BeneficiaryInfo'
  }
];
export default needRemoveItemList;
