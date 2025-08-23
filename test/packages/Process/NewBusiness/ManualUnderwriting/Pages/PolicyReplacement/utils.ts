import lodash from 'lodash';

export const filterShowReplacementInfo = (rowData: any) => {
  const notLast = !rowData?.isLast;
  const keys = [
    'replacedPolicyId',
    'planName',
    'policyType',
    'sumAssured',
    'insurerName',
    'insuranceCompanyName',
    'reasonForPolicyReplacement',
  ];
  const notAllEmpty = lodash
    .chain(rowData)
    .pick(keys)
    .values()
    .some((value) => !!value)
    .value();

  return notLast && notAllEmpty;
};
