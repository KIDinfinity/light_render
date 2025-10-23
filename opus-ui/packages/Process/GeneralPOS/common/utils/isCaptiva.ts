import { isDataCapture } from './index';

export default ({ submissionChannel, caseCategory }) => {
  return submissionChannel !== 'M' && isDataCapture({ caseCategory });
};
