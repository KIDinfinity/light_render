import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { safeParseUtil } from '@/utils/utils';
import { transferCurrent } from '../Utils/Transfer';
import styles from './index.less';

interface ComponentProps {
  isNeedEdit: boolean;
  record: any;
  disabled: boolean;
}

function VersionUpdate(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const { isNeedEdit, record, disabled } = props;
  const handlerEdit = async () => {
    const { newData, new_data, versionNo, version_no, status } = record;
    await dispatch({
      type: 'configurationCenter/showModal',
      payload: {
        current: transferCurrent(safeParseUtil(newData || new_data), status),
        type: 'update',
        parentVersionNo: versionNo || version_no,
      },
    });
  };

  return (
    <>
      {isNeedEdit ? (
        <Button
          className={styles.btnGrey}
          shape="circle"
          disabled={disabled}
          style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
          icon="edit"
          onClick={() => {
            handlerEdit();
          }}
        />
      ) : (
        <></>
      )}
    </>
  );

}
export default VersionUpdate;
