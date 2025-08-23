import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';

const Execute = ({ record, search }: any) => {
  const dispatch = useDispatch();
  const { fileName } = record;
  const onExecute = async () => {
    const response = await dispatch({
      type: 'sqlController/execute',
      payload: {
        fileName,
      },
    });
    if (response) {
      search.submit();
    }
  };
  return (
    <>{/\w+@(\w|-)+@\w+/.test(fileName) ? <Button onClick={onExecute}>Execute</Button> : null}</>
  );
};

export default Execute;
