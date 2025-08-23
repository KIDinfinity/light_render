import { useCallback } from 'react';
import BreakDown from 'basic/enum/Breakdown';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import ExtProductType from 'basic/enum/ExtProductType';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CustomerRole from 'enum/CustomerRole';
import useGetFlatProductConfig from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetFlatProductConfig';

export default () => {
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.clientMap,
    shallowEqual
  );
  const planProductConfig = useGetFlatProductConfig();

  const isMHITSelectNo = lodash.some(clientMap, (item) => {
    return (
      lodash.includes(item?.personalInfo?.customerRole, CustomerRole.PolicyOwner) &&
      item?.otherInfo?.isInterestMhit === BreakDown.NO
    );
  });

  const filterProductTypeList = lodash
    .chain(planProductConfig)
    .filter((item: any) => item?.extProductType === ExtProductType.PC_optional_product)
    .map('productCode')
    .value();

  return useCallback(
    (coreCode: string) => {
      return isMHITSelectNo ? !lodash.includes(filterProductTypeList, coreCode) : true;
    },
    [filterProductTypeList, isMHITSelectNo]
  );
};
