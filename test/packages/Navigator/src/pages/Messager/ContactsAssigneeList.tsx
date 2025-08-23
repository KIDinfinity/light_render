import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Spin } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CommonEmpty from '@/components/Empty';
import getUserStateEnum from './userState';
import ContactsAssigneeListItem from './ContactsAssigneeListItem';
import ContactsAssigneeListItemOfDisabled from './ContactsAssigneeListItemOfDisabled';
import AuthorizedGroup from './AuthorizedGroup';
import styles from './ContactsAssigneeList.less';
import classNames from 'classnames';

@connect(({ contactsAssigneeList, userContactController, loading, chatController }) => ({
  assigneeList: contactsAssigneeList.assigneeList,
  keyword: chatController.keyword,
  contactList: userContactController.contactList,
  matchUserGroupList: contactsAssigneeList.matchUserGroupList,
  loading:
    loading.effects['authController/CheckAssigneTask'] ||
    loading.effects['contactsAssigneeList/beManualAssignPermissionLimit'] ||
    loading.effects['contactsAssigneeList/assignTask'],
}))
class ContactsAssigneeList extends Component {
  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsAssigneeList/clearAssigneeList',
    });
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    const AssigneeListRef = this.assigneeListRef;
    dispatch({
      type: 'contactsAssigneeList/save',
      payload: {
        AssigneeListRef,
      },
    });
    dispatch({
      type: 'contactsAssigneeList/saveDocumentSize',
    });
  };

  render() {
    const { assigneeList, keyword, contactList, matchUserGroupList } = this.props;
    console.log('assigneeList', assigneeList);
    const assigneeListDeep = [...assigneeList];
    const matchUserGroupListCopy = [...matchUserGroupList];

    let searchResultList = []; // 搜索结果列表
    let additionalList = []; // 追加数据列表
    let searchResultDisabledList = [];
    let searchGroup = [];
    // 获取搜索结果的数组
    if (keyword) {
      searchResultList = lodash.remove(assigneeListDeep, (item) =>
        item?.userName?.toLowerCase()?.includes(keyword?.toLowerCase())
      );
      searchResultDisabledList = lodash.remove(searchResultList, (item) => !item.isAssignee);
      searchGroup = lodash.remove(matchUserGroupListCopy, (item) => {
        if (item?.groupName?.toLowerCase()?.includes(keyword?.toLowerCase())) return true;
        return item?.userContactList?.some((user) =>
          user?.userName?.toLowerCase()?.includes(keyword?.toLowerCase())
        );
      });

      searchResultDisabledList.sort((a, b) => b.userName - a.userName);
      searchResultList.sort((a, b) => {
        const byNum = a.taskNum - b.taskNum;
        if (byNum !== 0) return byNum;

        return b.userName - a.userName;
      });
    }
    // 获取追加数据的列表
    additionalList = lodash.remove(assigneeListDeep, (item) => !item.isAssignee);

    // 以下对列表进行排序
    additionalList.sort((a, b) => b.userName - a.userName);
    assigneeListDeep.sort((a, b) => {
      const byNum = a.taskNum - b.taskNum;
      if (byNum !== 0) return byNum;

      return b.userName - a.userName;
    });

    // 获取assigneeList中的用户状态
    const assigneeStatusList = lodash.map(assigneeListDeep, (item) => ({
      ...item,
      status: lodash.find(contactList, (contact: any) => contact.userId === item.userId)?.status,
    }));

    const onlineAssignee = lodash.filter(
      assigneeStatusList,
      (item) => item.status === getUserStateEnum().ONLINE.value
    );
    const offlineAssignee = lodash.filter(
      assigneeStatusList,
      (item) => item.status === getUserStateEnum().OFFLINE.value
    );
    const onleaveAssignee = lodash.filter(
      assigneeStatusList,
      (item) => item.status === getUserStateEnum().ONLEAVE.value
    );

    return (
      <div
        className={styles.wrap}
        ref={(ref) => {
          this.assigneeListRef = ref;
        }}
      >
        {this.props.loading && (
          <Spin size="large" className={classNames(styles.loading, 'ant-modal-mask')} />
        )}
        {keyword && (
          <React.Fragment>
            {searchResultList.length > 0 ||
            searchResultDisabledList.length > 0 ||
            searchGroup.length > 0 ? (
              <React.Fragment>
                {searchGroup.map((group) => (
                  <AuthorizedGroup group={group} key={group?.groupCode} keyword={keyword} />
                ))}
                {lodash.map(searchResultList, (item) => (
                  <ContactsAssigneeListItem
                    type="search"
                    key={item.userId}
                    item={item}
                    keyword={keyword}
                  />
                ))}
                {lodash.map(searchResultDisabledList, (item) => (
                  <ContactsAssigneeListItemOfDisabled
                    type="search"
                    key={item.userId}
                    item={item}
                    keyword={keyword}
                  />
                ))}
              </React.Fragment>
            ) : (
              <CommonEmpty />
            )}
            <div style={{ padding: 10 }}>
              {formatMessageApi({
                Label_COM_WarningMessage:
                  'app.navigator.drawer.messager.title.may-be-you-need-other-options',
              })}
              :
            </div>
          </React.Fragment>
        )}
        {matchUserGroupListCopy.map((group) => (
          <AuthorizedGroup group={group} key={group?.groupCode} />
        ))}
        {lodash.map(onlineAssignee, (item) => (
          <ContactsAssigneeListItem type="assignee" item={item} key={item.userId} />
        ))}
        {lodash.map(offlineAssignee, (item) => (
          <ContactsAssigneeListItem type="assignee" item={item} key={item.userId} />
        ))}
        {!lodash.isEmpty(onleaveAssignee) && <Divider orientation="left">Users on leave</Divider>}
        {lodash.map(onleaveAssignee, (item) => (
          <ContactsAssigneeListItem type="assignee" item={item} key={item.userId} />
        ))}
        {!lodash.isEmpty(additionalList) && (
          <Divider orientation="left">Users without permission</Divider>
        )}
        {lodash.map(additionalList, (item) => (
          <ContactsAssigneeListItemOfDisabled type="addition" key={item.userId} item={item} />
        ))}
      </div>
    );
  }
}

export default ContactsAssigneeList;
