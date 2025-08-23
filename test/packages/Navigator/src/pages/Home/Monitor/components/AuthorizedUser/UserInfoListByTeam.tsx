import React, { useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { Icon, List, Avatar, Badge, Tooltip } from 'antd';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import UserStatusBadge from 'navigator/pages/Messager/components/UserStatusBadge';
import groupDefault from 'navigator/assets/group-default.svg';

export default ({ item }) => {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.userListGroup}>
      <div className={styles.caseCategoryGroup}>
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={<Avatar src={groupDefault} />}
            title={
              <div>
                {`${item.teamName} (${item.teamGroupUserList.length}) `}
                <Icon
                  type={show ? 'down' : 'up'}
                  onClick={() => {
                    setShow((e) => !e);
                  }}
                  className={styles.icon}
                />
              </div>
            }
          />
        </List.Item>
      </div>
      <div className={classnames(styles.teamUserItem, { [styles.hidden]: !show })}>
        {item.teamGroupUserList.map((userItem) => (
          <List.Item>
            <List.Item.Meta
              style={{ alignItems: 'center' }}
              className={userItem?.status === 3 && styles.onLeave}
              avatar={
                <Badge count={userItem.taskNum} showZero>
                  <Avatar src={userDefaultIcon} />
                  {UserStatusBadge(userItem.status)}
                </Badge>
              }
              title={<Tooltip title={userItem.userId}>{userItem.userName}</Tooltip>}
            />
          </List.Item>
        ))}
      </div>
    </div>
  );
};
