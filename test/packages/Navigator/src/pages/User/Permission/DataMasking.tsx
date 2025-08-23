import React from 'react';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import RightForm from '../_components/RightForm';
import DataMaskingOfMaskingBlock from './DataMaskingOfMaskingBlock';
import styles from './Permission.less';

export default () => {
  const { permissionDataMasking } = useSelector(
    (state) => ({
      permissionDataMasking: state.userManagement?.permissionDataMasking,
    }),
    shallowEqual
  );

  return (
    <div className={styles.wrap}>
      <RightForm formTitle="shield">
        <div className={styles.dataMasking}>
          {lodash.map(permissionDataMasking, (item) => (
            <DataMaskingOfMaskingBlock item={item} key={item.id} />
          ))}
        </div>
      </RightForm>
    </div>
  );
};
