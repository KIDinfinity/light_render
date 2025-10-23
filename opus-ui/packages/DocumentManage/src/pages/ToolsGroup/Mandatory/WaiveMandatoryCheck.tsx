import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Checkbox, Input, Button } from 'antd';
import styles from './styles.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const dispatch = useDispatch();
  const {
    docMandatoryChecking,
    caseInfo,
    submitDocMandatoryCheckingLoading,
    deleteDocMandatoryCheckingLoading,
  } = useSelector(({ documentManagement, loading }: any) => ({
    docMandatoryChecking: documentManagement.docMandatoryChecking,
    caseInfo: documentManagement.caseInfo,
    submitDocMandatoryCheckingLoading:
      loading.effects['documentManagement/submitDocMandatoryChecking'],
    deleteDocMandatoryCheckingLoading:
      loading.effects['documentManagement/deleteDocMandatoryChecking'],
  }));

  const [showButton, setShowButton] = useState(false);
  const [reason, setReason] = useState('');

  const onChange = (e) => {
    const { checked } = e.target;
    setShowButton(false);
    dispatch({
      type: `documentManagement/${
        checked ? 'submitDocMandatoryChecking' : 'deleteDocMandatoryChecking'
      }`,
      payload: { caseNo: caseInfo?.processInstanceId },
    });
  };

  const onfocus = () => {
    setShowButton(true);
  };

  const cancel = () => {
    setShowButton(false);
    setReason(docMandatoryChecking.reason);
  };

  const save = () => {
    setShowButton(false);
    dispatch({
      type: 'documentManagement/submitDocMandatoryChecking',
      payload: { caseNo: caseInfo?.processInstanceId, reason },
    });
  };

  const changeReason = (e) => {
    setReason(e.target.value);
  };

  useEffect(() => {
    setReason(docMandatoryChecking.reason);
  }, [docMandatoryChecking]);

  return (
    <div className={styles.waiveMandatory}>
      <Checkbox
        onChange={onChange}
        checked={docMandatoryChecking.checked}
        disabled={submitDocMandatoryCheckingLoading || deleteDocMandatoryCheckingLoading}
      >
        {formatMessageApi({
          Label_COM_Document: 'WaiveMandatoryDocumentChecking',
        })}
      </Checkbox>
      <div className={styles.waiveReason}>
        <Input
          placeholder={formatMessageApi({
            Label_COM_Document: 'InputWaiveReason',
          })}
          onFocus={onfocus}
          disabled={!docMandatoryChecking.checked}
          value={reason}
          onChange={changeReason}
        />
        {showButton && (
          <div className={styles.waiveButtons}>
            <Button type="primary" icon="check" size="small" onClick={save} />
            <Button
              type="primary"
              icon="close"
              size="small"
              onClick={cancel}
              className={styles.waiveRightButton}
            />
          </div>
        )}
      </div>
    </div>
  );
};
