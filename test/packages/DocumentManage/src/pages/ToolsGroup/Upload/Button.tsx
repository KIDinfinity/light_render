import type { FunctionComponent } from 'react';
import React from 'react';
import { Upload, Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import cache from '@/utils/cache';
import classNames from 'classnames';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { tenant } from '@/components/Tenant';
import { getLoginPath } from '@/utils/loginUtils';
import { handleMessageModal } from '@/utils/commonMessage';
import { validateResErrorTypeError } from '@/utils/utils';
import { EErrorResCodes } from '../../_dto/enums';
import { uploadUrl, limitFileSize } from './configs';
import { compressImageFile } from 'documentManage/pages/_functions/compressImagesFile';

import styles from './styles.less';

const UploadButton: FunctionComponent<any> = (props: any = {}) => {
  const dispatch = useDispatch();
  const { tooldata, className } = props;

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
    showUploadList: false,
    fileList: lodash.map(uploadFiles, (uploadFile: any) => uploadFile.file),
    action: uploadUrl,
    headers: {
      'Accept-Language': tenant.getRemoteLang(),
    },
    data(file: any) {
      const { fileId } = file;
      return {
        caseNo: processInstanceId,
        claimNo: businessNo,
        fileId,
      };
    },
    beforeUpload: async (file: any) => {
      const fileId = uuid();
      const compressedFile =
        enableCompress && file.type.startsWith('image/')
          ? await compressImageFile(file, quality, maxWidth)
          : file;
      const uploadable = compressedFile.size <= limitFileSize ? compressedFile : false;

      dispatch({
        type: 'documentManagement/saveUploadStatus',
        payload: {
          uploading: true,
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
        payload: {
          files: compressedFile,
          fileId,
          image: uploadable ? '' : EErrorResCodes.uploadFailed,
        },
      });
      dispatch({
        type: 'documentManagement/updateUploadFiles',
        payload: { fileId },
      });
      lodash.set(compressedFile, 'fileId', fileId);
      return uploadable;
    },
    onChange({ file, fileList }: any) {
      const { status, response } = file;

      if (!response) return;

      if (file?.error?.status === 401) {
        cache.clear();
        window.location.href = getLoginPath();
        return;
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

      // 上传第一份文件开始则展示upload file 的编辑组件
      if (!tooldata.selected) {
        dispatch({
          type: 'documentManagement/selectToolItem',
          payload: tooldata,
        });
      }

      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

      if (lodash.toLower(status) === 'done' && success && resultData) {
        (async () => {
          const res = await dispatch({
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
          if (res?.success) {
            dispatch({
              type: 'documentManagement/supplementNodeIds',
              payload: lodash.merge(resultData, res.resultData),
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
    <Upload {...configures}>
      <Button icon="upload" {...props} className={classNames(styles.uploadButton, className)} />
    </Upload>
  );
};

export default UploadButton;
