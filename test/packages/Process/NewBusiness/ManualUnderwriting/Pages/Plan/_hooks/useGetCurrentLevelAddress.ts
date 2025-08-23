import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import { AddressRegionMapping } from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_utils';

export default ({ addressLevel }: any) => {
  const parentCodeAddress =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.parentCodeAddress) || {};

  const defaultPlanInfoData =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.planInfoData
    ) || {};

  const planInfoData =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalData?.processData?.planInfoData
    ) || {};

  const item = lodash.isEmpty(planInfoData) ? defaultPlanInfoData : planInfoData;

  const key = lodash.findKey(AddressRegionMapping(), (e) => e === addressLevel) || '';

  const policyAddressKeyMapping = {
    country: 'PolicyAddress7',
    province: 'PolicyAddress6',
    city: 'PolicyAddress5',
    district: 'PolicyAddress4',
    commune: 'PolicyAddress3',
    village: 'PolicyAddress2',
    street: 'PolicyAddress1',
  };

  const parentAddressCode = formUtils.queryValue(item[policyAddressKeyMapping[key]]) || '';

  // TODO:这里是不是监听太多了?
  return useMemo(() => {
    return lodash.chain(parentCodeAddress).get(addressLevel).get(parentAddressCode, []).value();
  }, [addressLevel, parentCodeAddress, parentAddressCode]);
};
