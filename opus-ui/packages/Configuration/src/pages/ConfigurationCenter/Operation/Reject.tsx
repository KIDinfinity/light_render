import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import { useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Batch } from '@/components/TableSearch';
import { FunBatchRunTimeCode } from '../Utils/Constant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
  rows: any[];
  currentMenu: CurrentMenuProps;
}


function Reject(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const {
    functionData: { operationList },
    rows,
    currentMenu: { functionCode },
  } = props;

  const handleReject = async () => {
    dispatch({
      type: 'configurationDataImage/showAppRejectModal',
      payload: {
        modalType: 'reject',
        appRejectRow: rows,
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'reject') && functionCode === FunBatchRunTimeCode && (
        <Batch.Item>
          {() => (
            <Button
              className={styles.btnReject}
              disabled={rows.length < 1}
              onClick={handleReject}
            >
              {formatMessageApi({
                Label_BPM_Button: 'configurationcenter.button.reject',
              })}
            </Button>
          )}
        </Batch.Item>
      )}
    </>
  );

}
export default Reject;
