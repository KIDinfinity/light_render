import { SplitDocumentType } from '../dto';

export const defState = {
  isNewClaimNo: false,

  [SplitDocumentType.NewDocument]: {},
  [SplitDocumentType.OriginalDocument]: {},

  caseRemark: {
    originalRemark: '',
    newRemark: '',
  },
};

export default { ...defState };
