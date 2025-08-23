import lodash from 'lodash';

// 验证事故受付confirmed证券番号是否存在请求书中
export const VLD_000038 = (policyNoList: any, existPolicyNoList: any) => {
  const noIncludeList: any = [];
  const allPolicyNo = lodash.map(policyNoList, (item) => item.policyNo);
  if (lodash.isArray(policyNoList) && lodash.isArray(existPolicyNoList)) {
    let selectedPolicyNo: any = [];
    lodash.map(existPolicyNoList, (item) => {
      if (lodash.isArray(item.policyNoArray)) {
        selectedPolicyNo = [...selectedPolicyNo, ...item.policyNoArray];
      }
    });
    lodash.map(allPolicyNo, (item) => {
      if (!selectedPolicyNo.includes(item)) {
        noIncludeList.push(item);
      }
    });
  }

  return noIncludeList;
};
