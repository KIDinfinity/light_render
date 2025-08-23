import React from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import Title from './Title';
import Role from './Role';
import styles from './UserGroupItem.less';

export default({ item,setUserGroup,getCurrent }: any) => {
    return (
      <div className={classNames(styles.item, {
        [styles.active]: getCurrent(item),
      })} onClick={() => { setUserGroup(item) }}>
        {!isEmpty(item?.subSection) && <Title groupData={item?.data} />}
        <Role roleData={item?.subSection} />
      </div>
    );
};
