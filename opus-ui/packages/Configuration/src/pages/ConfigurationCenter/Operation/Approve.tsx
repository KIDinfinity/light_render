import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import { useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Batch } from '@/components/TableSearch';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { FunBatchRunTimeCode } from '../Utils/Constant';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
  rows: any[];
  currentMenu: CurrentMenuProps;
}

function Approve(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const {
    functionData: { operationList },
    rows,
    currentMenu: { functionCode },
  } = props;
  const handleApprove = () => {
    dispatch({
      type: 'configurationDataImage/showAppRejectModal',
      payload: {
        modalType: 'approve',
        appRejectRow: rows,
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'approve') && functionCode === FunBatchRunTimeCode && (
        <Batch.Item>
          {() => (
            <Button
              className={styles.btnApprove}
              disabled={rows.length < 1}
              onClick={handleApprove}
            >
              {formatMessageApi({
                Label_BPM_Button: 'configurationcenter.button.approve',
              })}
            </Button>
          )}
        </Batch.Item>
      )}
    </>
  );

}
export default Approve;
