enum RelationOfProposer {
  Employee = 'EEE',
  EmployeeKeyman = 'EEEK',
  BusinessPartner = 'BP',
}

enum PurposeOfInsurance {
  FringeBenefit = 'FB',
  KeymanInsurance = 'KI',
  PartnershipInsuranceOrBuySellAgreements = 'PI',
}

enum RelationOfInsured {
  EmployeeKeyman = 'EEEK',
  BusinessPartner = 'BP',
}

const RelationOfProposerMap = {
  EEE: {
    purposeOfInsurance: 'FringeBenefit',
    relationOfInsured: '',
  },
  EEEK: {
    purposeOfInsurance: 'KeymanInsurance',
    relationOfInsured: 'EmployeeKeyman',
  },
  BP: {
    purposeOfInsurance: 'PartnershipInsuranceOrBuySellAgreements',
    relationOfInsured: 'BusinessPartner',
  },
};
export { RelationOfProposer, PurposeOfInsurance, RelationOfInsured, RelationOfProposerMap };
