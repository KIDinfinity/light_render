import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PayableList from './PayableList';
import styles from './ButtonGroup.less';

const ButtonGroup = ({ incidentId, treatmentId, expand, setExpand }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const showAddPayable = async (e: any) => {
    const { top } = e.target.getBoundingClientRect();
    await dispatch({
      type: `${NAMESPACE}/popUpPablePoint`,
      payload: {
        top: Number(top),
      },
    });
    await dispatch({
      type: `${NAMESPACE}/popUpPableInit`,
      payload: {
        treatmentId,
        incidentId,
      },
    });
  };

  return (
    <div>
      <div className={styles.btnGroup}>
        <Button className={styles.btn} onClick={() => setExpand(!expand)}>
          {expand
            ? formatMessageApi({ Label_BIZ_Claim: 'Collapse' })
            : formatMessageApi({ Label_BIZ_Claim: 'Expand' })}
        </Button>
        {editable && (
          <Button icon="plus" onClick={showAddPayable} className={styles.btn}>
            Payable
          </Button>
        )}
      </div>
      {expand && <PayableList treatmentId={treatmentId} />}
    </div>
  );
};

export default ButtonGroup;
