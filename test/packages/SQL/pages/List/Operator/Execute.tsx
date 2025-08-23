import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';

const Execute = ({ record, search }: any) => {
  const dispatch = useDispatch();
  const { id, uploadTotal, uploadSlice } = record;
  const onExecute = async () => {
    const response = await dispatch({
      type: 'sqlController/fileExec',
      payload: {
        id,
      },
    });
    if (response) {
      search.submit();
    }
  };
  return uploadSlice && uploadSlice === uploadTotal ? (
    <Button onClick={onExecute}>Execute</Button>
  ) : null;
};

export default Execute;
