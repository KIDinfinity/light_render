import React, { useMemo, useCallback } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Card } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CurrentReasonGroup from 'bpm/pages/Envoy/EnvoyList/CurrentReasonGroup/CurrentReasonGroup';
import Count from '@/components/Count';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';
import styles from '../EnvoyList/envoyList.less';

const HistoryList = () => {
  const isAssinee = useSelector(
    (state: any) => lodash.get(state, 'solutionRead.isAssinee'),
    shallowEqual
  );

  const readData = useSelector(
    (state: any) => lodash.get(state, 'solutionRead.readData'),
    shallowEqual
  );
  const historyReasonGroups = useSelector(
    (state: any) => lodash.get(state, 'envoyController.historyReasonGroups'),
    shallowEqual
  );

  const historyGroupKey = useSelector(
    (state: any) => lodash.get(state, 'envoyController.historyGroupKey'),
    shallowEqual
  );

  const showUnRead = useCallback(
    (id: string) => {
      return !!isAssinee && !lodash.includes(readData[ESubjectType.ENVOY], id);
    },
    [isAssinee, readData]
  );

  const renderUI = useMemo(
    () => {
      const visibleHistoryReasonGroups = historyReasonGroups?.filter(i => i.isVisible !== "N") || []
      return (
        <Card
          className={classNames({
            [styles.envoyList]: true,
            history: true,
          })}
          title={
            <Count
              title={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.drawer.remark.title.history',
              })}
              loading={false}
              length={visibleHistoryReasonGroups?.length}
            />
          }
          bordered={false}
        >
          {lodash.map(visibleHistoryReasonGroups, (reasonGroup: any, groupIdx: number) => (
            <div className={styles.concent} key={reasonGroup.id}>
              <Read
                type={EType.ITEM}
                subjectType={ESubjectType.ENVOY}
                id={reasonGroup.id}
                show={showUnRead(reasonGroup.id)}
              >
                <CurrentReasonGroup
                  reasonGroup={reasonGroup}
                  groupIdx={groupIdx}
                  isCurrentList={false}
                  key={`reasonGroup_${groupIdx}`}
                />
              </Read>
            </div>
          ))}
        </Card>
      )
    },
    [historyGroupKey, historyReasonGroups, readData, isAssinee]
  );

  return renderUI;
};

export default HistoryList;
