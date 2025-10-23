import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Batch } from '@/components/TableSearch';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps } from '../Utils/Typings';

interface ComponentProps {
  functionData: FunctionDataProps;
  rows: any[];
}

function Submit(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const submitLoading: boolean = useSelector((state: any) => state.loading.effects['configurationDataImage/submit']);
  const {
    functionData: { operationList = [] },
    rows: rowsEl,
  } = props;
  const handleSubmit = (submitRow: any) => {
    dispatch({
      type: 'configurationDataImage/showSubmitModal',
      payload: {
        submitRow,
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'submit') ? (
        <Batch.Item>
          {() => (
            <Button
              type="danger"
              disabled={rowsEl.length < 1}
              loading={submitLoading}
              onClick={() => {
                handleSubmit(rowsEl);
              }}
            >
              {formatMessageApi({
                Label_BPM_Button: 'configurationcenter.button.submit',
              })}
            </Button>
          )}
        </Batch.Item>
      ) : (
        <></>
      )}
    </>
  );

}
export default Submit;
