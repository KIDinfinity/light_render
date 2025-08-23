import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import Item from './Item';
import styles from './index.less';
import { EnovyRetryTypes } from 'bpm/pages/Envoy/enum.ts';

export default ({ groudId, setHasExtraFuncFailState, status }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'envoyController/getRetryList',
      payload: {
        id: groudId,
        status,
      },
    });
  }, []);

  const retryList = useSelector(
    ({ envoyController }: any) => envoyController.retryListGroups?.[groudId],
    shallowEqual
  );

  const groups = useMemo(() => {
    if (!retryList) {
      return [];
    }
    const orderMap = [
      EnovyRetryTypes.HOLD,
      EnovyRetryTypes.FAIL,
      EnovyRetryTypes.RETRY,
      EnovyRetryTypes.WAIT,
      EnovyRetryTypes.SUCCESS,
    ];
    return lodash
      .chain(retryList)
      .map((item) => ({
        ...item,
        executeStatus: !!item?.executeStatus ? item.executeStatus : EnovyRetryTypes.FAIL, // executeStatus 为 null 作为 fail 处理
      }))
      .orderBy(
        [(item) => orderMap.findIndex((i) => i === item.executeStatus), 'executeSequence'],
        ['asc', 'asc']
      )
      .groupBy((item) => {
        if (item.executeStatus === EnovyRetryTypes.WAIT) {
          return 'In-progress';
        }
        if (item.executeStatus === EnovyRetryTypes.SUCCESS) {
          return 'Done';
        }
        if (item.executeStatus === EnovyRetryTypes.HOLD) {
          return 'Hold';
        }
        return 'Fail';
      })
      .value();
  }, [retryList]);

  useEffect(() => {
    if (!lodash.isEmpty(groups) && lodash.size(groups.Fail) === 0) {
      setHasExtraFuncFailState(false);
    }
  }, [groups]);

  return (
    <div className={styles.retry}>
      {lodash.map(groups, (groupItem: any, groupKey) => (
        <div className={styles.list} key={groupKey}>
          <div className={styles.title}>{groupKey} Process</div>
          {lodash.map(groupItem, (item) => (
            <Item item={item} key={item?.id} />
          ))}
        </div>
      ))}
    </div>
  );
};
