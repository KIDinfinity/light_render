enum OptionType {
  client = 'muw.submit.section.client',
  plan = 'muw.submit.section.plan',
  payment = 'muw.submit.section.payment',
  takeover = 'muw.submit.section.takeover',
  coverage = 'muw.submit.section.coverage',
  other = 'muw.submit.section.other',
  fund = 'muw.submit.section.fund',

  updateClient = 'updateClient',
  duplicateConfirm = 'checkDuplicateConfirm',
  confirm = 'confirm',
  retry = 'case.auto.underwriting.retry',
  recalculateUw = 'manual.underwrite.recalculate',
  recalculatePp = 'proposal.change.recalculate',
  getUWMEResult = 'getUWMEResult',
  checkAMLOrCRR = 'case.check.aml.crr',
}

export default OptionType;
