import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import RightForm from '../_components/RightForm';
import styles from './Group.less';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'userManagement/getPermissionGroupName',
    });
  }, []);
  const groupList = useSelector((state: any) => state.userManagement.groupList, shallowEqual);

  return (
    <div className={styles.wrap}>
      <RightForm formTitle="groupName">
        {lodash.map(groupList, (item) => (
          <div key={item.groupName}>
            {lodash.isPlainObject(item) && <div>{item.groupName}</div>}
          </div>
        ))}
      </RightForm>
    </div>
  );
};
