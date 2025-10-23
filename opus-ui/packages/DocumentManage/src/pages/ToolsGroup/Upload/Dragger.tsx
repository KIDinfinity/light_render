import type { FunctionComponent, CSSProperties } from 'react';
import React from 'react';
import { Upload } from 'antd';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { tenant } from '@/components/Tenant';
import { handleMessageModal } from '@/utils/commonMessage';
import { validateResErrorTypeError } from '@/utils/utils';
import { EErrorResCodes } from '../../_dto/enums';
import { uploadUrl, limitFileSize } from './configs';

const { Dragger } = Upload;

interface IProps {
  className?: string;
  style?: CSSProperties;
  tooldata?: any;
}

const UploadDragger: FunctionComponent<IProps> = ({ children, ...res }: any) => {
  const dispatch = useDispatch();
  const { tooldata } = res;
  const { uploadFiles, caseInfo } = useSelector(({ documentManagement }: any) => ({
    uploadFiles: documentManagement.uploadFiles,
    caseInfo: documentManagement.caseInfo,
  }));

  const { businessNo, processInstanceId } = caseInfo || {};

  const configures = {
    multiple: true,
    showUploadList: false,
    openFileDialogOnClick: false,
    action: uploadUrl,
    headers: {
      'Accept-Language': tenant.getRemoteLang(),
    },
    fileList: lodash.map(uploadFiles, (uploadFile: any) => uploadFile.file),
    data(file: any) {
      const { fileId } = file;
      return {
        caseNo: processInstanceId,
        claimNo: businessNo,
        fileId,
      };
    },
    beforeUpload(file: any) {
      const fileId = uuidv4();
      const uploadable = file.size <= limitFileSize;

      dispatch({
        type: 'documentManagement/updateDragStatus',
        payload: {
          dragging: false,
        },
      });
      dispatch({
        type: 'documentManagement/saveUploadStatus',
        payload: {
          uploading: true,
        },
      });

      // 初始化upload files 数据
      dispatch({
        type: 'documentManagement/saveUploadFiles',
        payload: { files: file, fileId, image: uploadable ? '' : EErrorResCodes.uploadFailed },
      });
      dispatch({
        type: 'documentManagement/updateUploadFiles',
        payload: { fileId },
      });
      lodash.set(file, 'fileId', fileId);

      return uploadable;
    },
    onChange({ file, fileList }: any) {
      const { status, response } = file;
      if (!response) return;

      // 上传第一份文件开始则展示upload file 的编辑组件
      if (!tooldata.selected) {
        dispatch({
          type: 'documentManagement/selectToolItem',
          payload: tooldata,
        });
      }

      if (validateResErrorTypeError(response)) {
        dispatch({
          type: 'documentManagement/removeUploadFiles',
          payload: {
            fileId: file.fileId,
          },
        });
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
            dispatch({
              type: 'documentManagement/supplementNodeIds',
              payload: resultData,
            });
          }
          dispatch({
            type: 'documentManagement/saveUploadStatus',
            payload: {
              uploading: false,
            },
          });
        })();
      }
    },
  };

  return (
    <Dragger {...configures} {...res}>
      {children}
    </Dragger>
  );
};

export default UploadDragger;
