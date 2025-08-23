import React, { useState, useRef } from 'react';
import { Form, Button, Icon, Upload } from 'antd';
import styles from '../index.less';
import { upload, execute, getExecuteResult } from '@/services/ccSupportToolControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import lodash from 'lodash';
import classnames from 'classnames';
import Result from './Result';
import delay from '@/utils/delay';
import getFileResult from 'sql/utils/getFileResult';
import { tenant } from '@/components/Tenant';
import { LS, LSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const statusObj = {
  validating: { type: 'Validating', status: 'inprogress' },
  validateSuccess: { type: 'Validate File', status: 'success' },
  validateFail: {
    type: 'Validate File',
    status: 'fail',
    failMessage: 'The file has been executed, please check.',
  },
  executing: { type: 'Executing File', status: 'inprogress' },
  executeSuccess: { type: 'Execute File', status: 'success', fileName: '111111.txt' },
  executeFail: {
    type: 'Execute File',
    status: 'fail',
    failMessage: 'The file has been executed, please check.',
  },
};

function ExecuteFile({ form, setAutoSearch, isExpand }) {
  const [file, setFile] = useState(null);
  const [executeLoading, setExecuteLoading] = useState(false);
  const [execList, setExecList] = useState<
    { type: string; status: string; failMessage?: string; fileName?: string }[]
  >([]);
  const [executeId, setExecuteId] = useState(null);
  const uploadRef = useRef(null);
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '');

  const handleUpload = () => {
    uploadRef.current.buttonNode.click();
  };

  const deleteFile = () => {
    setFile(null);
    setExecuteId(null);
  };

  async function touchResult({ touchId, resolve }) {
    for (;;) {
      const response = await getExecuteResult({ batchId: touchId });
      if (!response?.success) {
        const { warnData } = response;
        if (response.warnData?.['x-error-nonce']) {
          handleMessageModal(response?.promptMessages);
          resolve({ success: false });
          return;
        }

        resolve(response);
        return;
      }

      if (response?.success && response?.resultData?.status !== 'inProgress') {
        resolve(response);
        return;
      }
      await delay(2000);
    }
  }

  const handleExecute = async () => {
    if (executeLoading || !executeId) return;
    setExecuteLoading(true);
    const touchResponse = await execute({ batchId: executeId });
    if (touchResponse?.success && touchResponse?.resultData?.status === 'success') {
      setExecList([statusObj.validateSuccess, statusObj.executing]);
      const asyncResult = await new Promise((resolve) => {
        touchResult({ touchId: executeId, resolve }).then(resolve);
      });
      if (asyncResult?.success && asyncResult?.resultData?.status === 'success') {
        setExecList([
          statusObj.validateSuccess,
          { ...statusObj.executeSuccess, fileName: file.name },
          ...(asyncResult?.resultData?.resultList || []),
        ]);
      } else {
        setExecList([
          statusObj.validateSuccess,
          {
            ...statusObj.executeFail,
            failMessage: asyncResult?.resultData?.failMessage || 'error',
          },
        ]);
      }
      setExecuteId(null);
      setExecuteLoading(false);
      setAutoSearch((e) => !e);
      return;
    }
    setExecList([
      statusObj.validateSuccess,
      { ...statusObj.executeFail, failMessage: touchResponse?.resultData?.failMessage || 'error' },
    ]);
    setAutoSearch((e) => !e);
    setExecuteLoading(false);
  };

  const handleUploadSQL = async ({ file }: any) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['sql', 'txt'].includes(fileExtension)) {
      setExecList([
        {
          ...statusObj.validateFail,
          failMessage: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001291' }),
          fileName: file.name,
        },
      ]);
      return false;
    }

    setFile(file);

    const base64Name = btoa(file.name);
    const base64File = await getFileResult(file.originFileObj, 'base64');
    setExecList([statusObj.validating]);
    const uploadResult = await upload({
      fileName: base64Name,
      regionCode: tenant.region(),
      userId: userId,
      sqlBase64: base64File.split(',')[1],
    });
    if (uploadResult?.success && uploadResult?.resultData?.status === 'success') {
      setExecList([statusObj.validateSuccess]);
      setExecuteId(uploadResult?.resultData?.batchId);
      return;
    }
    setExecList([
      { ...statusObj.validateFail, failMessage: uploadResult?.resultData?.failMessage || 'error' },
    ]);
  };

  const props = {
    name: 'file',
    multiple: false,
    accept: '.sql,.txt',
    disabled: !lodash.isEmpty(file),
    onChange: handleUploadSQL,
    fileList: [],
  };

  return (
    <div className={classnames(styles.executeFileBox, isExpand && styles.w49)}>
      <div className={styles.executeFileActionBox}>
        <Icon
          type="file-text"
          onClick={handleUpload}
          className={classnames(styles.fileIcon, { [styles.cp]: !file })}
        />
        <div onClick={handleUpload} className={classnames(styles.fileName, { [styles.cp]: !file })}>
          <span className={classnames(styles.fileNameText, { [styles.uploadTip]: !file })}>
            {file?.name || 'select file...'}
          </span>
          {file && (
            <Icon
              onClick={deleteFile}
              className={classnames(styles.deleteIcon, styles.cp)}
              type="delete"
            />
          )}
        </div>
        <Button
          type="primary"
          className={classnames(styles.execute, {
            [styles.executeDisabled]: executeLoading || !executeId,
          })}
          onClick={handleExecute}
        >
          Execute
        </Button>
      </div>

      <Upload {...props} style={{ display: 'none' }}>
        <Button style={{ display: 'none' }} ref={uploadRef}></Button>
      </Upload>
      <Result isExpand={isExpand} execList={execList} />
    </div>
  );
}
export default Form.create()(ExecuteFile);
