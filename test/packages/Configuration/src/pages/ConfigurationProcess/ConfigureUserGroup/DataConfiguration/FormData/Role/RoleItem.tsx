import React from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import Title from './Title';
import Permission from './Permission';

import styles from './RoleItem.less';

export default ({ item, setUserGroup, getCurrent }: any) => {
  return (
    <div className={classNames(styles.item, {
      [styles.active]: getCurrent(item),
    })} onClick={() => { setUserGroup(item) }}>
      {!isEmpty(item?.subSection) && <Title groupData={item?.data} />}
      <Permission permissionData={item?.subSection} />
    </div>
  );
};
