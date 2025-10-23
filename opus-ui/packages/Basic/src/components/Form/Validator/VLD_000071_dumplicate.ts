import lodash from 'lodash';

export const VLD_000071 = (policyList = []) => {
  const duplicateCount = lodash.map(lodash.uniqBy(policyList, 'policyNo'), (item) => ({
    count: 0,
    policyNo: item,
  }));
  policyList.forEach((item) => {
    const index = duplicateCount.findIndex((dupItem) => item === dupItem.policyNo);
    if (index !== -1) {
      duplicateCount[index].count += 1;
    }
  });
  const duplicateNos = lodash.map(
    duplicateCount.filter((item) => item.count > 1),
    (item) => item.policyNo
  );
  return duplicateNos;
};
