import React from 'react';
import { Badge } from 'antd';
import lodash from 'lodash';
import getUserStateEnum from '../../userState';

const userStatusBadge = (ustate: number, text?) => {
  let badge = null;
  lodash.map(Object.keys(getUserStateEnum()), (item: string) => {
    const userItem = getUserStateEnum()[item];

    if (userItem.value === ustate) {
      badge = <Badge status={userItem.status} color={userItem.color} text={text || ''} />;
    }
  });
  return badge;
};
export default userStatusBadge;
