import React from 'react';
import { Avatar } from 'antd';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import UserStatusBadge from '../UserStatusBadge';

function ListItemAvatar(props: { item: any; handleMouseEnter: any }) {
  const { item, handleMouseEnter } = props;

  return (
    <>
      <div>
        <Avatar
          src={item?.avatar ? item?.avatar : userDefaultIcon}
          // @ts-ignore

          onMouseEnter={handleMouseEnter}
        />
        {UserStatusBadge(item.status)}
      </div>
    </>
  );
}
export default ListItemAvatar;
