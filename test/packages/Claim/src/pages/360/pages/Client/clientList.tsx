import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import ClientItem from './clientItem';
import styles from './clientList.less';

export default () => {
  const [list, setList] = useState<any>([]);
  const activeClientId = useSelector(({ insured360 }: any) => insured360?.activeClientId);
  const sideBarOverallList = useSelector(({ insured360 }: any) => insured360?.sideBarOverallList);

  useEffect(() => {
    setList(
      lodash
        .chain(sideBarOverallList)
        .filter((el: any) => !!el.clientInfo)
        .value()
    );
  }, [sideBarOverallList, activeClientId]);

  return (
    <div className={styles.clientList}>
      {lodash.map(list, (item: any) => (
        <ClientItem item={item} key={item?.keyClientId} activeClientId={activeClientId} />
      ))}
    </div>
  );
};
