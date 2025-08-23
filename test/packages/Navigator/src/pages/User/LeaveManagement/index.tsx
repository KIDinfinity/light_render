import React, { useEffect } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Icon, Button, Select } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getAuth } from '@/auth/Utils';
import classNames from 'classnames';
import Calendar from './Calendar/Calendar';
import TeamCalendar from './Calendar/TeamCalendar';
import List from './list';
import AntModal from './modal';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const showModal = useSelector((state: any) => state.leaveManagement.showModal);
  const draftTaskId = useSelector((state: any) => state.leaveManagement.draftTaskId);
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const subordinateList = useSelector((state: any) => state.leaveManagement.subordinateList);
  const active = useSelector((state: any) => state.leaveManagement.userLeaveRequestTabName);

  const allUsersAuth: boolean = getAuth(commonAuthorityList, {
    authorityCode: 'RS_LP_InquiryLeaveRequest_AllUsers',
  });
  const subordinatesAuth: boolean = getAuth(commonAuthorityList, {
    authorityCode: 'RS_LP_InquiryLeaveRequest_Subordinates',
  });
  const applyLeaveAllAuth: boolean = getAuth(commonAuthorityList, {
    authorityCode: 'RS_LP_ApplyLeave_AllUsers',
  });
  const applyLeaveSubAuth: boolean = getAuth(commonAuthorityList, {
    authorityCode: 'RS_LP_ApplyLeave_Subordinates',
  });
  const applyLeaveCurAuth: boolean = getAuth(commonAuthorityList, {
    authorityCode: 'RS_LP_ApplyLeave_CurrentUser',
  });

  const handlePersonalClick = () => {
    dispatch({
      type: 'leaveManagement/saveState',
      payload: { userLeaveRequestTabName: 'personalActive' },
    });
  };

  const handleTeamClick = async () => {
    dispatch({
      type: 'leaveManagement/saveState',
      payload: { userLeaveRequestTabName: 'teamActive' },
    });

    // 1. dispatch 获取拉下列表所有下属
    // 2. 通知日历更新所有人的请假信息
    // 3. 获取下拉列表数据 更新到下拉列表
    const response = await dispatch({
      type: 'leaveManagement/getSubordinateInfo',
    });

    dispatch({
      type: 'leaveManagement/saveState',
      payload: {
        currentUsers: response,
      },
    });
  };

  const handleSelect = (userId: string, options: any) => {
    const userName = options?.props?.children;

    if (lodash.isEmpty(userId) && lodash.isEmpty(userName)) {
      return;
    }

    if (userName === 'all') {
      dispatch({
        type: 'leaveManagement/saveSelectedUser',
        payload: {
          selectedUser: { userId: 'all', userName: 'all' },
        },
      });
    } else {
      dispatch({
        type: 'leaveManagement/saveSelectedUser',
        payload: {
          selectedUser: { userId, userName },
        },
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: 'leaveManagement/getUserDraftLeaveRequest',
    });
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.topWrap}>
        {allUsersAuth || subordinatesAuth ? (
          <div className={styles.textWrap}>
            <Icon type="calendar" className={styles.dateIcon} />
            <span
              className={classNames({
                [styles.text]: true,
                [styles.actived]: active === 'personalActive',
              })}
              onClick={handlePersonalClick}
            >
              {formatMessageApi({
                Label_COM_UserCenter: 'PersonalLeavePlan',
              })}
            </span>

            <span
              className={classNames({
                [styles.text]: true,
                [styles.actived]: active === 'teamActive',
              })}
              onClick={handleTeamClick}
            >
              {formatMessageApi({
                Label_COM_UserCenter: 'TeamLeavePlan',
              })}
            </span>
          </div>
        ) : (
          <div className={styles.textWrap}>
            <Icon type="calendar" className={styles.dateIcon} />
            <span className={styles.singleText}>
              {formatMessageApi({
                Label_COM_UserCenter: 'LeavePlan',
              })}
            </span>
          </div>
        )}
        {(applyLeaveAllAuth || applyLeaveSubAuth || applyLeaveCurAuth) && (
          <Button
            className={styles.leaveBtn}
            icon={!lodash.isEmpty(draftTaskId) ? 'edit' : ''}
            onClick={async () => {
              console.log('draftTaskId', draftTaskId)
              if (lodash.isEmpty(draftTaskId)) {
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
              }
              await dispatch({
                type: 'leaveManagement/saveState',
                payload: {
                  showModal: true,
                },
              });
            }}
          >
            {formatMessageApi({
              Label_COM_UserCenter: 'ApplyforLeave',
            })}
          </Button>
        )}
        {active === 'teamActive' && (
          <div className={styles.teammates}>
            {(allUsersAuth || subordinatesAuth) && (
              <Select
                dropdownClassName={styles.dropdown}
                defaultValue="All teammates"
                suffixIcon={<Icon type="caret-down" className={styles.selectIcon} />}
                placeholder=""
                onSelect={handleSelect}
              >
                <Select.Option value="all">All teammates</Select.Option>
                {lodash.map(subordinateList, (item: any) => (
                  <Select.Option value={item.userId} key={item.userId}>
                    {item.userName}
                  </Select.Option>
                ))}
              </Select>
            )}
          </div>
        )}
      </div>

      {active === 'personalActive' ? <Calendar /> : <TeamCalendar />}

      <List listactive={active} />

      <AntModal showModal={showModal} />
    </div>
  );
};
