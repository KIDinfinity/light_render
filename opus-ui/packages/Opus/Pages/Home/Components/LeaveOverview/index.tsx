import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDebounceFn } from 'ahooks';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import { history } from 'umi';
import moment from 'moment';
import CardLayout from 'opus/Components/CardLayout';
import { ModalTabs } from 'opus/Enums';
import { ReactComponent as CalendarIcon } from 'packages/Opus/Assets/icon-calendar.svg';
import { ReactComponent as ChevronRightIcon } from 'packages/Opus/Assets/icon-chevron-right.svg';
import { Button, Icon, Spin } from 'packages/Opus/Components/Antd';
import Avatar from 'packages/Opus/Components/Avatar';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
import React, { useCallback, useEffect, useState } from 'react';
import Reassign from '../Reassign';
import styles from './index.less';
import EmptyText from 'opus/Components/EmptyData/Default';

const LEAVE_OVERVIEW = formatMessageApi({ Label_COM_Opus: 'LeaveOverview' });
const MANAGE = formatMessageApi({ Label_BPM_Button: 'Manage' });

export default () => {
  const dispatch = useDispatch();
  
  const leaveOver = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.leaveOver
  );

  const [selectedDate, setSelectedDate] = useState(moment().format('MM-DD-YYYY'));
  const [listLoading, setListLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const { run: getLeaveOverview } = useDebounceFn(
    async () => {
      await dispatch({
        type: `${NAMESPACE}/getLeaveOver`,
        payload: {
          leaveDate: selectedDate,
          type: ModalTabs.myTeamTask,
        },
      });

      setListLoading(false);
    },
    { wait: 1500 }
  );

  const getListData = useCallback(() => {
    setListLoading(true);
    getLeaveOverview();
  }, [getLeaveOverview]);

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    // 获取team user列表
    dispatch({
      type: 'homeTaskFlow/flowInit',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerOperations = (
    <>
      <Button
        className={styles.manage}
        type="primary"
        onClick={() => history.push('/opus/leaveManagement')}
      >
        {MANAGE}
        <Icon component={ChevronRightIcon} />
      </Button>
    </>
  );

  const content = (
    <>
      <div className={styles.list}>
        <div className={styles.title}>{formatMessageApi({ Label_COM_Opus: 'myUpcomeLeave' })}</div>
        <div className={styles.wrap}>
          <Spin spinning={listLoading}>
            {leaveOver?.length ? (
              leaveOver.slice(0, 2).map((item: any) => {
                const {
                  id,
                  userName,
                  userId,
                  startTime,
                  endTime,
                  actualLeaveWorkDay,
                  leaveType,
                } = item;

                return (
                  <div className={styles.item} key={id}>
                    <div className={styles.staff}>
                      <div className={styles.avatar}>
                        <Avatar name={userName} />
                      </div>
                      <div>
                        <div className={styles.name}>{userName}</div>
                      </div>
                    </div>
                    <div className={styles.info}>
                      <div className={styles.range}>{`${moment(startTime).format('L')} - ${moment(
                        endTime
                      ).format('L')}`}</div>
                    </div>
                    <div className={styles.reasonWrap}>
                      <div className={classNames(styles.reason, { [styles[leaveType]]: true })}>
                        {formatMessageApi({ Dropdown_Opus_leaveType: leaveType })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyText type="black" />
            )}
          </Spin>
        </div>
      </div>
    </>
  );

  return (
    <>
      <CardLayout
        headerTitle={LEAVE_OVERVIEW}
        headerIcon={CalendarIcon}
        headerOperations={headerOperations}
        className={styles.leaveOverview}
        content={content}
      />
      <Reassign
        visible={!!selectedUser}
        user={selectedUser}
        onCancel={() => setSelectedUser(null)}
        onOk={() => setSelectedUser(null)}
      />
    </>
  );
};
