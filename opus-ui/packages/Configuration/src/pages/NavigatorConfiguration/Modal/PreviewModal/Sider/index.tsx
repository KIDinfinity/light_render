import React from 'react';
import { Button, Icon } from 'antd';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { ReactComponent as editSvg } from 'navigator/assets/configuration/edit.svg';
import { ReactComponent as fileCopy } from 'navigator/assets/configuration/file_copy.svg';
import { ReactComponent as enterTask } from 'navigator/assets/task.svg';
import { Operation, Status } from '../../../Enum';
import styles from './index.less';

function ButtonGroup({ functionCode, operationList, previewRecord }: any) {
  const updateAuth = lodash.includes(operationList, 'update');
  const addAuth = lodash.includes(operationList, 'add');
  const { cc_latest_status, cc_task_id } = previewRecord || {};
  const dispatch = useDispatch();

  const onUpdate = async () => {
    if (cc_latest_status && Status[cc_latest_status] && !cc_task_id) {
      return;
    }
    if (cc_task_id) {
      await dispatch({
        type: 'configurationController/openTask',
        payload: {
          taskId: cc_task_id,
        },
      });
    } else {
      dispatch({
        type: 'configurationController/handleRecord',
        payload: {
          type: Operation.Update,
          rows: [previewRecord],
        },
      });
    }
  };

  const onCopy = async () => {
    dispatch({
      type: 'configurationController/handleRecord',
      payload: {
        type: Operation.Add,
        tag:'onCopy'
      },
    });
  };

  const onEnterTask = async () => {
    await dispatch({
      type: 'global/visitTaskDetail',
      payload: {
        taskId: cc_task_id,
      },
    });
  };

  return (
    <div className={styles.buttonBox}>
      <>
        {updateAuth &&
          ![Status.locked, Status.underAuditEditor, Status.underAuditApprover].includes(
            cc_latest_status
          ) && (
            <Button onClick={onUpdate}>
              <span>{formatMessageApi({ Label_BIZ_Claim: 'form.update' })}</span>
              <Icon component={editSvg} />
            </Button>
          )}
        {addAuth && (
          <Button onClick={onCopy}>
            <span>{formatMessageApi({ Label_BIZ_Claim: 'form.copy_to_add' })}</span>
            <Icon component={fileCopy} className={styles.fileCopy} />
          </Button>
        )}
        {cc_latest_status === Status.underAuditEditor && (
          <Button onClick={onEnterTask}>
            <span>{formatMessageApi({ Label_COM_ConfigurationCenter: 'Enter_Task' })}</span>
            <Icon component={enterTask} className={styles.enterTask} />
          </Button>
        )}
      </>
    </div>
  );
}

export default ButtonGroup;
