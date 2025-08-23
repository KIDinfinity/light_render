import React from 'react';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash, { isArray, compact } from 'lodash';
import RightForm from '../_components/RightForm';
import TransactionLimitItem from './TransactionLimitItem';
import styles from './TransactionLimit.less';

export default () => {
  const { permissionTransactionLimit } = useSelector(
    (state) => ({
      permissionTransactionLimit: state.userManagement.permissionTransactionLimit,
    }),
    shallowEqual
  );

  return (
    <div className={styles.wrap}>
      <RightForm formTitle="transaction">
        <div className={styles.transactionLimit}>
          {isArray(permissionTransactionLimit) &&
            lodash.map(compact(permissionTransactionLimit), (item) => (
              <TransactionLimitItem item={item} key={item.id} />
            ))}
        </div>
      </RightForm>
    </div>
  );
};
