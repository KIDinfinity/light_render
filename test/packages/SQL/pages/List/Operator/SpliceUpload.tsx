import React, { useState } from 'react';
import { Button } from 'antd';
import UploadModal from '../UploadModal';

const UploadInstance = ({ search }: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        icon="upload"
        type="primary"
        style={{ width: '120px' }}
        onClick={() => setVisible(true)}
      >
        Import...
      </Button>
      {/*
      // @ts-ignore */}
      <UploadModal visible={visible} setVisible={setVisible} search={search} />
    </>
  );
};

export default UploadInstance;
