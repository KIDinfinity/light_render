import React from 'react';
import lodash from 'lodash';
import { Button, Icon, Modal } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { ReactComponent as EditDocument } from '../../_static/icon-EditDocument.svg';
import { ReactComponent as ConfirmationIcon } from 'opus/Assets/icon-modal-confirm.svg';
import { ReactComponent as Filed } from '../../_static/icon-Filed.svg';
import { ReactComponent as Uploaded } from 'opus/Assets/icon-success-circle.svg';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetData from 'basic/components/DataProvider/hooks/useGetData';
import EditSetion from './editSetion';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const { documentList } = useGetData();

  const {
    editVisit,
    documentEdit,
    editConfirmationVisibility,
    editUploadedVisibility,
    loadingParam,
  } = useSelector(({ documentManagement, loading }: any) => ({
    editVisit: documentManagement.editVisit,
    editConfirmationVisibility: documentManagement.editConfirmationVisibility,
    editUploadedVisibility: documentManagement.editUploadedVisibility,
    documentEdit: documentManagement.documentEdit,
    loadingParam: loading.effects['documentManagement/submitUpdateDocument'],
  }));

  const fileName = lodash
    .chain(documentList)
    .find(['id', documentEdit?.id])
    .get('name', '')
    .value();

  const handleCancel = ({ next }: any = { next: false }) => {
    dispatch({
      type: 'documentManagement/setEditVisit',
      payload: {
        editVisit: false,
        documentEdit: next ? null : [],
      },
    });
  };
  const handleOk = () => {
    handleCancel({ next: true });
    dispatch({
      type: 'documentManagement/setEditConfirmationVisibility',
      payload: {
        editConfirmationVisibility: true,
      },
    });
  };

  const submitUploadDocuments = () => {
    dispatch({
      type: 'documentManagement/submitUpdateDocument',
      payload: {
        fileName,
      },
    });
  };

  const confirmationCancel = () => {
    dispatch({
      type: 'documentManagement/setEditConfirmationVisibility',
      payload: {
        editConfirmationVisibility: false,
      },
    });
    dispatch({
      type: 'documentManagement/removeEditFile',
    });
  };
  const setEditUploadedVisibility = () => {
    dispatch({
      type: 'documentManagement/setEditUploadedVisibility',
      payload: {
        editUploadedVisibility: false,
      },
    });
  };

  return (
    <div>
      <Modal
        closable={false}
        centered
        visible={editVisit}
        title={
          <span className={styles.modalTitle}>
            <Icon className={styles.icon} component={EditDocument} />
            <span> {formatMessageApi({ Label_COM_Opus: 'editDocument' })}</span>
          </span>
        }
        onOk={handleOk}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="Cancel" className="ant-btn-cancel-button" onClick={() => handleCancel()}>
            {formatMessageApi({ Label_COM_Opus: 'cancel' })}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {formatMessageApi({
              Label_BPM_Button: 'save',
            })}
          </Button>,
        ]}
        width={800}
        className={styles.modalWarp}
      >
        <div className={styles.fileEdit}>
          <div className={classNames(styles.filedName)}>
            <Icon component={Filed} />
            <span>{fileName}</span>
          </div>
        </div>
        <EditSetion />
      </Modal>
      <Modal
        closable={false}
        centered
        visible={editConfirmationVisibility}
        title={
          <span className={styles.modalTitle}>
            <Icon component={ConfirmationIcon} />
            <span>
              {formatMessageApi({
                Label_COM_Opus: 'confirmation',
              })}
            </span>
          </span>
        }
        onOk={submitUploadDocuments}
        onCancel={confirmationCancel}
        footer={[
          <Button key="Cancel" className="ant-btn-cancel-button" onClick={confirmationCancel}>
            {formatMessageApi({
              Label_COM_Opus: 'cancel',
            })}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={submitUploadDocuments}
            loading={loadingParam}
          >
            {formatMessageApi({
              Label_BPM_Button: 'Confirm',
            })}
          </Button>,
        ]}
      >
        <div className={styles.modalText}>
          {formatMessageApi({
            Label_COM_WarningMessage: 'MSG_001089',
          })}
        </div>
      </Modal>
      <Modal
        closable={false}
        centered
        visible={editUploadedVisibility}
        title={
          <span className={styles.modalTitle}>
            <Icon component={Uploaded} />
            {formatMessageApi({
              Label_COM_Opus: 'Success',
            })}
          </span>
        }
        footer={[
          <Button key="submit" type="primary" onClick={setEditUploadedVisibility}>
            {formatMessageApi({ Label_BPM_Button: 'Close' })}
          </Button>,
        ]}
      >
        {/* <div className={styles.modalText}></div> */}
        <div className={styles.modalText}>
          {formatMessageApi({
            Label_COM_WarningMessage: 'MSG_001090',
          })}
        </div>
      </Modal>
    </div>
  );
};
