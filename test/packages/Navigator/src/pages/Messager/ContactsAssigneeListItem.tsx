import React, { Component } from 'react';
import lodash from 'lodash';
import { List, Avatar, Badge, notification } from 'antd';
import { DropTarget } from 'react-dnd';
import { connect } from 'dva';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ItemTypes from '@/components/DnDHelper/ItemTypes';
import UserStatusBadge from './components/UserStatusBadge';

import userDefaultIcon from 'navigator/assets/user-default.svg';
import { AuthCache } from '@/auth/Utils';
import { Action } from '@/components/AuditLog/Enum';
import styles from './ContactsAssigneeList.less';

const abortController = new AbortController();
// assignTask前判断权限

const rowTarget = {
  drop: async (props) => {
    const {
      dispatch,
      userId,
      item,
      taskDetail,
      ProviderSetTaskId,
      assignSourceType,
      TableSearch,
      filter,
      filterParams,
      businessCode,
    } = props;
    const { caseCategory = '' } = filterParams || {};

    const params = {
      assignee: item.userId,
      assigner: userId,
      taskId: taskDetail.taskId,
      caseNo: taskDetail.procInstId,
      caseCategory: taskDetail?.caseCategory,
      skipEditLogCheck: assignSourceType === 5,
    };
    const isCanAssign = await dispatch({
      type: 'authController/CheckAssigneTask',
      payload: {
        ...params,
        taskUser: taskDetail.assignee,
      },
    });

    if (!isCanAssign) return;

    const ManualAssignPermission = {
      assignee: item.userId,
      activityKey: taskDetail?.activityKey,
      taskId: taskDetail.taskId,
      caseCategory: taskDetail?.caseCategory,
      caseNo: taskDetail?.procInstId,
      businessNo: taskDetail?.businessNo,
    };

    const havePermission = await dispatch({
      type: 'contactsAssigneeList/beManualAssignPermissionLimit',
      payload: { ManualAssignPermission },
    });

    if (!havePermission) {
      return;
    }

    const response = await dispatch({
      type: 'contactsAssigneeList/assignTask',
      payload: params,
    });

    // 更新列表数据
    if (response?.success) {
      if (lodash.isFunction(ProviderSetTaskId)) {
        await ProviderSetTaskId(null);
        await ProviderSetTaskId(taskDetail.taskId);
      }

      AuthCache.removeCache();
      notification.success({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'app.navigator.drawer.messager.msg-assign-task-success',
        }),
      });

      /* --- auditLog --- */
      const { taskId, caseNo, activityKey, procInstId, assignee } = taskDetail;

      dispatch({
        type: 'auditLogController/logTask',
        payload: {
          action: Action.Assign,
          processInstanceId: procInstId || caseNo,
          activityKey,
          taskId,
          formerAssigneeId: assignee || 'unassigned',
          beAssignedUserId: item.userId,
          beAssignedUserName: item.userName,
        },
      });
      switch (assignSourceType) {
        case 1:
          // 更新首页table模式列表
          dispatch({
            type: 'task/tableList',
            payload: {
              pageSize: 6,
              params: {
                assignee: userId,
                taskStatus: filter,
                ...filterParams,
              },
            },
            signal: abortController.signal,
          });

          // 更新filter dropdown
          setTimeout(() => {
            dispatch({
              type: 'navigatorHomeWatching/getHomeFilterList',
              payload: {
                filter,
              },
            });
          }, 3000);

          break;
        case 2:
          // 更新首页card模式列表
          dispatch({
            type: 'task/list',
            payload: {
              pageSize: 10,
              params: {
                assignee: userId,
                taskStatus: filter,
                ...filterParams,
              },
            },
            // signal: abortController.signal, // 组件卸载时会中断请求，故注释掉
          });

          // 更新filter dropdown
          setTimeout(() => {
            dispatch({
              type: 'navigatorHomeWatching/getHomeFilterList',
              payload: {
                filter,
              },
            });
          }, 3000);

          break;
        case 3:
        case 4:
          // 更新高级查询table以及card模式列表
          TableSearch.handleSearch();
          break;
        case 5:
          setTimeout(() => {
            window.location.reload();
          }, 600);
          break;
        default:
          break;
      }
      dispatch({
        type: 'navigatorHomeWatching/getFilterChannelList',
        payload: {
          userId: userId,
          status: filter,
          businessCode,
          caseCategory,
        },
      });
    } else {
      notification.error({
        message: 'assignTask error',
      });
    }

    // 关闭侧边栏以及 Assineelist隐藏 （isAssigneeListVisible设为false）
    dispatch({
      type: 'contactsAssigneeList/closeAssigneeList',
    });

    return response;
  },
};

@connect(({ contactsAssigneeList, user, homeList, navigatorHomeWatching }) => ({
  taskDetail: contactsAssigneeList?.taskDetail,
  ProviderSetTaskId: contactsAssigneeList?.ProviderSetTaskId,
  assignSourceType: contactsAssigneeList?.assignSourceType,
  TableSearch: contactsAssigneeList?.TableSearch,
  userId: user?.currentUser?.userId,
  businessCode: user?.currentUser?.businessCode,
  filter: homeList.filter,
  filterParams: navigatorHomeWatching.filterParams,
}))
@DropTarget(ItemTypes.ASSIGNEE, rowTarget, (connect1, monitor) => ({
  connectDropTarget: connect1.dropTarget(),
  isOver: monitor.isOver(),
}))
class ContactsAssigneeListItem extends Component {
  componentWillUnmount() {
    abortController.abort();
  }
  assign() {
    rowTarget.drop(this.props);
  }
  render() {
    const { item, connectDropTarget, isOver, assignSourceType, keyword } = this.props;

    const index = item.userName?.toLowerCase()?.indexOf(keyword?.toLowerCase());
    const title =
      index !== -1 && keyword ? (
        <>
          {item.userName?.slice(0, index)}
          <span className={styles.highlight}>
            {item.userName?.slice(index, index + keyword.length)}
          </span>
          {item.userName?.slice(index + keyword.length)}
        </>
      ) : (
        item.userName
      );
    return connectDropTarget(
      <div
        key={item.userId}
        style={{ display: 'flex' }}
        className={classNames('assignee_list_item', isOver && 'drop_actived', {
          [styles.click]: assignSourceType == 5,
        })}
        onClick={this.assign.bind(this)}
      >
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={
              <Badge count={item.taskNum} showZero>
                <Avatar src={item?.profilePic ? item?.profilePic : userDefaultIcon} />
                {UserStatusBadge(item.status)}
              </Badge>
            }
            title={title}
          />
        </List.Item>
      </div>
    );
  }
}

export default ContactsAssigneeListItem;
