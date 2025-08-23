import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CustomerTypeEnum from 'process/NB/ManualUnderwriting/Enum/CustomerTypeEnum';
import useGetContextRoles from 'process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextRoles';
import useGetAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetAddressInfoList';
import useGetClientDetailById from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailById';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

export default ({ config, addressInfoId, id }: any) => {
  const addrTypeDicts = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.addrTypeDicts,
    shallowEqual
  );

  const fullDicts =
    config && config['field-props']
      ? getDrowDownList({ config: config['field-props'] })
      : getDrowDownList({ config });

  const roles = useGetContextRoles();
  const currentAddressList = useGetAddressInfoList({ id });
  const currentClientInfo = useGetClientDetailById({ clientId: id });
  const customerType = useGetCustomerType(currentClientInfo);

  return useMemo(() => {
    const existingAddressType = lodash
      .chain(currentAddressList)
      .filter((item) => item.id !== addressInfoId)
      .map((item) => formUtils.queryValue(item?.addrType))
      .value();
    return lodash
      .chain(addrTypeDicts)
      .filter(
        (dict) =>
          lodash.includes(roles, dict?.customerRole) &&
          !lodash.includes(existingAddressType, dict?.specifyInfoType) &&
          (lodash.includes([CustomerTypeEnum.Company, CustomerTypeEnum.Personal], customerType)
            ? customerType === dict?.customerType
            : true)
      )
      .unionBy((dict) => dict?.specifyInfoType)
      .map((dict) => {
        return {
          dictCode: dict?.specifyInfoType,
          dictName:
            lodash
              .chain(fullDicts)
              .find((item) => item.dictCode === dict?.specifyInfoType)
              .get('dictName')
              .value() || dict?.specifyInfoType,
        };
      })
      .value();
  }, [fullDicts, roles, addrTypeDicts, currentAddressList, addressInfoId, customerType]);
};
