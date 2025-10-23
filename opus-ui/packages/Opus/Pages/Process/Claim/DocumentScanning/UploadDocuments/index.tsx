import React, { useState } from 'react';
import { UploadWarpModal } from 'opus/Components/Modals';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { uploadUrl, limitFileSize } from './configs';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { EErrorResCodes } from 'opus/Enums';
import { validateResErrorTypeError } from '@/utils/utils';
import { handleMessageModal } from '@/utils/commonMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DocumentScanning/activity.config';
import UploadSetion from './uploadSetion';
import { formUtils } from 'basic/components/Form';
import { compressImageFile } from 'opus/Utils/compressImagesFile';

const UploadDocuments = () => {
  const dispatch = useDispatch();
  const {
    visible,
    uploadFiles,
    forms,
    type,
    ocrResultList,
    loading,
    taskId,
    caseNo,
    caseCategory,
    inquiryBusinessNo,
    businessNo,
    activityKey,
    requestId,
    compressedConfig,
  } = useSelector(
    ({
      [NAMESPACE]: modelnamespace,
      formCommonController,
      loading: loadingFunc,
      processTask,
    }: any) => ({
      visible: modelnamespace?.uploadDocumentsModal?.visible,
      uploadFiles: modelnamespace?.uploadDocumentsModal?.uploadFiles,
      forms: formCommonController.forms,
      type: modelnamespace?.uploadDocumentsModal?.type,
      ocrResultList: modelnamespace?.uploadDocumentsModal?.ocrResultList,
      loading: loadingFunc.effects[`${NAMESPACE}/getOCRResult`],
      taskId: processTask?.getTask?.taskId,
      caseNo: processTask?.getTask?.caseNo,
      caseCategory: processTask?.getTask?.caseCategory,
      inquiryBusinessNo: processTask?.getTask?.inquiryBusinessNo,
      businessNo: processTask?.getTask?.businessNo,
      activityKey: processTask?.getTask?.activityKey,
      requestId: modelnamespace?.uploadDocumentsModal?.ocrRequestId,
      compressedConfig: modelnamespace?.uploadDocumentsModal?.compressedConfig,
    }),
    shallowEqual
  );
  const { quality, maxWidth, enableCompress } = compressedConfig;

  const [fileList, setFileList] = useState([]);

  const configures = {
    multiple: true,
    action: uploadUrl,
    showUploadList: false,
    headers: {
      'Accept-Language': tenant.getRemoteLang(),
    },
    fileList,
    // data(file: any) {},
    beforeUpload: async (file: any) => {
      const id = uuidv4();
      const compressedFile =
        enableCompress && file.type.startsWith('image/')
          ? await compressImageFile(file, quality, maxWidth)
          : file;
      const uploadable = compressedFile.size <= limitFileSize ? compressedFile : false;

      dispatch({
        type: `${NAMESPACE}/addUploadDocumentsModalUploadFiles`,
        payload: {
          addUploadFiles: [
            {
              name: file?.name,
              files: compressedFile,
              id,
              image: uploadable ? '' : EErrorResCodes.uploadFailed,
            },
          ],
        },
      });

      lodash.set(compressedFile, 'id', id);

      setFileList((old) => {
        return [...old, compressedFile];
      });

      return uploadable;
    },
    onChange({ file }: any) {
      const { status, response } = file;
      if (!response) return;

      if (validateResErrorTypeError(response)) {
        dispatch({
          type: `${NAMESPACE}/removeUploadDocumentsModalUploadFiles`,
          payload: {
            id: file?.id,
          },
        });

        handleMessageModal(response?.promptMessages);
        return;
      }

      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

      if (status === 'done' && success && resultData) {
        dispatch({
          type: `${NAMESPACE}/updateUploadDocumentsModalUploadFiles`,
          payload: {
            id: file?.id,
            updateData: {
              fileId: resultData,
              receivedDate: moment().format(),
            },
          },
        });
      }
    },
  };

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/initUploadDocumentsModalUploadFiles`,
    });

    dispatch({
      type: `${NAMESPACE}/uploadDocumentsVisible`,
    });
  };

  const handleCancelOCR = () => {
    dispatch({
      type: `${NAMESPACE}/cancelOCRRequest`,
      payload: {
        requestId,
      },
    });
  };

  const from_UploadDocuments = lodash.reduce(
    forms,
    (result, value, key) => {
      return key.endsWith('_DocumentScanning_UploadDocuments')
        ? { ...result, [key]: value }
        : result;
    },
    {}
  );

  const validateForms = async (rawData: any) => {
    return await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(rawData),
      force: true,
    });
  };

  const handleOk = async () => {
    const errors = await validateForms(from_UploadDocuments);
    if (lodash.size(errors)) return;

    dispatch({
      type: `${NAMESPACE}/saveClaimProcessDataUploadFiles`,
      payload: {
        uploadFiles,
        ocrResultList,
      },
    });

    handleCancel();
  };

  const showOCRButton = type === 'NewRequest' || type === 'NewRequestClaimPackReturn';
  const filesForOCR = uploadFiles.filter(
    ({ fileId }) => !ocrResultList?.some((result) => result.success && result.docDataId === fileId)
  );

  return (
    <UploadWarpModal
      uploadWarpConfigures={configures}
      uploadVisible={visible}
      showOCRButton={showOCRButton}
      disableOCR={!filesForOCR.length}
      handleOCR={() => {
        dispatch({
          type: `${NAMESPACE}/getOCRResult`,
          payload: {
            taskId,
            filesForOCR,
            caseCategory,
            caseNo,
            inquiryBusinessNo,
            businessNo,
            activityKey,
          },
        });
      }}
      handleCancel={handleCancel}
      handleOk={handleOk}
      uploadFiles={uploadFiles}
      handleCancelOCR={handleCancelOCR}
      loading={loading}
    >
      {lodash.map(uploadFiles, (uploadFile: any, index: number) => (
        <UploadSetion
          uploadFile={uploadFile}
          key={`${uploadFile?.id}-${index}`}
          ocrResultList={ocrResultList?.find(({ docDataId }) => docDataId === uploadFile.fileId)}
        />
      ))}
    </UploadWarpModal>
  );
};

export default UploadDocuments;
