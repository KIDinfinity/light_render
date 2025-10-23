import lodash from 'lodash';

export default (caseData: any) => {
  const flagsArr = lodash.split(caseData.flags, ',');
  flagsArr.push('no_reassessment');
  lodash.set(caseData, 'flags', lodash.compact(flagsArr).join(','));

  return caseData;
};
