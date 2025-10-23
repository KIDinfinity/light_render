import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'dva';
import { Button } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { withContextData } from '@/components/_store';
import { messageModal } from '@/utils/commonMessage';
import type { UploadFileModel, ToolsRenderDataModel, StateModel } from '../../_dto/model';
import { EToolModules, EErrorResCodes } from '../../_dto/enums';
import type { IFile } from './File';
import File from './File';
import UploadButton from './Button';
import UploadDragger from './Dragger';

import styles from './styles.less';

interface IProps {
  uploadFiles?: UploadFileModel[];
  withData?: any;
  loading?: boolean;
}

export interface IUpload extends FunctionComponent<IProps> {
  File?: FunctionComponent<IFile>;
  Button?: any;
  Dragger?: any;
  toolsRenderData?: ToolsRenderDataModel | ToolsRenderDataModel[];
}

const Upload: IUpload = ({ withData, loading }) => {
  const dispatch = useDispatch();
  const { uploadFiles, uploading }: StateModel = useSelector(({ documentManagement }: any) => ({
    uploadFiles: documentManagement.uploadFiles,
    uploading: documentManagement.uploading,
  }));

  useEffect(() => {
    const { handleScrollTop } = withData;
    if (lodash.isFunction(handleScrollTop)) {
      handleScrollTop();
    }
    return () => {};
  }, [uploading]);

  const handleCancel = () => {
    dispatch({
      type: 'documentManagement/removeUploadedFile',
      payload: {
        uploadFiles,
        all: true,
      },
    });
  };

  const handleUpload = async () => {
    const errors: any = await dispatch({
      type: 'documentManagement/validateFields',
    });

    const fileErrors: any[] = lodash
      .chain(uploadFiles)
      .filter((file: UploadFileModel) => file.image === EErrorResCodes.uploadFailed)
      .map((file: UploadFileModel) => file.fileId)
      .compact()
      .value();

    if (uploading || fileErrors.length) {
      messageModal({
        code: 'ERR_000285',
        typeCode: 'Label_COM_WarningMessage',
        dictCode: 'ERR_000285',
      });
      return;
    }

    if (!uploading && lodash.isArray(errors) && !errors.length && !fileErrors.length) {
      dispatch({
        type: 'documentManagement/submitUploadDocuments',
      });
    }
  };

  return (
    <div className={styles.documentUpload}>
      <div className={styles.uploadTitle}>
        {formatMessageApi({ Label_BIZ_Claim: 'document.label.upoad-file' })}
      </div>
      <div className={styles.uploadFiles}>
        {lodash.map(uploadFiles, (uploadFile: UploadFileModel, index: number) => (
          <File uploadFile={uploadFile} key={`${uploadFile.fileId}-${index}`} />
        ))}
      </div>
      <div className={styles.uploadBtnWrap}>
        <Button
          className={classNames(styles.button, styles.cancel)}
          disabled={loading}
          type="primary"
          onClick={handleCancel}
        >
          {formatMessageApi({ Label_BPM_Button: 'document.label.cancel' })}
        </Button>
        <Button
          className={classNames(styles.button)}
          loading={loading}
          type="primary"
          onClick={handleUpload}
        >
          {formatMessageApi({ Label_BPM_Button: 'document.label.upoad' })}
        </Button>
      </div>
    </div>
  );
};

// @ts-ignore
Upload.File = File;

Upload.Button = UploadButton;

Upload.Dragger = UploadDragger;

// 定义注册到Tools组件的数据
Upload.toolsRenderData = {
  toolId: EToolModules.upload,
  replacer: UploadButton,
  hold: true,
};

export default connect(({ loading }: any) => ({
  loading: loading.effects['documentManagement/submitUploadDocuments'],
}))(withContextData(Upload));
