import React, { useMemo, useState, useEffect } from 'react';
import lodash from 'lodash';
import { Form, Input, Tooltip, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import styles from './CaseSearch.less';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';

const CaseSearch = (props: any) => {
  const {
    remoteProcessInstanceId,
    localProcessInstanceId,
    setLocalProcessInstanceId,
    setEnableGetDetial,
    getFindBizProcessDataStatus,
    enableGetDetial,
  } = props;
  const [value, setValue] = useState<string>('');
  const msgInfo = useMemo(() => {
    return formatMessageApi({
      Label_COM_Message: 'MSG_001299',
    });
  }, []);
  const handleChange = async (e: any, onBlur: boolean) => {
    const newValue = onBlur ? lodash.trim(e.target?.value) : e.target?.value;
    setEnableGetDetial(false);
    setValue(newValue);
  };

  const handleBlur = () => {
    setLocalProcessInstanceId(value);
    setEnableGetDetial(true);
  };

  useEffect(() => {
    if (localProcessInstanceId) {
      setValue(localProcessInstanceId);
    } else if (remoteProcessInstanceId) {
      setValue(remoteProcessInstanceId);
    }
  }, [localProcessInstanceId, remoteProcessInstanceId]);
  const errMsgStatus = useMemo(() => {
    if (!getFindBizProcessDataStatus && enableGetDetial && localProcessInstanceId) {
      return true;
    } else {
      return false;
    }
  }, [getFindBizProcessDataStatus, enableGetDetial, localProcessInstanceId]);
  return useMemo(
    () => (
      <div className={styles.caseSearch}>
        {errMsgStatus && (
          <Tooltip title={msgInfo} className={styles.errMsg}>
            <Icon component={ErrorSvg} />
          </Tooltip>
        )}
        <Form layout="vertical">
          <Form.Item
            label={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
            })}
          >
            <Input
              name="caseNo"
              value={value}
              autoComplete="disable-chrome-autofill-mark"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
        </Form>
      </div>
    ),
    [
      value,
      getFindBizProcessDataStatus,
      enableGetDetial,
      remoteProcessInstanceId,
      localProcessInstanceId,
    ]
  );
};

export default () => (
  <CaseTaskDetail.Pending.Consumer>
    <CaseSearch />
  </CaseTaskDetail.Pending.Consumer>
);
