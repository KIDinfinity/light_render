enum SectionID {
  // datacapture
  Incident = 'Incident',
  Diagnosis = 'Diagnosis',
  Treatment = 'Treatment',
  Procedure = 'Procedure',
  Invoice = 'Invoice',
  Service = 'Service',

  // manual assessment
  IncidentPayable = 'IncidentPayable',
  Beneficiary = 'Beneficiary',
  Payee = 'Payee',
  InvoicePayable = 'InvoicePayable',
  TreatmentPayable = 'TreatmentPayable',
  ServicePayable = 'ServicePayable',
  BankAccount = 'BankAccount',
}
export default SectionID;
