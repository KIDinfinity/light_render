import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import { useDispatch } from 'dva';
import React from 'react';
import CustomerInfo from '../CustomerIdentification/CustomerInfo';
import type { ICustomer } from '../CustomerIdentification/types';
import CloseButton from './CloseButton';
import styles from './index.less';

interface IProps {
  children: any;
  handleClose: Function;
  customerInfo: ICustomer;
  transactionId: string;
  identifyResultTag?: string;
  identifyResultTagShow?: boolean;
  disabled?: boolean;
}

const ClientInfoIdentificationItem = ({
  children,
  handleClose,
  customerInfo,
  disabled,
  ...res
}: IProps) => {
  const slots = useRegisteredSlots({ children });
  const dispatch = useDispatch();

  return (
    <div className={styles.itemContainer}>
      <div className={styles.customerInfo}>
        <CustomerInfo customer={customerInfo} {...res} />
        <div>{slots.get('customerExtra')}</div>
      </div>
      <div className={styles.splitLine} />
      <div className={styles.content}>
        {slots.get('content')}
        {!disabled && <CloseButton className={styles.removeIcon} handleClose={handleClose} />}
      </div>
    </div>
  );
};

export default ClientInfoIdentificationItem;
