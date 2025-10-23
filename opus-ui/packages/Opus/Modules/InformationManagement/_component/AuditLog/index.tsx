import React, { useEffect, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { List, Spin } from 'antd';
import AuditLogItem from './AuditLogItem';
import styles from './index.less';
import Empty from './Empty';
import TaskDetailContext from 'navigator/components/CaseTaskDetail/Context';
export default ({ caseDetail }: any) => {
  const processInstanceId: any =
    caseDetail?.processInstanceId || useContext(TaskDetailContext)?.processInstanceId;

  const dispatch = useDispatch();
  const auditList = useSelector((state: any) => state.infoController.auditList || [], shallowEqual);
  const hasMore = useSelector(
    (state: any) => state.infoController?.auditLogPagination?.hasMore,
    shallowEqual
  );
  const loading = useSelector((state) => state.loading.effects['infoController/getAuditLogsList']);
  useEffect(() => {
    return () => {
      dispatch({
        type: 'infoController/clearAuditLogList',
      });
    };
  }, []);
  useEffect(() => {
    dispatch({
      type: 'infoController/getTriggerPointData',
      payload: { init: true, processInstanceId: processInstanceId },
    });
  }, [dispatch, processInstanceId]);

  return (
    <>
      {(auditList && auditList.length > 0) || loading ? (
        <div className={styles.auditLog}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={() => {
              dispatch({
                type: 'infoController/loaAuditLogdNextPage',
              });
            }}
            hasMore={hasMore}
            useWindow={false}
            key="init"
          >
            <List
              itemLayout="horizontal"
              dataSource={auditList}
              renderItem={(item: any) => {
                return <AuditLogItem key={item.id} item={item} className={styles.auditLogItem} />;
              }}
            >
              {loading && (
                <div className={styles.loadingWrap}>
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};
