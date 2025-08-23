import React from 'react';
import lodash from 'lodash';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const product = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addingLoadingSelectedProduct,
    shallowEqual
  );
  return (
    <div className={styles.container}>
      <div>{slots.get('productSelect')}</div>
      <div style={{ display: lodash.isEmpty(product?.productName) ? 'none' : '' }}>
        {slots.get('loadingItems')}
      </div>
      <div style={{ display: lodash.isEmpty(product?.productName) ? 'none' : '' }}>
        {slots.get('addButton')}
      </div>
    </div>
  );
};
