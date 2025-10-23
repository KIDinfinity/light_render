import React, { useCallback } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import styles from '../index.less';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { showDeleteConfirmModal } from 'opus/Components/Modals/DeleteModal';

export default ({ coverage, insured }) => {
  const dispatch = useDispatch();
  const handleRemove = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/deleteClient`,
      payload: {
        insuredId: insured?.id,
        coverageId: coverage?.id,
      },
    });
  }, [dispatch, insured?.id, coverage?.id]);

  return (
    <div
      className={classnames(styles.icon, styles.clientName)}
      onClick={() => showDeleteConfirmModal({ onConfirm: handleRemove })}
    >
      <Icon type="close" />
    </div>
  );
};
