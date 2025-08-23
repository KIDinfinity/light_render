import React, { Component } from 'react';
import lodash from 'lodash';
import { List, Avatar, Badge, notification, Icon } from 'antd';
import { DropTarget } from 'react-dnd';
import { connect } from 'dva';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ItemTypes from '@/components/DnDHelper/ItemTypes';
import ContactsAssigneeListItem from './ContactsAssigneeListItem';
import groupDefault from 'navigator/assets/group-default.svg';
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
      group,
      taskDetail,
      ProviderSetTaskId,
      assignSourceType,
      TableSearch,
      filter,
      filterParams,
    } = props;

    const item = await dispatch({
      type: 'contactsAssigneeList/getTargetAssignee',
      payload: { group }
    })

    if(!item)
      return

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
      payload: {
        ...params,
        assignType: 'auto',
        assigner: 'System'
      },
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
          formerAssigneeId: assignee,
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
  filter: homeList.filter,
  filterParams: navigatorHomeWatching.filterParams,
}))
@DropTarget(ItemTypes.ASSIGNEE, rowTarget, (connect1, monitor) => ({
  connectDropTarget: connect1.dropTarget(),
  isOver: monitor.isOver(),
}))
class AuthorizedGroup extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.groupSection = null;
    this.enterCount = 0;
  }

  componentWillUnmount() {
    abortController.abort();
    const { assignSourceType, group } = this.props;
    if (assignSourceType === 5 || !group.showMember)
      return;
    this.groupSection?.removeEventListener('dragenter', this.onMouseEnter)
    this.groupSection?.removeEventListener('dragleave', this.onMouseLeave)
  }

  componentDidMount(): void {
    const { assignSourceType, group } = this.props;

    if (assignSourceType === 5 || !group.showMember)
      return;
    this.groupSection?.addEventListener('dragenter', this.onMouseEnter)
    this.groupSection?.addEventListener('dragleave', this.onMouseLeave)
  }

  onMouseEnter = () => {
    this.enterCount++;
    this.timeout = setTimeout(() => {
      if(this.enterCount > 0)
        this.setState({ expanded: true })
    }, 2000);
  }

  onMouseLeave = () => {
    this.enterCount --;
    clearTimeout(this.timeout);
    if(this.enterCount <= 0)
      this.setState({ expanded: false })
  }

  assign() {
    rowTarget.drop(this.props);
  }

  render() {
    const { group, connectDropTarget, isOver, assignSourceType, keyword } = this.props;
    const groupName = `${group.groupName} (${group.userContactList?.length || 0})`;
    const index = groupName?.toLowerCase()?.indexOf(keyword?.toLowerCase())
    const title = index !== -1 && keyword ?
      <>
        {
          groupName?.slice(0, index)
        }
        <span className={styles.highlight}>{groupName.slice(index, index + keyword.length)}</span>
        {
          groupName?.slice(index + keyword.length)
        }
      </>
      : groupName

    const sortContactList = keyword? [...group.userContactList].sort((a, b) => {
      const aMatched = a.userName?.toLowerCase()?.indexOf(keyword?.toLowerCase()) !== -1;
      const bMatched = b.userName?.toLowerCase()?.indexOf(keyword?.toLowerCase()) !== -1;

      if(aMatched === bMatched)
        return 0;
      if(aMatched)
        return -1;
      return 1;
    }) : group.userContactList
    return (
      <div ref={ref => this.groupSection = ref}>
        {
          connectDropTarget(
            <div
              className={classNames('assignee_list_item', isOver && 'drop_actived', {
                [styles.click]: assignSourceType == 5,
              }, styles.userGroupRow)}
              onClick={this.assign.bind(this)}
            >
              <List.Item style={{ display: 'flex' }}>
                <List.Item.Meta
                  style={{ alignItems: 'center' }}
                  avatar={
                    <Badge>
                      <Avatar src={group?.profilePic ? group?.profilePic : groupDefault} />
                    </Badge>
                  }
                  title={title}
                />
              </List.Item>
              {
                !!group.showMember && (
                  <Icon type="down" className={styles.userGroupExpandIcon} style={{ transform: this.state.expanded ? 'rotate(180deg)' : void 0 }} onClick={(event) => {
                    this.setState({ expanded: !this.state.expanded })
                    event.stopPropagation();
                  }} />
                )
              }
            </div>
          )
        }
        {
          <div style={{paddingLeft: '20px'}}>
            {
              this.state.expanded && sortContactList.map(item => (
                <ContactsAssigneeListItem item={item} key={item.userId} keyword={keyword} />
              ))
            }
          </div>

        }
      </div>
    );
  }
}

export default AuthorizedGroup;
