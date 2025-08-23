import { isDataCapture } from './index';

export default ({ submissionChannel, caseCategory }) => {
  return submissionChannel === 'OMNE' && isDataCapture({ caseCategory });
};
