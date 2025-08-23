import React from 'react';
import lodash from 'lodash';
import useGetEwsVersions from 'process/NewBusiness/EWS/_hooks/useGetEwsVersions';
import Item from './Item';
import styles from './index.less';

const Versions = () => {
  const versions = useGetEwsVersions();
  return (
    <div className={styles.versions}>
      {lodash.map(versions, (versionInfo: any) => {
        return <Item versionInfo={versionInfo} key={versionInfo.version} />;
      })}
    </div>
  );
};

Versions.displayName = 'versions';

export default Versions;
