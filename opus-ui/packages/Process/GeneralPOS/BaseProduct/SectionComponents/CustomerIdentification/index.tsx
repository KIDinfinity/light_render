import classNames from 'classnames';
import React from 'react';
import CustomerInfo from './CustomerInfo';
import CustomerList from './CustomerList';
import styles from './index.less';
import type { ICustomerIdentificationProps } from './types';

const CustomerIdentification = (props: ICustomerIdentificationProps) => {
  const {
    className,
    identifyResultTag,
    customerInfo,
    selectedId,
    identificationList,
    handleSelected,
    identifyResultTagShow,
  } = props;

  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.customerInfo}>
        <CustomerInfo
          customer={customerInfo}
          identifyResultTag={identifyResultTag}
          identifyResultTagShow={identifyResultTagShow}
        />
      </div>
      <div className={styles.customerList}>
        <CustomerList
          clientList={identificationList}
          identifyResultTag={identifyResultTag}
          selectedClientId={selectedId}
          handleSelected={handleSelected}
        />
      </div>
    </div>
  );
};

export default CustomerIdentification;
