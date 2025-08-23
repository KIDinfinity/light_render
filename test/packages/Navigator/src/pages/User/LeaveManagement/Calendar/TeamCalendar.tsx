import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Badge, List } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import Calendar from 'rc-calendar';
import classnames from 'classnames';
import { useAuth } from '@/auth/Utils';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { popup } from '../ApprovedModal';
import { RequestStatus } from '../../../../../../LeaveManagement/Enum';
import renderCalendarStyles from '../Utils/renderCalendarStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'rc-calendar/assets/index.css';
import styles from './TeamCalendar.less';

interface IProps {
  caseNo?: string;
  dateTime?: string;
  modalTaskId?: string;
}

export default () => {
  const dispatch = useDispatch();

  const requestInfo = useSelector((state: any) => state.leaveManagement.requestInfo);
  const modalTaskId = useSelector((state: any) => state.leaveManagement.modalTaskId);
  const draftTaskId = useSelector((state: any) => state.leaveManagement.draftTaskId);
  const userLeaveInfo = useSelector((state: any) => state.leaveManagement.userLeaveInfo);
  const subordinateList = useSelector((state: any) => state.leaveManagement.subordinateList);
  const selectedUser = useSelector((state: any) => state.leaveManagement.selectedUser);

  const {
    RS_LP_ApplyLeave_AllUsers: allUsersAuth,
    RS_LP_ApplyLeave_Subordinates: subordinatesAuth,
    RS_LP_ApplyLeave_CurrentUser: currentUserAuth,
    RS_LP_WaiveLeavePlan: waiveAuth,
  } = useAuth([
    'RS_LP_ApplyLeave_AllUsers',
    'RS_LP_ApplyLeave_Subordinates',
    'RS_LP_ApplyLeave_CurrentUser',
    'RS_LP_WaiveLeavePlan',
  ]);

  const [currentDate, setCurrentDate] = useState({
    beginDate: '',
    endDate: '',
  });
  const [activeListId, setActiveListId] = useState('');
  const [activeStatus, setActiveStatus] = useState('');

  const initDate = () => {
    const currentDateYear = moment(new Date()).format('YYYY');
    const currentDateMonth = moment(new Date()).format('MM');
    const currentDateNextMonth = moment(new Date()).add(1, 'months').format('MM');
    const currentLastDate = moment(`${currentDateYear}-${currentDateNextMonth}-01`)
      .subtract(1, 'day')
      .format('DD');

    setCurrentDate({
      beginDate: `${currentDateYear}-${currentDateMonth}-01`,
      endDate: `${currentDateYear}-${currentDateMonth}-${currentLastDate}`,
    });

    dispatch({
      type: 'leaveManagement/saveState',
      payload: {
        beginDate: `${currentDateYear}-${currentDateMonth}-01`,
        endDate: `${currentDateYear}-${currentDateMonth}-${currentLastDate}`,
      },
    });
  };

  useEffect(() => {
    if (lodash.isEmpty(currentDate.beginDate) || lodash.isEmpty(currentDate.endDate)) {
      initDate();
    } else {
      const { beginDate, endDate } = currentDate;
      const users: any[] = lodash.reduce(
        subordinateList,
        (target: any, item) => {
          const { userId, userName } = item;

          target.push({ userId, userName });
          return target;
        },
        []
      );

      dispatch({
        type: 'leaveManagement/getTeamLeaveRequestInfo',
        payload: {
          beginDate,
          endDate,
          statuses: [RequestStatus.Approved, RequestStatus.WaitingApproval],
          users,
        },
      });
    }
  }, [currentDate, subordinateList]);

  // 根据右上角select变化筛选日历的请假信息
  useEffect(() => {
    const { beginDate, endDate } = currentDate;
    let users = [];

    if (lodash.isEmpty(selectedUser)) {
      return;
    }

    if (selectedUser?.userId === 'all') {
      users = lodash.reduce(
        subordinateList,
        (target: any, item) => {
          const { userId, userName } = item;

          target.push({ userId, userName });
          return target;
        },
        []
      );
    } else {
      const { userId, userName } = selectedUser;
      users = [{ userId, userName }];
    }

    dispatch({
      type: 'leaveManagement/saveState',
      payload: {
        currentUsers: users,
      },
    });

    dispatch({
      type: 'leaveManagement/getTeamLeaveRequestInfo',
      payload: {
        beginDate,
        endDate,
        statuses: [RequestStatus.Approved, RequestStatus.WaitingApproval],
        users,
      },
    });
  }, [selectedUser]);

  const handleFindTaskId = async ({ caseNo, dateTime }: IProps) => {
    const newDate = moment(dateTime).format('YYYY-MM-DD');
    await dispatch({
      type: 'leaveManagement/getFindLatesTaskByCaseNo',
      payload: {
        caseNo,
        dateTime: newDate,
      },
    });

    await dispatch({
      type: 'leaveManagement/saveState',
      payload: {
        showModal: true,
        calendarDate: newDate,
      },
    });
  };

  const handleModalTaskId = async ({ dateTime }: IProps) => {
    const newDate = moment(dateTime).format('YYYY-MM-DD');
    await dispatch({
      type: 'leaveManagement/saveState',
      payload: {
        showModal: true,
        calendarDate: newDate,
      },
    });

    if (lodash.isEmpty(modalTaskId)) {
      await dispatch({
        type: 'leaveManagement/createCase',
      });
    } else {
      await dispatch({
        type: 'leaveManagement/saveModalTaskId',
        payload: {
          modalTaskId: draftTaskId,
        },
      });

      await dispatch({
        type: 'leaveManagement/updateCalendarInfoList',
        payload: {
          dateTime: newDate,
        },
      });
    }
  };

  // 切换年月份的时候设置当前的开始时间和结束时间
  const handleDateChange = (date: any) => {
    const currentYear = moment(currentDate.beginDate).format('YYYY');
    const dateYear = moment(date).format('YYYY');
    const currentMonth = moment(currentDate.beginDate).format('MM');
    const dateMonth = moment(date).format('MM');
    const currentDateNextMonth = moment(date).add(1, 'months').format('MM');
    const lastDate = moment(`${currentYear}-${currentDateNextMonth}-01`)
      .subtract(1, 'day')
      .format('DD');

    if (currentYear !== dateYear || currentMonth !== dateMonth) {
      setCurrentDate({
        beginDate: `${dateYear}-${dateMonth}-01`,
        endDate: `${dateYear}-${dateMonth}-${lastDate}`,
      });

      dispatch({
        type: 'leaveManagement/saveState',
        payload: {
          beginDate: `${dateYear}-${dateMonth}-01`,
          endDate: `${dateYear}-${dateMonth}-${lastDate}`,
        },
      });
    }
  };

  const handleMouseEnter = (current: string, status: string) => {
    setActiveListId(current);
    setActiveStatus(status);
  };
  const handleMouseLeave = () => {
    setActiveListId('');
    setActiveStatus('');
  };

  /*
    双击点击日历的日期，只能在大于当前日期之后的日子createCase
   */
  const handleDoubleClickOpenTask = async (el: any) => {
    const { datetime } = el?.target?.dataset;
    const dateTimeFormat = moment(datetime).format('YYYY-MM-DD');

    // createCase
    // 不能选中小于当前时间
    if (dateTimeFormat < moment(new Date()).format('YYYY-MM-DD')) return;
    await handleModalTaskId({ dateTime: datetime });
  };

  const handleClickOpenTask = async (el: any) => {
    if (!allUsersAuth && !subordinatesAuth && !currentUserAuth) return;

    // 根据caseNo 获取相应的task
    const { caseno, datetime } = el?.target?.dataset;
    const dateTimeFormat = moment(datetime).format('YYYY-MM-DD');

    if (!lodash.isEmpty(caseno)) {
      await handleFindTaskId({ caseNo: caseno, dateTime: datetime });
    } else {
      // 不能选中小于当前时间
      if (dateTimeFormat < moment(new Date()).format('YYYY-MM-DD')) return;
      await handleModalTaskId({ dateTime: datetime });
    }
  };

  const renderBubbleList = (options: any) => {
    const { info, current, requestStatus, backgroundColor, color, isTogether } = options;
    const currentTime = moment(current).format('YYYY-MM-DD');

    return (
      <div
        className={styles.bubble}
        onMouseEnter={() => handleMouseEnter(currentTime, requestStatus)}
        onMouseLeave={handleMouseLeave}
      >
        <Badge
          style={{ backgroundColor, color: color || '' }}
          count={lodash.size(info)}
          className={requestStatus === RequestStatus.WaitingApproval && styles.specialBadge}
        />
        {currentTime === activeListId && activeStatus === requestStatus && (
          <List
            className={classnames({
              [`${styles.approvedList}`]: requestStatus === RequestStatus.Approved,
              [`${styles.waitingList}`]:
                requestStatus === RequestStatus.WaitingApproval && !isTogether,
              [`${styles.togerList}`]:
                requestStatus === RequestStatus.WaitingApproval && isTogether,
            })}
            dataSource={info}
            renderItem={(item: any, index: number) => (
              <List.Item
                key={`${index} ${item.userId}`}
                className={requestStatus === RequestStatus.Approved && styles.usersListItem}
                data-caseno={item.caseNo}
                data-datetime={moment(current).format('YYYY-MM-DD HH:mm')}
                onClick={(el: any) => {
                  if (requestStatus === RequestStatus.Approved) {
                    popup({
                      caseNo: item.caseNo,
                      date: moment(current).format('YYYY-MM-DD'),
                      status: 'approved',
                      userId: item.userId,
                      showUserName: true,
                      dispatch,
                      waiveAuth,
                    });
                    return;
                  }
                  handleClickOpenTask(el);
                }}
              >
                {item.userName}
              </List.Item>
            )}
          />
        )}
      </div>
    );
  };

  // eslint-disable-next-line consistent-return
  const renderBubble = (current: any) => {
    // 看看是不是选择了单个用户，如果是就渲染单个用户的请假信息
    // 如果选择All 就从右上角的用户list获取所有用户的信息

    const currentTime = moment(current).format('YYYY-MM-DD');
    const info = userLeaveInfo[`${currentTime}`];

    let approvalBubble = null;
    let waitingBubble = null;

    if (!lodash.isEmpty(info)) {
      const approvedInfo = info[RequestStatus.Approved];
      const waitingInfo = info[RequestStatus.WaitingApproval];
      const approvedInfoExist = !lodash.isEmpty(approvedInfo);
      const waitingInfoExist = !lodash.isEmpty(waitingInfo);
      const isTogether = approvedInfoExist && waitingInfoExist;

      if (approvedInfoExist) {
        approvalBubble = renderBubbleList({
          info: approvedInfo,
          requestStatus: RequestStatus.Approved,
          current,
          backgroundColor: '#1ebda0',
        });
      }

      if (waitingInfoExist) {
        waitingBubble = renderBubbleList({
          info: waitingInfo,
          requestStatus: RequestStatus.WaitingApproval,
          current,
          backgroundColor: '#FDBF2D',
          color: '#333',
          isTogether,
        });
      }

      return (
        <>
          {waitingBubble}
          {approvalBubble}
        </>
      );
    }
  };

  return (
    <div className={styles.wrap}>
      <Calendar
        format="YYYY-MM-DD"
        dateRender={(current: any) => {
          const approvedStyle = renderCalendarStyles(
            'approved',
            current,
            requestInfo?.approved || []
          );
          const waitApprovalStyle = renderCalendarStyles(
            '',
            current,
            requestInfo?.waiting_for_approval || []
          );
          // eslint-disable-next-line no-nested-ternary
          const caseNo = approvedStyle?.open
            ? approvedStyle?.caseNo
            : waitApprovalStyle.open
            ? waitApprovalStyle.open
            : '';

          return (
            <>
              <div
                className={classnames('rc-calendar-date')}
                data-caseno={caseNo}
                data-modaltaskid={modalTaskId}
                data-datetime={moment(current).format('YYYY-MM-DD HH:mm')}
                onDoubleClick={(el: any) => {
                  handleDoubleClickOpenTask(el);
                }}
              >
                {moment(current).format('DD')}
              </div>
              {renderBubble(current)}
            </>
          );
        }}
        onChange={(date: any) => {
          handleDateChange(date);
        }}
        focusablePanel={false}
        renderFooter={null}
      />

      <div className={styles.explain}>
        <span className={styles.approved}>
          <span className={styles.circle} />
          {formatMessageApi({
            Label_COM_UserCenter: 'approved',
          })}
        </span>
        <span className={styles.pending}>
          <span className={styles.circle} />
          {formatMessageApi({
            Label_COM_UserCenter: 'pendingForApproval',
          })}
        </span>
      </div>
    </div>
  );
};
