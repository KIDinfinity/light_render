import lodash from 'lodash';

export default ({ caseCategory }) => {
  return lodash.includes(['BP_PAPER_CTG001', 'BP_PAPER_CTG004'], caseCategory);
};
