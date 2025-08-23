import { isArray, every } from 'lodash';
import type { IClaimPayable } from '@/dtos/claim/ClaimPayableModel';

export default (claimData: any = {}) => {
  const { claimPayableList, claimDecision = {} } = claimData;
  if (isArray(claimPayableList)) {
    if (every(claimPayableList, (payable: IClaimPayable) => payable.claimDecision === 'D')) {
      claimDecision.assessmentDecision = 'D';
    } else {
      claimDecision.assessmentDecision = 'A';
    }
  }

  claimData.claimDecision = claimDecision;

  return claimData;
};
