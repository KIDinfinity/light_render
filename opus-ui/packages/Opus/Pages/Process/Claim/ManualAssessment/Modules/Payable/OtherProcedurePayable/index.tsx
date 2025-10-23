import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from '../../..//activity.config';


import Item from './Item';

import styles from './index.less';

const Main = ({ otherProcedureId }: any) => {
  const otherProcedurePayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.otherProcedurePayableListMap
  );

  const list = useMemo(() => {
    return lodash.chain(otherProcedurePayableListMap).filter({ otherProcedureId }).value() || [];
  }, [otherProcedureId, otherProcedurePayableListMap]);

  return (
    <div className={styles.treatmentPayableWrap}>
      {lodash.map(list, (item: any) => (
        <Item key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default Main;
