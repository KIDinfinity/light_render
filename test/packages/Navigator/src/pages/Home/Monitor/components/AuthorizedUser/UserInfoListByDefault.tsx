import React from 'react';
import styles from './index.less';
import { List, Avatar, Badge, Tooltip } from 'antd';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import UserStatusBadge from 'navigator/pages/Messager/components/UserStatusBadge';

export default ({ list }) => {
  return (
    <div className={styles.userItem}>
      {list.map((userItem) => (
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
  );
};
