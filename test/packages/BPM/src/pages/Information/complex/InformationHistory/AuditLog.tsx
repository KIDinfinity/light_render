import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import classNames from 'classnames';
import { List, Spin } from 'antd';
import CommonEmpty from '@/components/Empty';
import Item from './Item';
import styles from './styles/wrap.less';

interface IProps {
  isExpanderSwitchOn: boolean;
  inExpander?: boolean;
}

export default ({ isExpanderSwitchOn, inExpander }: IProps) => {
  const dispatch = useDispatch();
  const auditList = useSelector(
    (state: any) => state.navigatorInformationController.auditList || [],
    shallowEqual
  );
  const hasMore = useSelector(
    (state: any) => state.navigatorInformationController.auditLogPagination.hasMore || false,
    shallowEqual
  );
  const loading = useSelector(
    (state) => state.loading.effects['navigatorInformationController/getAuditLogsList']
  );
  useEffect(() => {
    if (!!inExpander === !!isExpanderSwitchOn) {
      dispatch({
        type: 'navigatorInformationController/getTriggerPointData',
        payload: { init: true },
      });
    }
  }, []);

  return (
    <>
      {(auditList && auditList.length > 0) || loading ? (
        <div
          className={classNames(
            isExpanderSwitchOn ? styles.wrapperAuditBig : styles.wrapperAuditSmall
          )}
        >
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={() => {
              dispatch({
                type: 'navigatorInformationController/loaAuditLogdNextPage',
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
                return <Item key={item.id} item={item} />;
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
        <CommonEmpty />
      )}
    </>
  );
};
