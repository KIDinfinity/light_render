import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const doop = {
  [eBenefitCategory.Reimbursement]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'invoicePayableList' },
    { mapKey: 'invoicePayableListMap', listKey: 'serviceItemPayableList' },
    { mapKey: 'serviceItemPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Cashless]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Aipa]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'accidentBenefitPayableList' },
    { mapKey: 'accidentBenefitPayableListMap', listKey: '' },
  ],
  [eBenefitCategory.S]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'procedurePayableList' },
    { mapKey: 'procedurePayableListMap', listKey: '' },
  ],
  [eBenefitCategory.Crisis]: [
    { mapKey: 'claimPayableListMap', listKey: 'treatmentPayableList' },
    { mapKey: 'treatmentPayableListMap', listKey: 'otherProcedurePayableList' },
    { mapKey: 'otherProcedurePayableListMap', listKey: '' },
  ],
  default: [
    {
      mapKey: 'claimPayableListMap',
      listKey: '',
    },
  ],
};

export default doop;