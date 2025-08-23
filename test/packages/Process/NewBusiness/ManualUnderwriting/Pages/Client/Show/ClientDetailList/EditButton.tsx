import React from 'react';
import { Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from '../../index.less';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return editable ? (
    <div className={styles.editContainer}>
      <Icon
        type="edit"
        className={styles.editButton}
        onClick={() => {
          dispatch({
            type: `${NAMESPACE}/saveShowModal`,
            payload: {
              type: 'client',
            },
          });
          dispatch({
            type: `${NAMESPACE}/setEditingClientId`,
            payload: { clientId },
          });
        }}
      />
    </div>
  ) : null;
};
