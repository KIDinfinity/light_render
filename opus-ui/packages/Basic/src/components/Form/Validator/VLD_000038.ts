import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export const VLD_000038 = ({ policyList, applicationList, submited }: any) => {
  if (!submited) {
    return [];
  }
  const noIncludeList: any = [];

  if (lodash.isArray(policyList) && lodash.isArray(applicationList)) {
    const policyNoList = lodash
      .chain(policyList)
      .filter((item) => {
        const value = formUtils.queryValue(item.confirmed);
        return !!value;
      })
      .map((item) => formUtils.queryValue(item.policyNo))
      .value();
    let applicationPolicyNoList: any = [];
    applicationList.forEach((item) => {
      const array = formUtils.queryValue(item.policyNoArray);
      if (lodash.isArray(array)) {
        const policyNos = lodash.map(array, (p) => {
          const value = formUtils.queryValue(p);
          return value;
        });
        applicationPolicyNoList = [...applicationPolicyNoList, ...policyNos];
      }
    });
    policyNoList.forEach((item) => {
      if (!applicationPolicyNoList.includes(item)) {
        noIncludeList.push(item);
      }
    });
  }
  return noIncludeList;
};
