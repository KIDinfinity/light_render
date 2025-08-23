import type { FunctionComponent, CSSProperties } from 'react';
import React from 'react';
import { Upload } from 'antd';

const { Dragger } = Upload;

interface IProps {
  className?: string;
  style?: CSSProperties;
  tooldata?: any;
  setDragging: any;
  sectionIndex;
}

const UploadDragger: FunctionComponent<IProps> = ({
  handleBeforeUpload,
  children,
  setDragging,
  ...res
}: any) => {
  const configures = {
    multiple: true,
    showUploadList: false,
    openFileDialogOnClick: false,
    beforeUpload(file: any) {
      handleBeforeUpload([file]);
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
