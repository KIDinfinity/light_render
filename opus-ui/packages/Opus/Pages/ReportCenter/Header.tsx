import React, { useMemo } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Icon } from 'opus/Components/Antd';
import Buttons from 'opus/Components/Buttons';
import Export from './Export';
import { ReactComponent as dashboard } from 'packages/Opus/Assets/icon-dashboard.svg';
import lodash from 'lodash';
import styles from './index.less';
import { useSelector } from 'dva';

const Main = ({ handleCustomise, handleFilter }: any) => {
  const reportListMap = useSelector(
    ({ reportCenterController }: any) => reportCenterController?.tableReport
  );

  const activeTabKey =
    useSelector(({ reportCenterController }: any) => reportCenterController?.activeTabKey) || '';

  const reportListExist = useMemo(() => {
    const targetList = reportListMap?.[activeTabKey];
    return targetList && !lodash.isEmpty(targetList?.rows);
  }, [reportListMap, activeTabKey]);

  return (
    <div className={styles.topContent}>
      <div className={styles.titleWrap}>
        <Icon component={dashboard} className={styles.icon} />
        <span className={styles.title}>{formatMessageApi({ Label_COM_Opus: 'Reports' })}</span>
      </div>

      <div className={styles.buttonWrap}>
        <Buttons.Filter
          handleClick={() => {
            handleFilter();
          }}
        />
        <Buttons.Customise
          handleClick={() => {
            handleCustomise();
          }}
        />
        {reportListExist && <Export />}
      </div>
    </div>
  );
};

export default Main;
