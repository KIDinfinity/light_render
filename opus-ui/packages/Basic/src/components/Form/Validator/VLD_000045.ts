import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export const VLD_000045 = (policyList = []) => {
  const list = lodash.map(lodash.compact(policyList), (item: any) => ({
    ...item,
    policyNo: formUtils.queryValue(item.policyNo),
  }));
  const duplicateCount = lodash.map(lodash.uniqBy(list, 'policyNo'), (item) => ({
    id: item.id,
    count: 0,
    policyNo: item.policyNo,
  }));
  list.forEach((item) => {
    const index = duplicateCount.findIndex((dupItem) => item.policyNo === dupItem.policyNo);
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
