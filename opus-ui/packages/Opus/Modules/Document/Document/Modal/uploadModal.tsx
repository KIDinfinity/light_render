import React from 'react';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button, Icon, Modal, Upload } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { tenant } from '@/components/Tenant';
import { validateResErrorTypeError } from '@/utils/utils';
import { ReactComponent as UploadIcon } from '../../_static/icon-Upload.svg';
import { ReactComponent as ConfirmationIcon } from 'opus/Assets/icon-modal-confirm.svg';
import { ReactComponent as Uploaded } from 'opus/Assets/icon-success-circle.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleMessageModal } from '@/utils/commonMessage';
import { EErrorResCodes } from '../../_dto/enums';
import { uploadUrl, limitFileSize } from './configs';
import UploadSetion from './uploadSetion';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';
import { compressImageFile } from 'opus/Utils/compressImagesFile';

const { Dragger } = Upload;

const UploadWarp = () => {
  const dispatch = useDispatch();
  const { uploadFiles, caseInfo, compressedConfig } = useSelector(
    ({ documentManagement }: any) => ({
      uploadFiles: documentManagement.uploadFiles,
      caseInfo: documentManagement.caseInfo,
      compressedConfig: documentManagement.compressedConfig,
    })
  );
  const { businessNo, processInstanceId } = caseInfo || {};
  const { quality, maxWidth, enableCompress } = compressedConfig;

  const configures = {
    multiple: true,
    action: uploadUrl,
    showUploadList: false,
    headers: { 'Accept-Language': tenant.getRemoteLang() },
    fileList: lodash.map(uploadFiles, (uploadFile: any) => uploadFile.file),
    data(file: any) {
      const { fileId } = file;
      return { caseNo: processInstanceId, claimNo: businessNo, fileId };
    },
    beforeUpload: async (file: any) => {
      const fileId = uuidv4();
      const compressedFile =
        enableCompress && file.type.startsWith('image/')
          ? await compressImageFile(file, quality, maxWidth)
          : file;
      const uploadable = compressedFile.size <= limitFileSize ? compressedFile : false;

      // dispatch({
      //   type: 'documentManagement/updateDragStatus',
      //   payload: {
      //     dragging: false,
      //   },
      // });
      // dispatch({
      //   type: 'documentManagement/saveUploadStatus',
      //   payload: {
      //     uploading: true,
      //   },
      // });

      // 初始化upload files 数据
      dispatch({
        type: 'documentManagement/saveUploadFiles',
        payload: {
          files: compressedFile,
          fileId,
          image: uploadable ? '' : EErrorResCodes.uploadFailed,
        },
      });
      dispatch({ type: 'documentManagement/updateUploadFiles', payload: { fileId } });
      lodash.set(compressedFile, 'fileId', fileId);

      return uploadable;
    },
    onChange({ file, fileList }: any) {
      const { status, response } = file;

      const uploadFilesStatus = lodash.reduce(
        fileList,
        (result, item) => {
          return {
            ...result,
            [item.fileId]: {
              status: item?.status,
              image: item?.response?.resultData?.[item.fileId],
            },
          };
        },
        {}
      );
      dispatch({ type: 'documentManagement/uploadFilesStatus', payload: { uploadFilesStatus } });

      if (!response) return;

      // 上传第一份文件开始则展示upload file 的编辑组件
      // if (!tooldata.selected) {
      //   dispatch({
      //     type: 'documentManagement/selectToolItem',
      //     payload: tooldata,
      //   });
      // }

      if (validateResErrorTypeError(response)) {
        // dispatch({
        //   type: 'documentManagement/removeUploadFiles',
        //   payload: { fileId: file.fileId },
        // });
        handleMessageModal(response?.promptMessages);
        return;
      }

      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

      if (status === 'done' && success && resultData) {
        (async () => {
          const uploadRes = await dispatch({
            type: 'documentManagement/uploadOCRDocumentData',
            payload: {
              file: lodash
                .chain(fileList)
                .find((item) => item.fileId === file.fileId)
                .value(),
              fileId: file.fileId,
              caseNo: processInstanceId,
              claimNo: businessNo,
            },
          });
          // 补全document information 里面的image数据
          if (uploadRes?.success) {
            dispatch({
              type: 'documentManagement/supplementNodeIds',
              payload: lodash.merge(resultData, uploadRes.resultData),
            });
          } else {
            dispatch({ type: 'documentManagement/supplementNodeIds', payload: resultData });
          }
          dispatch({ type: 'documentManagement/saveUploadStatus', payload: { uploading: false } });
        })();
      }
    },
  };
  return (
    <Dragger {...configures} className={styles.DraggerWarp}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">{formatMessageApi({ Label_COM_Opus: 'ClickOrDragFiles' })}</p>
    </Dragger>
  );
};

export default () => {
  const dispatch = useDispatch();

  const {
    uploadVisit,
    uploadFiles,
    uploadFilesStatus,
    confirmationVisibility,
    uploadedVisibility,
    forms,
    loadingParam,
  } = useSelector(({ documentManagement, formCommonController, loading }: any) => ({
    uploadVisit: documentManagement.uploadVisit,
    uploadFiles: documentManagement.uploadFiles,
    uploadFilesStatus: documentManagement.uploadFilesStatus,
    confirmationVisibility: documentManagement.confirmationVisibility,
    uploadedVisibility: documentManagement.uploadedVisibility,
    forms: formCommonController.forms,
    loadingParam: loading.effects['documentManagement/submitUploadDocuments'],
  }));
  const handleCancel = ({ next }: any = { next: false }) => {
    dispatch({ type: 'documentManagement/setUploadVisit', payload: { uploadVisit: false } });
    if (!next) {
      dispatch({ type: 'documentManagement/removeUploadFile' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const validateForms = async (forms: any) => {
    return await formUtils.validateFormsAndGetErrors({ forms: lodash.values(forms), force: true });
  };

  const from_UploadDocuments = lodash.reduce(
    forms,
    (result, value, key) => {
      return key.endsWith('_UploadDocuments') ? { ...result, [key]: value } : result;
    },
    {}
  );

  const handleOk = async () => {
    const errors = await validateForms(from_UploadDocuments);

    if (lodash.size(errors)) return;

    handleCancel({ next: true });
    dispatch({
      type: 'documentManagement/setConfirmationVisibility',
      payload: { confirmationVisibility: true },
    });
  };

  const submitUploadDocuments = () => {
    dispatch({ type: 'documentManagement/submitUploadDocuments' });
  };

  const confirmationCancel = () => {
    dispatch({
      type: 'documentManagement/setConfirmationVisibility',
      payload: { confirmationVisibility: false },
    });
    dispatch({ type: 'documentManagement/removeUploadFile' });
  };
  const setUploadedVisibility = () => {
    dispatch({
      type: 'documentManagement/setUploadedVisibility',
      payload: { uploadedVisibility: false },
    });
  };
  return (
    <div>
      <Modal
        closable={false}
        centered
        visible={uploadVisit}
        title={
          <span className={styles.modalTitle}>
            <Icon className={styles.icon} component={UploadIcon} />
            <span>{formatMessageApi({ Label_COM_Opus: 'UploadDocuments' })}</span>
          </span>
        }
        onOk={handleOk}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="Cancel" className="ant-btn-cancel-button" onClick={() => handleCancel()}>
            {formatMessageApi({ Label_COM_Opus: 'cancel' })}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={
              uploadFiles?.length === 0 ||
              !lodash.every(
                uploadFiles,
                (item) => item.image && item.image !== EErrorResCodes.uploadFailed
              )
            }
            loading={lodash.some(
              uploadFilesStatus,
              (item) => item.status !== 'done' && item.status !== 'error'
            )}
          >
            {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
          </Button>,
        ]}
        width={800}
        className={styles.modalWarp}
      >
        <UploadWarp />
        <div className={styles.uploadFiles}>
          {lodash.map(uploadFiles, (uploadFile: any, index: number) => (
            <UploadSetion
              uploadFile={uploadFile}
              uploadFilesStatus={uploadFilesStatus}
              key={`${uploadFile.fileId}-${index}`}
            />
          ))}
        </div>
      </Modal>
      <Modal
        closable={false}
        centered
        visible={confirmationVisibility}
        title={
          <span className={styles.modalTitle}>
            <Icon component={ConfirmationIcon} />
            <span>{formatMessageApi({ Label_COM_Opus: 'confirmation' })}</span>
          </span>
        }
        onOk={submitUploadDocuments}
        onCancel={confirmationCancel}
        footer={[
          <Button key="Cancel" onClick={confirmationCancel}>
            {formatMessageApi({ Label_COM_Opus: 'cancel' })}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={submitUploadDocuments}
            loading={loadingParam}
          >
            {formatMessageApi({ Label_BPM_Button: 'Confirm' })}
          </Button>,
        ]}
      >
        <div className={styles.modalText}>
          {formatMessageApi(
            { Label_COM_WarningMessage: 'MSG_001086' },
            `${uploadFiles?.length} ${uploadFiles?.length > 1 ? 'documents' : 'document'}`
          )}
        </div>
      </Modal>
      <Modal
        closable={false}
        centered
        visible={uploadedVisibility}
        title={
          <span className={styles.modalTitle}>
            <Icon component={Uploaded} />
            <span>{formatMessageApi({ Label_COM_Opus: 'Success' })}</span>
          </span>
        }
        footer={[
          <Button key="submit" type="primary" onClick={setUploadedVisibility}>
            {formatMessageApi({ Label_BPM_Button: 'Close' })}
          </Button>,
        ]}
      >
        <div className={styles.modalText}>
          {formatMessageApi({ Label_COM_WarningMessage: 'MSG_001087' })}
        </div>
      </Modal>
    </div>
  );
};
