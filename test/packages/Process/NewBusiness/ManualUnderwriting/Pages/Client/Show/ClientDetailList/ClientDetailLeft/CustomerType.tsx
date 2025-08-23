import React from 'react';
import { useSelector } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import styles from './index.less';
import useGetCustomerType from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCustomerType';

const CustomerType = ({ clientId }: any) => {
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );
  const customerTypeWithDefault = useGetCustomerType({ customerType });

  return (
    <div className={styles.customerType}>
      <span className={styles.value}>
        {formatMessageApi({
          Dropdown_CLM_CustomerType: customerTypeWithDefault,
        })}
      </span>
    </div>
  );
};

CustomerType.displayName = 'customerType';

export default CustomerType;
