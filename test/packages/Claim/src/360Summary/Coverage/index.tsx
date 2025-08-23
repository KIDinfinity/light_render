import React from 'react';
// import { Row, Col } from 'antd';
import lodash from 'lodash';
import useGetTsarDataGroupByRole from 'claim/360Summary/Coverage/_hooks/useGetTsarDataGroupByRole';
import Header from './Header';
import CoverageItem from './CoverageItem';
import styles from './index.less';

const Coverage = ({ clientId }: any) => {
  const list = useGetTsarDataGroupByRole({
    clientId,
  });
  return (
    <div className={styles.coverage}>
      <Header />
      {lodash.map(list, (roleDataItem: any) => {
        return <CoverageItem roleDataItem={roleDataItem} key={roleDataItem?.role} />;
      })}
    </div>
  );
};

export default Coverage;
