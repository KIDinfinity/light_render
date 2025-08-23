import type { FunctionComponent, CSSProperties } from 'react';
import React from 'react';
import { Upload } from 'antd';
import { useDispatch } from 'dva';

const { Dragger } = Upload;

interface IProps {
  className?: string;
  style?: CSSProperties;
  tooldata?: any;
  setDragging: any;
}

const UploadDragger: FunctionComponent<IProps> = ({ children, setDragging, ...res }: any) => {
  const dispatch = useDispatch();

  const configures = {
    multiple: true,
    showUploadList: false,
    openFileDialogOnClick: false,
    beforeUpload(file: any) {
      dispatch({
        type: 'documentScanningController/saveUploadFiles',
        payload: {
          files: [file],
        },
      });
      setDragging(false);
      return false;
    },
  };

  return (
    <Dragger {...configures} {...res}>
      {children}
    </Dragger>
  );
};

export default UploadDragger;
