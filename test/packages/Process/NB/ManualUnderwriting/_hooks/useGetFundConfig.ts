import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import transFieldsConfig from 'basic/utils/transFieldsConfig';

import { NAMESPACE } from '../activity.config';

export default ({ totalFundInfoList, config, status = 'title' }: any) => {
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.businessData?.policyList?.[0]?.coverageList,
    shallowEqual
  );
  const AllocationVisibleByCondition = {
    fundAllocation: () => {
      return lodash.some(coverageList, (item) => item.isMain === 'Y');
    },
    tpaAllocation: () => {
      return lodash.some(totalFundInfoList,  (item) =>  !lodash.isNil(item.tpaAllocation));
    },
    tpaRcdAllocation: () => {
      return lodash.some(totalFundInfoList, (item) => item.fundCode === 'VI07');
    },
    epaAllocation: () => lodash.some(coverageList, (item) => item.productType === 'RT'),
    adHocTopUpAllocation: () => lodash.some(coverageList, (item) => item.productType === 'AT'),
    fundCode: () => status === 'title',
    fundCurrency: () => status === 'title',
  };
  const list = transFieldsConfig({ config });

  return lodash
    .chain(list)
    .filter((item) => {
      if (
        status === 'title' &&
        lodash.has(AllocationVisibleByCondition, item?.field) &&
        item.visible === 'C'
      ) {
        return AllocationVisibleByCondition?.[item?.field]();
      }
      if (status === 'total' && lodash.has(AllocationVisibleByCondition, item?.field)) {
        return AllocationVisibleByCondition?.[item?.field]();
      }
      return true;
    })
    .orderBy('order')
    .value();
};
