import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import CustomerTypeEnum from 'process/NB/ManualUnderwriting/Enum/CustomerTypeEnum';
import useGetContextRoles from 'process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextRoles';
import useGetAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetAddressInfoList';
import useGetClientDetailById from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailById';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

export default ({ id }: any) => {
  const addrTypeDicts = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.addrTypeDicts,
    shallowEqual
  );
  const roles = useGetContextRoles();
  const currentAddressList = useGetAddressInfoList({ id });
  const currentClientInfo = useGetClientDetailById({ clientId: id });
  const customerType = useGetCustomerType(currentClientInfo);

  return useMemo(() => {
    const allDicts = lodash
      .chain(addrTypeDicts)
      .filter(
        (dict) =>
          lodash.includes(roles, dict?.customerRole) &&
          (lodash.includes([CustomerTypeEnum.Company, CustomerTypeEnum.Personal], customerType)
            ? customerType === dict?.customerType
            : true)
      )
      .map('specifyInfoType')
      .union()
      .value();

    return lodash
      .chain(currentAddressList)
      .filter((item) => {
        const addrType = formUtils.queryValue(item.addrType);

        return !(
          !lodash.isEmpty(allDicts) &&
          !lodash.isEmpty(addrType) &&
          !lodash.includes(allDicts, addrType)
        );
      })
      .value();
  }, [addrTypeDicts, currentAddressList, roles, customerType]);
};
