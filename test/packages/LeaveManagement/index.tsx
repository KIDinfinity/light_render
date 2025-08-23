import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button } from 'antd';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import Info from './Section/Info';
import styles from './index.less';

const LeaveManagement = () => {
  const dispatch = useDispatch();
  const caseNo = useSelector((state: any) => state.processTask.getTask.processInstanceId);
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);

  useEffect(() => {
    dispatch({
      type: 'leaveManagement/getClaim',
    });
  }, []);

  const handleAdd = () => {
    dispatch({
      type: 'leaveManagement/addLeaveItem',
      payload: {
        caseNo,
      },
    });
  };

  return (
    <div className={styles.leaveManagement}>
      <Info />
      {!taskNotEditable && (
        <div className={styles.button}>
          <Button
            shape="round"
            icon="plus"
            onClick={() => {
              handleAdd();
            }}
          >
            {formatMessageApi({
              Label_COM_UserCenter: 'AddRequest',
            })}
          </Button>
        </div>
      )}
    </div>
  );
};

export default connect()(setClaimEditableHoc(LeaveManagement));
