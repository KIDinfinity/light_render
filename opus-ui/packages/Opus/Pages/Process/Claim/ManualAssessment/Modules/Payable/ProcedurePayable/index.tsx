import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from '../../..//activity.config';


import Item from './Item';

import styles from './index.less';

const Main = ({ procedureId }: any) => {
  const procedurePayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.procedurePayableListMap
  );

  const list = useMemo(() => {
    return lodash.chain(procedurePayableListMap).filter({ procedureId }).value() || [];
  }, [procedureId, procedurePayableListMap]);

  return (
    <div className={styles.treatmentPayableWrap}>
      {lodash.map(list, (item: any) => (
        <Item key={item?.id} item={item} />
      ))}
    </div>
  )
};

export default Main;
