import React from 'react';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Collapse, Spin } from 'antd';
import DrawHeadTitle from '@/components/DrawHeadTitle';
import styles from './index.less';
import panelHeader from './panelHeader';
import { useSelector } from 'dva';
import { taskStatus } from 'bpm/enum';
import CollapseItem from './CollapseItem';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import Retry from './Retry';
import useHandleSetIntegrationActivityKeysCallback from 'integration/_hooks/useHandleSetIntegrationActivityKeysCallback';

export default ({ taskDetail }: any) => {
  const setActiveKey = useHandleSetIntegrationActivityKeysCallback();
  const integrationChecklist = useSelector((state) => state?.integration?.integrationChecklist);
  const loading = useSelector(
    (state: any) => state.loading.effects['integration/getIntegrationChecklist'],
    shallowEqual
  );
  const integrationActivityKeys = useSelector(
    (state: any) => state.integration.integrationActivityKeys,
    shallowEqual
  );
  const firstTodoItemIndex = lodash.findLastIndex(integrationChecklist, (item) => {
    return item?.taskStatus === taskStatus.todo;
  });

  const shouldShowRetry =
    lodash.some(integrationChecklist, (item) => {
      return item?.allowManualRetry;
    }) &&
    ((taskDetail?.taskId &&
      lodash.find(integrationChecklist, { taskId: taskDetail?.taskId })?.autoActivity) ||
      !taskDetail?.taskId);

  return (
    <div className={styles.wrap}>
      <DrawHeadTitle>
        {formatMessageApi({ Label_Sider_IntegrationChecklist: 'IntegrationChecklist' })}
      </DrawHeadTitle>
      <div
        className={classNames(styles.content, {
          [styles.contentBg]: integrationChecklist?.length > 0,
        })}
      >
        {loading ? (
          <div className={styles.spin}>
            <Spin />
          </div>
        ) : integrationChecklist?.length ? (
          <Collapse
            activeKey={integrationActivityKeys}
            bordered={false}
            onChange={(key) => {
              setActiveKey(key);
            }}
          >
            {lodash.map(integrationChecklist, (panelItem, index) => {
              return (
                <CollapseItem
                  key={panelItem.taskId}
                  header={panelHeader({
                    panelItem,
                    needHighlightTodoItem: index === firstTodoItemIndex,
                    order: integrationChecklist?.length - index,
                  })}
                  panelItem={panelItem}
                  showArrow={panelItem.taskStatus !== taskStatus.skip}
                  disabled={panelItem.taskStatus === taskStatus.skip}
                />
              );
            })}
          </Collapse>
        ) : (
          <div className={styles.caseAchieved}>
            {formatMessageApi({ Label_Sider_IntegrationChecklist: 'CaseIsArchived' })}
          </div>
        )}
      </div>
      {shouldShowRetry ? <Retry taskDetail={taskDetail} /> : null}
    </div>
  );
};
