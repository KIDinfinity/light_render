import React from 'react';
import { Button, Icon, Modal, Upload, Spin } from 'packages/Opus/Components/Antd';
import { ReactComponent as UploadIcon } from 'opus/Assets/icon-Upload.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import classNames from 'classnames';

const { Dragger } = Upload;

const UploadWarp = ({ configures }: any) => {
  return (
    <Dragger {...configures} className={styles.DraggerWarp}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">
        {formatMessageApi({
          Label_COM_Opus: 'ClickOrDragFiles',
        })}
      </p>
    </Dragger>
  );
};

const UploadWarpModal = ({
  uploadVisible = false,
  uploadWarpConfigures = {},
  handleOk = () => {},
  handleCancel = () => {},
  uploadFiles = [],
  children = <></>,
  showOCRButton = false,
  handleOCR = () => {},
  disableOCR = false,
  handleCancelOCR = false,
  loading = false,
  brightBorderCancel = false,
}: any) => {
  const footer = [
    <Button
      className={classNames({ [styles.brightBorderCancel]: brightBorderCancel })}
      key="Cancel"
      onClick={handleCancel}
    >
      {formatMessageApi({ Label_COM_Opus: 'cancel' })}
    </Button>,
    <Button key="submit" type="primary" onClick={handleOk} disabled={uploadFiles?.length === 0}>
      {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
    </Button>,
  ];
  if (showOCRButton) {
    footer.unshift(
      <Button key="OCR" onClick={handleOCR} disabled={disableOCR}>
        {formatMessageApi({ Label_COM_Opus: 'OCR' })}
      </Button>
    );
  }
  return (
    <Modal
      closable={false}
      centered
      visible={uploadVisible}
      maskClosable={false}
      title={
        <>
          {loading && (
            <div className={styles.spin}>
              <Spin />
              {showOCRButton && (
                <Button
                  className={styles.cancelBtn}
                  onClick={() => handleCancelOCR && handleCancelOCR()}
                >
                  {formatMessageApi({
                    Label_COM_Opus: 'cancel',
                  })}
                </Button>
              )}
            </div>
          )}
          <span className={styles.modalTitle}>
            <Icon component={UploadIcon} />
            <span>
              {formatMessageApi({
                Label_COM_Opus: 'UploadDocuments',
              })}
            </span>
          </span>
        </>
      }
      onOk={handleOk}
      onCancel={() => handleCancel()}
      footer={footer}
      width={800}
      className={styles.modalWarp}
    >
      <UploadWarp configures={uploadWarpConfigures} />
      <div className={styles.uploadFiles}>{children}</div>
    </Modal>
  );
};

export default UploadWarpModal;
