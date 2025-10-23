import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal, Button, Icon } from 'antd';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { LS, LSKey } from '@/utils/cache';

const dictCodeMapping = {
  [BusinessCode.claim]: {
    button: 'claimAssessmentWorksheet.uploadToFileNet',
    msg: 'MSG_001114',
    uploadMsg: 'MSG_001115',
  },
  [BusinessCode.pos]: {
    button: '',
    msg: '',
    uploadMsg: '',
  },
  [BusinessCode.poshk]: {
    button: '',
    msg: '',
    uploadMsg: '',
  },
  [BusinessCode.nb]: {
    button: 'uwAssessmentWorksheet.uploadToECM',
    msg: 'MSG_001113',
    uploadMsg: 'MSG_001098',
  },
};

export default () => {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const dispatch = useDispatch();
  const generateUWWorksheetModal = useSelector(({ infoController }: any) => {
    return infoController?.generateUWWorksheetModal;
  });
  const isShowUploadButton = useSelector(({ infoController }: any) => {
    return infoController?.isShowUploadButton;
  });
  const businessCode = LS.getItem(LSKey.CURRENTUSER)?.businessCode;

  const dictCodeMap = dictCodeMapping[businessCode] || {};

  const handleCancel = () => {
    dispatch({
      type: `infoController/setGenerateUWWorksheetModal`,
      payload: {
        show: false,
        documentName: null,
      },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    await dispatch({
      type: `infoController/generateUWWorksheetUpload`,
      payload: { businessCode },
    });
    setUploading(false);
  };

  const handleDownload = async () => {
    setDownloading(true);
    await dispatch({
      type: `infoController/generateUWWorksheetDownloadPdf`,
      payload: { businessCode },
    });
    setDownloading(false);
  };

  return (
    <>
      <Modal
        visible={generateUWWorksheetModal?.show}
        title={
          <div className={styles.title}>
            <Icon type="check" className={styles.headerIcon} />
            <span>
              {formatMessageApi({
                Label_COM_Opus: 'Success',
              })}
            </span>
          </div>
        }
        closable={false}
        onCancel={handleCancel}
        footer={[
          isShowUploadButton ? (
            <Button key="upload" type="primary" onClick={handleUpload} loading={uploading}>
              {formatMessageApi({
                Label_BPM_Button: dictCodeMap.button,
              })}
            </Button>
          ) : (
            <></>
          ),
          <Button key="submit" type="primary" onClick={handleDownload} loading={downloading}>
            {formatMessageApi({
              Label_BPM_Button: 'uwAssessmentWorksheet.download',
            })}
          </Button>,
        ]}
        className={styles.box}
      >
        <div className={styles.content}>
          <p>
            {formatMessageApi({
              Label_COM_Message: isShowUploadButton ? dictCodeMap.uploadMsg : dictCodeMap.msg,
            })}
          </p>
          <div>{generateUWWorksheetModal?.fileName}</div>
          <div className={styles.process} />
        </div>
      </Modal>
    </>
  );
};
