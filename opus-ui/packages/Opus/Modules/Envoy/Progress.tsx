import React, { useState, useMemo } from 'react';
import { Icon } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

import { EReasonStatus } from 'bpm/pages/Envoy/enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import ProgressItem from './ProgressItem';
import ProgressItemJP from './ProgressItemJP';
import EmptyData from 'opus/Components/EmptyData/Default';

import { ReactComponent as ProgressSvg } from './Assets/inProgress.svg';
import styles from './indexProcess.less';

export default () => {
  const [expand, setExpand] = useState(true);

  const currentReasonGroups =
    useSelector(({ envoyController }: any) => envoyController.currentReasonGroups) || [];

  const list = useMemo(() => {
    return currentReasonGroups.filter(({ status }: any) => status !== EReasonStatus.DRAFT) || [];
  }, [currentReasonGroups]);

  return (
    <div className={styles.envoyListProcess}>
      <div className={styles.envoyListTitle}>
        <div className={styles.iconTitle}>
          <Icon component={ProgressSvg} />
        </div>
        <span className={styles.title}>
          {formatMessageApi({ Label_BPM_CaseInfo: 'inProgress' })}
        </span>

        <div className={styles.gap} />
        <div className={styles.iconWrap}>
          <Icon type={!expand ? 'up' : 'down'} onClick={() => setExpand(!expand)} />
        </div>
      </div>
      <div className={styles.envoyListContent}>
        {!!expand ? (
          <>
            {' '}
            {lodash.isEmpty(list) ? (
              <EmptyData />
            ) : (
              <div className={styles.list}>
                {list.map((item: any, index: number) => (
                  <>
                    {tenant.isJP() ? (
                      <ProgressItemJP item={item} key={item?.id} index={index} />
                    ) : (
                      <ProgressItem item={item} key={item?.id} index={index} />
                    )}
                  </>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
