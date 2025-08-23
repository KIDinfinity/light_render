import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';

const ContinuteUpload = ({ record }: any) => {
  const dispatch = useDispatch();

  const handleContinuteUpload = async () => {
    dispatch({
      type: 'sqlController/spliceUpload',
      payload: {
        needUpload: [record],
        keep: true
      },
    });
  };

  return (
    <>
      {(record?.chunkList && !record?.loading && record?.uploadSlice !== record?.uploadTotal) && (
        <Button
          type="dashed"
          onClick={handleContinuteUpload}
          loading={record?.loading}
        >
          Continue Upload
        </Button>
      )}
    </>
  );
};

export default ContinuteUpload;
