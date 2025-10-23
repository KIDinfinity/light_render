import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CustomerTypeEnum from 'process/NB/ManualUnderwriting/Enum/CustomerTypeEnum';
import classnames from 'classnames';
import styles from './index.less';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

const CustomerType = ({ item }: any) => {
  const customerType = useGetCustomerType(item);
  return (
    <div
      className={classnames(styles.customerType, {
        [styles.companyType]: customerType === CustomerTypeEnum.Company,
        [styles.personalType]: customerType === CustomerTypeEnum.Personal,
      })}
    >
      <span
        className={classnames(styles.value, {
          [styles.companyValue]: customerType === CustomerTypeEnum.Company,
          [styles.personalValue]: customerType === CustomerTypeEnum.Personal,
        })}
      >
        {formatMessageApi({
          Dropdown_CLM_CustomerType: customerType,
        })}
      </span>
    </div>
  );
};

CustomerType.displayName = 'customerType';

export default CustomerType;
