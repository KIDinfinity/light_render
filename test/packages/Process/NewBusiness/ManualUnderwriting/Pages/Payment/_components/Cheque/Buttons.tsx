import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Button, Tooltip } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ChequeEditStatus from 'process/NewBusiness/Enum/ChequeEditStatus';
import PaymentOption from 'process/NewBusiness/Enum/PaymentOption';
import PayType from 'process/NewBusiness/Enum/PayType';
import { Action, ProcActivityKey } from '@/components/AuditLog/Enum';

import styles from '../../index.less';

export default ({ showOnly, chequeInfoList, payType }: any) => {
  const dispatch = useDispatch();

  const { paymentOption = '' }: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData
    ) || [];

  const chequeEditStatus: any =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeEditStatus) || '';

  const VerifiedBtn = () => {
    return (
      <Button
        onClick={() => {
          dispatch({
            type: `${NAMESPACE}/getVerifyChequeInfo`,
            payload: {
              chequeInfoList,
            },
          });
          dispatch({
            type: 'auditLogController/logButton',
            payload: {
              action: Action.Verify,
              activityKey: ProcActivityKey.ProposalChange,
              content: [{ titleSection: 'PaymentInfo' }],
            },
          });
        }}
        disabled={chequeEditStatus === ChequeEditStatus.Verified}
      >
        Verify
      </Button>
    );
  };

  return (
    <div className={styles.buttonWrap}>
      {payType !== PayType.DirectTransfer && (
        <Button
          key="Refresh"
          className={styles.refresh}
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/loadChequeInfoList`,
              payload: {
                showOnly,
              },
            });
            dispatch({
              type: 'auditLogController/logButton',
              payload: {
                action: Action.RefreshCheque,
                activityKey: showOnly ? '' : ProcActivityKey.ProposalChange,
                content: showOnly ? '' : [{ titleSection: 'PaymentInfo' }],
              },
            });
          }}
          disabled={chequeEditStatus === ChequeEditStatus.Verified}
        >
          Refresh
        </Button>
      )}

      <>
        {chequeEditStatus === ChequeEditStatus.Verified ? (
          <Tooltip
            title={formatMessageApi(
              {
                Label_COM_WarningMessage: 'MSG_000754',
              },
              paymentOption === PaymentOption.PaymentSlip ? 'payment slip' : 'cheque'
            )}
          >
            {VerifiedBtn()}
          </Tooltip>
        ) : (
          VerifiedBtn()
        )}
      </>
    </div>
  );
};
