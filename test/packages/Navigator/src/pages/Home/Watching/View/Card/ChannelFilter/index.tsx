import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';
import { Button, Typography } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import classNames from 'classnames';

type Channel = {
  caseCategory?: string;
  caseCategoryCount?: number;
  status?: string;
  taskGroupCode?: string;
  taskGroupName?: string;
  totalCount?: number;
};

export default ({}: any) => {
  const dispatch = useDispatch();
  const userInfo = LS.getItem(LSKey.CURRENTUSER);
  const { businessCode } = userInfo;
  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const filter = useSelector((state: any) => state.homeList.filter);
  const filterParams = useSelector((state: any) => state.navigatorHomeWatching.filterParams);
  const ChannelList = useSelector((state: any) => state.navigatorHomeWatching.filterChannelList);
  const { caseCategory = '', submissionChannel = '' } = filterParams || {};
  const updateChannels = useCallback(() => {
    dispatch({
      type: 'navigatorHomeWatching/getFilterChannelList',
      payload: {
        userId: userId,
        status: filter,
        businessCode,
        caseCategory,
      },
    });
  }, [caseCategory, dispatch, filter, userId, businessCode]);
  const onChannelChange = useCallback(
    (item) => {
      const updatedChannel = submissionChannel === item.taskGroupCode ? '' : item.taskGroupCode;
      const previousFilter = LS.getItem(LSKey.NAVIGATOR_CASE_FILTER);

      //筛选条件持久化
      LS.setItem(LSKey.NAVIGATOR_CASE_FILTER, {
        ...previousFilter,
        submissionChannel: updatedChannel,
      });
      dispatch({
        type: 'navigatorHomeWatching/saveFilterParams',
        payload: {
          changeValue: { submissionChannel: updatedChannel },
        },
      });
    },
    [submissionChannel, dispatch]
  );
  useEffect(() => {
    let interval: any = null;
    const INTERVAL_TIME = 30000;
    updateChannels();
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(updateChannels, INTERVAL_TIME);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [updateChannels]);
  return ChannelList && ChannelList?.length > 1 ? (
    <div className={styles.buttonWrapper}>
      <div className={styles.buttonItem}>
        <Button
          className={classNames([
            styles.button,
            submissionChannel === '' ? styles.buttonActive : '',
          ])}
          onClick={() => {
            onChannelChange({
              taskGroupCode: '',
            });
          }}
        >
          All
        </Button>
      </div>

      {lodash.map(ChannelList, (item: Channel) => {
        return (
          <div className={styles.buttonItem} key={item.taskGroupCode}>
            <Button
              className={classNames([
                styles.button,
                submissionChannel === item.taskGroupCode ? styles.buttonActive : '',
              ])}
              onClick={() => {
                onChannelChange(item);
              }}
              title={formatMessageApi({
                Dropdown_COM_SubmissionChannel: item.taskGroupCode,
              })}
            >
              <Typography.Text ellipsis className={styles.buttonText}>
                {formatMessageApi({
                  Dropdown_COM_SubmissionChannel: item.taskGroupCode,
                })}
              </Typography.Text>
            </Button>
          </div>
        );
      })}
    </div>
  ) : null;
};
