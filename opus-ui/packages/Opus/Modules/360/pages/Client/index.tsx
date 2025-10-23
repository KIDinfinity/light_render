import React from 'react';
import { useSelector } from 'dva';
import FullClientInfo from './fullClientInfo';
import styles from './index.less';

export default () => {
  const sideBarOverallList =
    useSelector(({ insured360 }: any) => insured360?.sideBarOverallList) || [];
  const filteredList = sideBarOverallList.filter((el) => !!el.clientInfo);

  return (
    <div className={styles.clientContainer}>
      {filteredList.map((client) => (
        <FullClientInfo client={client} key={client.keyClientId} isOnlyClient={filteredList?.length === 1}/>
      ))}
    </div>
  );
};
