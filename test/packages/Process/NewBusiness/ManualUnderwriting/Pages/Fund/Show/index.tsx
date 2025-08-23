import React from 'react';

import FundBaseInfo from './FundBaseInfo';
import FundTable from './FundTable';
import styles from './index.less';

interface IFundShowProps {
  fundInfo: any;
  fundList: any[];
}

export default ({ fundInfo, fundList }: IFundShowProps) => {
  return (
    <>
      <FundBaseInfo fundInfo={fundInfo} />
      <div className={styles.content}>
        <FundTable fundList={fundList} />
      </div>
    </>
  );
};
