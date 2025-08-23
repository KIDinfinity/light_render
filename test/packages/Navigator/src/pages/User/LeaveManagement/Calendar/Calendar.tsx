import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
// eslint-disable-next-line import/no-extraneous-dependencies
import Calendar from 'rc-calendar';
import classnames from 'classnames';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useAuth } from '@/auth/Utils';
import { popup } from '../ApprovedModal';
import { RequestStatus } from '../../../../../../LeaveManagement/Enum';
import renderCalendarStyles from '../Utils/renderCalendarStyles';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'rc-calendar/assets/index.css';
import styles from './Calendar.less';

interface IProps {
  caseNo?: string;
  dateTime?: string;
  modalTaskId?: string;
}

export default () => {
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const requestInfo = useSelector((state: any) => state.leaveManagement.requestInfo);
  const modalTaskId = useSelector((state: any) => state.leaveManagement.modalTaskId);
  const draftTaskId = useSelector((state: any) => state.leaveManagement.draftTaskId);

  const {
    RS_LP_ApplyLeave_AllUsers: applyLeaveAllAuth,
    RS_LP_ApplyLeave_Subordinates: applyLeaveSubAuth,
    RS_LP_ApplyLeave_CurrentUser: applyLeaveCurAuth,
    RS_LP_WaiveLeavePlan: waiveAuth,
  } = useAuth([
    'RS_LP_ApplyLeave_AllUsers',
    'RS_LP_ApplyLeave_Subordinates',
    'RS_LP_ApplyLeave_CurrentUser',
    'RS_LP_WaiveLeavePlan',
  ]);

  const [currentDate, setCurrentDate] = useState({
    startTime: '',
    endTime: '',
  });
  const [flag, setFlag] = useState(false);

  const initDate = () => {
    const currentDateYear = moment(new Date()).format('YYYY');
    const currentDateNextYear = moment(new Date()).add(1, 'year').format('YYYY');
    const currentDateMonth = moment(new Date()).format('MM');
    const currentDateNextMonth = moment(new Date()).add(1, 'months').format('MM');

    const startTime = `${currentDateYear}-${currentDateMonth}-01 00:00:00`;
    const endTime =
      Number(moment(new Date()).get('month')) === 11
        ? `${currentDateNextYear}-01-01 00:00:00`
        : `${currentDateYear}-${currentDateNextMonth}-01 00:00:00`;
    setCurrentDate({
      startTime,
      endTime,
    });

    dispatch({
      type: 'leaveManagement/saveState',
      payload: {
        startTime: `${currentDateYear}-${currentDateMonth}-01 00:00:00`,
        endTime,
      },
    });
  };
  useEffect(() => {
    if (lodash.isEmpty(currentDate.startTime) || lodash.isEmpty(currentDate.endTime)) {
      initDate();
    } else {
      const { startTime, endTime } = currentDate;
      dispatch({
        type: 'leaveManagement/getLeaveRequestInfo',
        payload: {
          params: {
            startTime,
            endTime,
            statuses: [RequestStatus.Approved, RequestStatus.WaitingApproval],
          },
        },
      });
    }
  }, [currentDate]);

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
    const currentYear = moment(currentDate.startTime).format('YYYY');
    const dateYear = moment(date).format('YYYY');
    const currentMonth = moment(currentDate.startTime).format('MM');
    const dateMonth = moment(date).format('MM');
    const currentDateNextMonth = moment(date).add(1, 'months').format('MM');
    const currentDateNextYear = moment(new Date()).add(1, 'year').format('YYYY');
    if (currentYear !== dateYear || currentMonth !== dateMonth) {
      const endTime =
        (Number(currentMonth) === Number(currentDateNextMonth) && Number(currentMonth) === 1) ||
        (Number(currentMonth) === 11 && Number(currentDateNextMonth) === 1) ||
        (Number(currentYear) === Number(currentDateNextYear) &&
          Number(currentMonth) === 12 &&
          Number(currentDateNextMonth) === 1)
          ? `${currentDateNextYear}-01-01 00:00:00`
          : `${dateYear}-${currentDateNextMonth}-01 00:00:00`;
      setCurrentDate({
        startTime: `${dateYear}-${dateMonth}-01 00:00:00`,
        endTime,
      });
      dispatch({
        type: 'leaveManagement/saveState',
        payload: {
          startTime: `${dateYear}-${dateMonth}-01 00:00:00`,
          endTime,
        },
      });
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
            <div
              className={classnames(
                'rc-calendar-date',
                (approvedStyle.open || waitApprovalStyle.open) && styles.openItem,
                approvedStyle.open && styles.approvedOpen,
                waitApprovalStyle.open && styles.awaitApprovalOpen,
                (approvedStyle.first || waitApprovalStyle.first) && styles.firstItem,
                (approvedStyle.last || waitApprovalStyle.last) && styles.lastItem,
                ((approvedStyle.first && approvedStyle.last) ||
                  (waitApprovalStyle.first && waitApprovalStyle.last)) &&
                  styles.onlyItem
              )}
              data-caseno={caseNo}
              data-modaltaskid={modalTaskId}
              data-datetime={moment(current).format('YYYY-MM-DD HH:mm')}
              onClick={async (el: any) => {
                if (approvedStyle.open) {
                  popup({
                    caseNo,
                    date: moment(current).format('YYYY-MM-DD'),
                    status: 'approved',
                    userId,
                    dispatch,
                    waiveAuth,
                  });
                  return;
                }
                // 没有apply for leave权限不能请假
                if (!applyLeaveAllAuth && !applyLeaveSubAuth && !applyLeaveCurAuth) {
                  return;
                }

                const { caseno, datetime } = el?.target?.dataset;
                const dateTimeFormat = moment(datetime).format('YYYY-MM-DD');

                if (!lodash.isEmpty(caseno)) {
                  // 查看请假case
                  await handleFindTaskId({ caseNo: caseno, dateTime: datetime });
                } else {
                  // 不能选中小于当前时间
                  // createCase
                  if (dateTimeFormat < moment(new Date()).format('YYYY-MM-DD')) return;
                  if (!flag) {
                    setFlag(true);
                    return;
                  }
                  await handleModalTaskId({ dateTime: datetime });
                  setFlag(false);
                }
              }}
            >
              {moment(current).format('DD')}
            </div>
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
