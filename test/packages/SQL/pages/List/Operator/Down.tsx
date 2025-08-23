import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';

const DownLoad = ({ record }: any) => {
  const { id, execStatus } = record;
  const dispatch = useDispatch();
  const onDownLoad = () => {
    dispatch({
      type: 'sqlController/fileDown',
      payload: {
        id
      },
    });
  };
  return (
    <>{/fail/i.test(execStatus) && <Button onClick={onDownLoad}>Log</Button>}</>
  );
};

export default DownLoad;
