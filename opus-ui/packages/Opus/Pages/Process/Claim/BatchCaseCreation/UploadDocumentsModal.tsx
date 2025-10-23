import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { tenant } from '@/components/Tenant';
import { UploadWarpModal } from 'opus/Components/Modals';
import { EErrorResCodes } from 'opus/Enums';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/activity.config';
import { handleMessageModal } from '@/utils/commonMessage';
import { validateResErrorTypeError } from '@/utils/utils';
import { uploadUrl, limitFileSize } from './configs';
import UploadSetion from './uploadSetion';
import { compressImageFile } from 'opus/Utils/compressImagesFile';

const UploadDocumentsModal = () => {
  const dispatch = useDispatch();

  const { visible, uploadFiles, loading, compressedConfig } = useSelector(
    ({ [NAMESPACE]: modelnamespace, loading: loadingFunc }: any) => ({
      visible: modelnamespace?.uploadDocumentsModal?.visible,
      uploadFiles: modelnamespace?.uploadDocumentsModal?.uploadFiles,
      loading: loadingFunc.effects[`${NAMESPACE}/updateUploadDocumentsModalUploadFiles`],
      compressedConfig: modelnamespace?.uploadDocumentsModal?.compressedConfig,
    }),
    shallowEqual
  );

  const { quality, maxWidth, enableCompress } = compressedConfig;

  const configures = {
    accept: '.xls, .xlsx',
    multiple: true,
    action: uploadUrl,
    disabled: lodash.size(uploadFiles),
    showUploadList: false,
    headers: {
      'Accept-Language': tenant.getRemoteLang(),
    },
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
              docId: resultData,
            },
          },
        });
      }
    },
  };

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/uploadDocumentsVisible`,
    });
    dispatch({
      type: `${NAMESPACE}/initUploadDocumentsModalUploadFiles`,
    });
  };

  const handleOk = async () => {
    const response = (await dispatch({
      type: `${NAMESPACE}/getBatchCreateCaseSubmit`,
    })) as any;

    if (response?.success) {
      handleCancel();

      dispatch({
        type: `${NAMESPACE}/sucessModalVisible`,
      });
    }

    if (!response?.success) {
      dispatch({
        type: `${NAMESPACE}/uploadDocumentsVisible`,
      });

      if (response?.errorMsgMap) {
        dispatch({
          type: `${NAMESPACE}/confirmationModalVisible`,
        });
      }

      if (response?.message) {
        dispatch({
          type: `${NAMESPACE}/errorModalVisible`,
        });
      }
    }
  };

  return (
    <UploadWarpModal
      uploadWarpConfigures={configures}
      uploadVisible={visible}
      handleCancel={handleCancel}
      handleOk={handleOk}
      uploadFiles={uploadFiles}
      loading={loading}
      brightBorderCancel={true}
    >
      {lodash.map(uploadFiles, (uploadFile: any, index: number) => (
        <UploadSetion uploadFile={uploadFile} key={`${uploadFile?.id}-${index}`} />
      ))}
    </UploadWarpModal>
  );
};

export default UploadDocumentsModal;
