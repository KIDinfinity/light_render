import React from 'react';
import Item from './Item';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { localConfig, SectionTable } from './Section';
import { useSelector } from 'dva';
import Empty from '@/components/Empty';

const RequestForMaturityBoosterHistory = ({ transactionId, config, transactionTypeCode }: any) => {
  const eventHistoryList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.maturityBooster
        ?.eventHistoryList
  );

  return (
    <div className={styles.history}>
      <div className={styles.sectionTitle}>History</div>
      <div className={styles.singleTopup}>
        <SectionTable
          section="RequestHistory-Table"
          config={localConfig}
          dataSource={(eventHistoryList || []).map((item, index) => index)}
          className={styles.hiddencolor}
          classNameHeader={styles.selfTableHeader}
          numberShowRight
        >
          <Item
            section="RequestHistory-Table"
            transactionId={transactionId}
            transactionTypeCode={transactionTypeCode}
          />
        </SectionTable>
        {eventHistoryList?.length ? null : <Empty className={styles.empty} />}
      </div>
    </div>
  );
};

export default RequestForMaturityBoosterHistory;
