import React, { useState, useMemo } from 'react';
import { Icon } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

import { EReasonStatus } from 'bpm/pages/Envoy/enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import HistoryItem from './HistoryItem';
import HistoryItemJP from './HistoryItemJP';
import { ReactComponent as HistorySvg } from './Assets/history.svg';
import EmptyData from 'opus/Components/EmptyData/Default';
import styles from './index.less';
import getIsCopyLeadPendingMemoListBlank from 'opus/NewBusiness/ManualUnderwriting/_utils/getIsCopyLeadPendingMemoListBlank';

export default () => {
  const [expand, setExpand] = useState(true);

  const currentReasonGroups =
    useSelector(({ envoyController }: any) => envoyController.historyReasonGroups) || [];

  const list = useMemo(() => {
    return currentReasonGroups.filter(({ status }: any) => status !== EReasonStatus.DRAFT) || [];
  }, [currentReasonGroups]);

  return (
    <div className={styles.envoyListHistory}>
      <div className={styles.envoyListTitle}>
        <div className={styles.iconTitle}>
          <Icon component={HistorySvg} />
        </div>
        <span className={styles.title}>
          {formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.remark.title.history' })}
        </span>

        <div className={styles.gap} />
        <div className={styles.iconWrap}>
          <Icon type={!expand ? 'up' : 'down'} onClick={() => setExpand(!expand)} />
        </div>
      </div>
      <div className={styles.envoyListContent}>
        {!!expand ? (
          <>
            {lodash.isEmpty(list) ? (
              <EmptyData />
            ) : (
              <div className={styles.list}>
                {list.map((item: any, index: number) => {
                  return (
                    <>
                      {tenant.isJP() ? (
                        <HistoryItemJP item={item} key={item?.id} index={index} />
                      ) : getIsCopyLeadPendingMemoListBlank(item) ? (
                        <HistoryItem item={item} key={item?.id} index={index} />
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
