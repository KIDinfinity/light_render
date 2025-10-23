import { useDispatch, useSelector } from 'dva';
import { ReactComponent as BankIcon } from 'opus/Assets/icon-bank.svg';
import ChequeEditStatus from 'opus/NewBusiness/Enum/ChequeEditStatus';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { OptionType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import React, { useState } from 'react';
import ExpandableCard from '../../_components/ExpandableCard';
import useGetRenewalPaymentMethod from '../../_hooks/useGetRenewalPaymentMethod';
import Edit from './Edit';
import styles from './index.less';
import Show from './Show';
import TransferPayment from './_components/TransferPayment';
import { useInitPayment } from './_hooks';
import useRefreshPaymentAmount from './_hooks/useRefreshPaymentAmount';

// TODO:默认的时候应该不展示
export default () => {
  const dispatch = useDispatch();

  const [activitykey, setActivitykey] = useState('init');

  const chequeEditStatus: any =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeEditStatus) || '';

  useInitPayment();
  useGetRenewalPaymentMethod();
  useRefreshPaymentAmount();
  const handleConfirm = async () => {
    // TODO:这里如果没有点开cheque的modal，是不会有chequeEditStatus的
    if (chequeEditStatus !== ChequeEditStatus.Verified && activitykey === 'cheque') {
      await dispatch({
        type: `${NAMESPACE}/getSaveChequeInfo`,
      });
    }

    const configKeys = {
      init: ['InitialPaymentInfo-Table'],
      renewal: ['RenewalPaymentInfo-Table'],
      refund: ['PayoutFundBankInfo-Table'],
      payout: ['WithdrawalPaymentInfo-Table'],
      dividend: ['DividendandICPInfo-Field'],
    };

    const result = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        formKeys: configKeys?.[activitykey] || [],
        type: OptionType.payment,
      },
    });
    return result as unknown as boolean;
  };

  const handleCancel = async () => {
    if (chequeEditStatus === ChequeEditStatus.Editing) {
      await dispatch({
        type: `${NAMESPACE}/getCancelChequeInfo`,
      });
    }
    await dispatch({
      type: `${NAMESPACE}/saveHiddenModal`,
    });
  };
  const handleShow = async () => {
    dispatch({
      type: `${NAMESPACE}/saveShowModal`,
      payload: {
        type: 'payment',
      },
    });
  };

  return (
    <>
      <ExpandableCard
        title="Payment Information"
        icon={BankIcon}
        errorBoundaryName="Payment Information"
        editModalProps={{
          onAfterConfirm: handleConfirm,
          onBeforeBack: handleCancel,
          onBeforeOpen: handleShow,
          children: <Edit activitykey={activitykey} setActivitykey={setActivitykey} />,
        }}
        contentClassName={styles.cardContent}
      >
        <Show activitykey={activitykey} setActivitykey={setActivitykey} />
        <TransferPayment />
      </ExpandableCard>
    </>
  );
};
