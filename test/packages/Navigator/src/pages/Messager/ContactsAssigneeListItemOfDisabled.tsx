import React, { Component } from 'react';
import { List, Avatar, Badge } from 'antd';
import { connect } from 'dva';
import userStatusBadge from './components/UserStatusBadge';
import userGrayIcon from 'navigator/assets/user-gray.svg';
import styles from './ContactsAssigneeList.less';

@connect(({ contactsAssigneeList, user }) => ({
  contactsAssigneeList,
  taskDetail: contactsAssigneeList?.taskDetail,
  userId: user?.currentUser?.userId,
}))
class ContactsAssigneeListItem extends Component {
  render() {
    const { item, isOnLeave = false, keyword } = this.props;
    const index = item.userName?.toLowerCase()?.indexOf(keyword?.toLowerCase())
    const title = index !== -1 && keyword ?
      <>
        {
          item.userName?.slice(0, index)
        }
        <span className={styles.highlight}>{item.userName?.slice(index, index + keyword.length)}</span>
        {
          item.userName?.slice(index + keyword.length)
        }
      </>
      : item.userName
    return (
      <div
        key={item.userId}
        style={{ display: 'flex' }}
        className="drop_disabled assignee_list_item"
      >
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={
              <Badge count={item.num || ''}>
                <Avatar src={item?.profilePic ? item?.profilePic : userGrayIcon} />
                {isOnLeave && userStatusBadge(item.status)}
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
