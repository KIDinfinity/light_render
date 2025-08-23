import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';

const DownLoad = ({ record }: any) => {
  const dispatch = useDispatch();
  const { fileName } = record;
  const onDownLoad = () => {
    dispatch({
      type: 'sqlController/down',
      payload: {
        fileName,
      },
    });
  };
  return <>{/@fail/i.test(fileName) ? <Button onClick={onDownLoad}>Log</Button> : null}</>;
};

export default DownLoad;
