import React, { useState } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetUWMeResult from 'process/NB/ManualUnderwriting/_hooks/useGetUWMeResult';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from './index.less';

const GetUWMeResult = () => {
  const [reTryLoading, setReTryLoading] = useState(false);
  const failCloseEnquiry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.failCloseEnquiry,
    shallowEqual
  );
  const handleRetryAutoUnderwriting = useGetUWMeResult({
    setLoading: setReTryLoading,
  });
  return (
    <>
      {
        <Button
          className={styles.element}
          disabled={reTryLoading}
          onClick={handleRetryAutoUnderwriting}
          loading={reTryLoading}
        >
          {failCloseEnquiry === 'Y' && (
            <div className={styles.reBtnFlag}>
              <Tooltip
                overlayClassName={styles.reBtnFlagTooltip}
                title={formatMessageApi({
                  Label_COM_WarningMessage: 'MSG_000689',
                })}
              >
                <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
              </Tooltip>
            </div>
          )}
          {formatMessageApi({
            Label_BPM_Button: 'GetUWMeResult',
          })}
        </Button>
      }
    </>
  );
};

GetUWMeResult.displayName = 'getUWMeResult';

export default GetUWMeResult;
