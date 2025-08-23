import lodash from 'lodash';

// Require at least one treatment record when claim type is not death
export const VLD_000054 = (claimTypeArray: any, treatmentList: any) =>
  !claimTypeArray?.includes?.('DTH') && lodash.isEmpty(treatmentList);
