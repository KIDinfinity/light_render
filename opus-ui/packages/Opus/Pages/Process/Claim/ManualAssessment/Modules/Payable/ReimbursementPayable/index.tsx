import React from 'react';
import { useSelector } from 'dva';

import lodash from 'lodash';

import { NAMESPACE } from '../../..//activity.config';

import Item from './Item';

import styles from './index.less';

const Main = ({ index, serviceItemId, payableLength }: any) => {
  const claimPayableListMap =
    useSelector(
      ({ [NAMESPACE]: modelNamespace }: any) =>
        modelNamespace?.claimEntities?.serviceItemPayableListMap
    ) || {};
  const list = lodash
    .chain(claimPayableListMap)
    .filter((item) => item.serviceItemId === serviceItemId)
    .value();

  return (
    <div className={styles.treatmentPayableWrap}>
      <div className={styles.listWrap}>
        {lodash.map(list, (item: any) => (
          <Item key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Main;
