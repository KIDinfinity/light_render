import React from 'react';
import { Button, Upload } from 'antd';
import { useSelector, useDispatch } from 'dva';

const UploadInstance = ({ search }: any) => {
  const dispatch = useDispatch();
  const uploadLoading = useSelector(({ loading }: any) => loading.effects['sqlController/upload']);
  const handleUploadSQL = async ({ file }: any) => {
    const response = await dispatch({
      type: 'sqlController/upload',
      payload: {
        file,
      },
    });
    if (response) {
      search.submit();
    }
  };
  return (
    <Upload
      showUploadList={false}
      onChange={handleUploadSQL}
      beforeUpload={() => false}
      accept=".sql"
    >
      <Button type="primary" style={{ width: '120px' }} loading={uploadLoading}>
        Import...
      </Button>
    </Upload>
  );
};

export default UploadInstance;
