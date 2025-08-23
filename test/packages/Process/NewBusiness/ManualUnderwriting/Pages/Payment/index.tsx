import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';

import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import ChequeEditStatus from 'process/NewBusiness/Enum/ChequeEditStatus';

import Edit from './Edit';
import Show from './Show';
import TransferPayment from './_components/TransferPayment';

import { useInitPayment } from './_hooks';

import styles from './index.less';
import useGetRenewalPaymentMethod from '../../_hooks/useGetRenewalPaymentMethod';

// TODO:默认的时候应该不展示
export default () => {
  const dispatch = useDispatch();

  const [activitykey, setActivitykey] = useState('init');

  const chequeEditStatus: any =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeEditStatus) || '';

  useInitPayment();
  useGetRenewalPaymentMethod();
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
