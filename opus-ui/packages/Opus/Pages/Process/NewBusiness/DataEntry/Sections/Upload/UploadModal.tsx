import React from 'react';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button, Icon, Modal, Upload } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { tenant } from '@/components/Tenant';
import { validateResErrorTypeError } from '@/utils/utils';
import { ReactComponent as UploadIcon } from 'packages/Opus/Modules/Document/_static/icon-Upload.svg';
import { ReactComponent as Uploaded } from 'opus/Assets/icon-success-circle.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleMessageModal } from '@/utils/commonMessage';
import { EErrorResCodes } from 'packages/Opus/Modules/Document/_dto/enums';
//import { uploadUrl, limitFileSize } from 'packages/Opus/Modules/Document/Document/Modal/configs';
import { uploadUrl, limitFileSize } from './configs';
import UploadSetion from './UploadSetion';
import styles from 'packages/Opus/Modules/Document/Document/Modal/index.less';
import { formUtils } from 'basic/components/Form';
import { compressImageFile } from 'opus/Utils/compressImagesFile';
import { NAMESPACE } from '../../activity.config';

const { Dragger } = Upload;

const UploadWarp = () => {
  const dispatch = useDispatch();

  const { uploadFiles, compressedConfig, processTask } = useSelector(
    ({ dataEntry, processTask }: any) => ({
      uploadFiles: dataEntry.uploadFiles,
      //caseInfo: processTask.gettask.caseInfo,
      caseInfo: dataEntry.caseInfo,
      compressedConfig: dataEntry.compressedConfig,
      processTask,
    })
  );
  //const { businessNo, processInstanceId } = caseInfo || {};
  const businessNo = processTask.getTask.businessNo;
  const processInstanceId = processTask.getTask.processInstanceId;
  const { quality, maxWidth, enableCompress } = compressedConfig || {};

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
      // 初始化upload files 数据
      dispatch({
        type: `${NAMESPACE}/saveUploadFiles`,
        payload: {
          files: compressedFile,
          fileId,
          docDataId: uploadable ? '' : EErrorResCodes.uploadFailed,
        },
      });
      dispatch({ type: `${NAMESPACE}/updateUploadFiles`, payload: { fileId } });
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
              docDataId: item?.response?.resultData,
            },
          };
        },
        {}
      );

      dispatch({ type: `${NAMESPACE}/uploadFilesStatus`, payload: { uploadFilesStatus } });

      if (!response) return;

      if (validateResErrorTypeError(response)) {
        handleMessageModal(response?.promptMessages);
        return;
      }

      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

      if (status === 'done' && success && resultData) {
        (async () => {
          const uploadRes = await dispatch({
            type: `${NAMESPACE}/uploadOCRDocumentData`,
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
              type: `${NAMESPACE}/supplementNodeIds`,
              payload: {
                fileId: file.fileId,
                docDataId: resultData,
                ...(uploadRes.resultData || {}),
              },
            });
          } else {
            dispatch({
              type: `${NAMESPACE}/supplementNodeIds`,
              payload: { fileId: file.fileId, ...resultData },
            });
          }
          dispatch({ type: `${NAMESPACE}/saveUploadStatus`, payload: { uploading: false } });
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

  const { uploadVisit, uploadFiles, uploadFilesStatus, forms } = useSelector(
    ({ dataEntry, formCommonController, loading }: any) => ({
      uploadVisit: dataEntry.openModal,
      uploadFiles: dataEntry.uploadFiles,
      uploadFilesStatus: dataEntry.uploadFilesStatus,
      uploadedVisibility: dataEntry.uploadedVisibility,
      forms: formCommonController.forms,
      loadingParam: loading.effects[`${NAMESPACE}/submitUploadDocuments`],
    })
  );

  const handleCancel = ({ next }: any = { next: false }) => {
    dispatch({ type: `${NAMESPACE}/saveUploadModal`, payload: { onenModal: false } });
    if (!next) {
      dispatch({ type: `${NAMESPACE}/removeUploadFile` });
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

    handleCancel({ next: false });
    dispatch({
      type: `${NAMESPACE}/saveUploadDocList`,
      payload: { uploadFiles },
    });
  };

  // const submitUploadDocuments = () => {
  //   dispatch({ type: `${NAMESPACE}/submitUploadDocuments` });
  // };

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
                (item) => item.docDataId && item.docDataId !== EErrorResCodes.uploadFailed
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
    </div>
  );
};
