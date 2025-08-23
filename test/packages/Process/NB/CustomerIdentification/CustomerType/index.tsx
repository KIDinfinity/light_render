import React from 'react';
import classnames from 'classnames';
import { CustomerType } from 'process/NB/CustomerIdentification/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default ({ customerType }) => {
  return (
    <>
      <div className={classnames(styles.customerType)}>
        <span
          className={classnames(styles.value, {
            [styles.companyValue]: customerType === CustomerType.Company,
            [styles.personalValue]: customerType === CustomerType.Personal,
          })}
        >
          {formatMessageApi({
            Dropdown_CLM_CustomerType: customerType,
          })}
        </span>
      </div>
    </>
  );
};
