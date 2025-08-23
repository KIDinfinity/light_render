import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Card } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
// import { formatMessageApi } from '@/utils/dictFormatMessage';
import CurrentReasonGroup from 'bpm/pages/Envoy/EnvoyList/CurrentReasonGroupSummary/CurrentReasonGroup';
import Count from '@/components/Count';
import styles from '../EnvoyList/envoyList.less';
import { Icon } from 'antd';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import useLoadEnvoySectionData from '../../../../../SummaryPage/hooks/useLoadEnvoySectionData.ts';

const HistoryList = ({ expendStatus, setExpendStatus }: any) => {
  const historyReasonGroups = useSelector(
    (state: any) => lodash.get(state, 'envoyController.historyReasonGroups'),
    shallowEqual
  );
  const historyLenght = useLoadEnvoySectionData();
  const titleRender = (
    <div className={styles.titleWrap}>
      <span className={styles.title}>Envoy</span>
      <span className={styles.actions}>
        <Icon type={!expendStatus ? 'down' : 'up'} onClick={() => setExpendStatus(!expendStatus)} />
      </span>
    </div>
  );

  return (
    <Card
      className={classnames(styles.detail, {
        [styles.hidden]: !expendStatus,
      })}
      title={<Count title={titleRender} loading={false} length={historyLenght} />}
      bordered={false}
    >
      {expendStatus ? (
        <div className={styles.container}>
          {lodash.map(historyReasonGroups, (reasonGroup: any, groupIdx: number) => (
            <CurrentReasonGroup
              reasonGroup={reasonGroup}
              groupIdx={groupIdx}
              isCurrentList={false}
              key={`reasonGroup_${groupIdx}`}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default () => {
  return (
    <ExpandableContainer sectionId="envoy">
      <HistoryList />
    </ExpandableContainer>
  );
};
