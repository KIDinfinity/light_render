export enum processRelationship {
  SameIncident = 'Same Incident',
  DuplicateCase = 'Duplicate Case',
  TriggerCase = 'Trigger Case',
  Subcase = 'Subcase',
  AccumulationRelatedClaim = 'accumulation related claim',
  SplitCaseNewCase = 'Split Case - New Case',
  SplitCaseFromNewCase = 'Split Case - From The Same Case',
  SplitCaseOriginalCase = 'Split Case - Original Case',
  SameBatch = 'Same Batch',
  SameClaim = 'Same Claim',
  SplitCase = 'Split Case',
}

export default processRelationship;
