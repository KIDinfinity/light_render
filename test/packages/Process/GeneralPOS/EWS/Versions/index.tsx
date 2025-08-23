import React from 'react';
import lodash from 'lodash';
import Item from './Item';
import styles from './index.less';
import { NAMESPACE } from '../../BaseProduct/activity.config';
import { useSelector } from 'dva';

const Versions = () => {
  const dataList = useSelector((state: any) => lodash.get(state, `${NAMESPACE}.ewsData`, []));

  const versions = lodash
    .chain(dataList)
    .map((item) => {
      return lodash.pick(item, ['version', 'submitDate']);
    })
    .value();

  return (
    <div className={styles.versions}>
      {lodash.map(versions, (versionInfo: any, index) => {
        return <Item versionInfo={versionInfo} key={versionInfo.version} index={index} />;
      })}
    </div>
  );
};

Versions.displayName = 'versions';

export default Versions;
