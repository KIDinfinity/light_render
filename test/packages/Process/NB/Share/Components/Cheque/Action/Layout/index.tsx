import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';
import styles from './index.less';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import useJudgeDisplayChequeEditButton from 'process/NB/Share/hooks/useJudgeDisplayChequeEditButton';
import useJudgeDisplayChequeSaveButton from 'process/NB/Share/hooks/useJudgeDisplayChequeSaveButton';
import useGetChequeEditStatus from 'process/NB/Share/hooks/useGetChequeEditStatus';
import useGetPaymentOption from 'process/NB/Share/hooks/useGetPaymentOption';
import useJudgeDirectTransfer from 'process/NB/Share/hooks/useJudgeDirectTransfer';
import useGetPayType from 'process/NB/ManualUnderwriting/_hooks/useGetPayType';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';
import PayType from 'process/NB/Enum/PayType';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Tooltip } from 'antd';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const editButtonHidden = !useJudgeDisplayChequeEditButton();
  const saveButtonHidden = !useJudgeDisplayChequeSaveButton();
  const isDirectTransfer = useJudgeDirectTransfer();
  const paymentOption = useGetPaymentOption();
  const payType = useGetPayType();
  const taskNotEditable = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const chequeEditStatus = useGetChequeEditStatus();

  const warningType = useMemo(() => {
    return lodash.lowerCase(
      formatMessageApi(
        payType === PayType.Cheque
          ? {
              Dropdown_POL_PaymentOption: paymentOption,
            }
          : {
              Dropdown_POL_InitialPaymentMethod: payType?.payType,
            }
      )
    );
  }, [payType, paymentOption]);

  return (
    <div
      className={classnames(styles.container, {
        [styles.hidden]: taskNotEditable,
      })}
    >
      <div
        className={classnames(styles.buttonContainer, {
          [styles.hidden]: editButtonHidden || isDirectTransfer,
        })}
      >
        {slots.get('Edit')}
      </div>
      <div
        className={classnames(styles.buttonContainer, {
          [styles.hidden]: saveButtonHidden || isDirectTransfer,
        })}
      >
        {slots.get('Save')}
      </div>
      <div
        className={classnames(styles.buttonContainer, {
          [styles.hidden]: isDirectTransfer,
        })}
      >
        {slots.get('Refresh')}
      </div>
      <div className={classNames(styles.buttonContainer, {})}>
        {chequeEditStatus === ChequeEditStatus.Verified ? (
          <Tooltip
            title={formatMessageApi(
              {
                Label_COM_WarningMessage: 'MSG_000754',
              },
              warningType
            )}
          >
            {slots.get('Verify')}
          </Tooltip>
        ) : (
          slots.get('Verify')
        )}
      </div>
    </div>
  );
};
