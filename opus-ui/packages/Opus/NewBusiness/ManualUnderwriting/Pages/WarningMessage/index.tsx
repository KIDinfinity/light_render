import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Alert } from 'antd';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';
import classnames from 'classnames';
import { useWarnMsgHoldPayment } from '../../_hooks';
import { ReactComponent as ErrorIcon } from './errorIcon.svg';
import useJudgeFundMakerWarningDisplay from 'opus/NewBusiness/ManualUnderwriting/_hooks/useJudgeFundMakerWarningDisplay';
import useLoadEscalateReasonDisplay from 'opus/NewBusiness/ManualUnderwriting/_hooks/useLoadEscalateReasonDisplay';
import styles from './index.less';

const WarningMessage = () => {
  useLoadEscalateReasonDisplay();
  const dispatch = useDispatch();
  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData?.applicationNo
  );
  const getTask = useSelector(({ processTask }: any) => processTask.getTask);
  const warnNotices = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.warnNotices || [],
    shallowEqual
  );
  const fundMakerDisplay = useJudgeFundMakerWarningDisplay();
  const displayEscalateReason = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.displayEscalateReason,
    shallowEqual
  );

  const { isShow, dictCode, typeCode } = useWarnMsgHoldPayment();
  const { caseNo } = lodash.pick(getTask, ['caseNo', 'taskStatus']);

  useEffect(() => {
    if (
      applicationNo &&
      caseNo &&
      tenant.isTH()
      // [TaskStatus.todo, TaskStatus.pending].includes(taskStatus)
    ) {
      dispatch({
        type: 'envoyController/getEnvoyInfo',
        payload: {
          caseNo,
        },
      });
    }
  }, [applicationNo, caseNo, dispatch]);

  const msg = typeCode
    ? formatMessageApi({
        [typeCode]: dictCode,
      })
    : '';

  return (
    <>
      {(fundMakerDisplay || displayEscalateReason) && (
        <Alert
          message={
            <ul className={styles.messageList}>
              {fundMakerDisplay && (
                <li className={styles.message}>
                  <ErrorIcon className={styles.errorIcon} />
                  {formatMessageApi({
                    Label_COM_WarningMessage: 'MSG_001277',
                  })}
                </li>
              )}
              {displayEscalateReason && (
                <li className={styles.message}>
                  <ErrorIcon className={styles.errorIcon} />
                  {formatMessageApi({
                    Label_COM_WarningMessage: 'MSG_001278',
                  })}
                </li>
              )}
            </ul>
          }
          className={classnames(styles.alert)}
          type="warning"
          closable={false}
        />
      )}
      {isShow && (
        <Alert message={msg} className={styles.alert} type="warning" showIcon closable={false} />
      )}
      {!!warnNotices.length &&
        warnNotices.map((item: string, index: number) => (
          <Alert
            message={item}
            className={styles.alert}
            type="warning"
            showIcon
            closable={false}
            key={index}
          />
        ))}
    </>
  );
};
WarningMessage.displayName = 'WarningMessage';
export default WarningMessage;
