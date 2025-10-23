import React from 'react';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import styles from './index.less';
import useGetCustomerType from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCustomerType';

const CustomerType = ({ clientId, readOnly = true }: any) => {
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );

  const modalCustomerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );
  const customerTypeWithDefault = useGetCustomerType({
    customerType: readOnly ? customerType : modalCustomerType,
  });

  return (
    <div className={styles.customerType}>
      {formatMessageApi({
        Dropdown_CLM_CustomerType: customerTypeWithDefault,
      })}
    </div>
  );
};

CustomerType.displayName = 'customerType';

export default CustomerType;
