import React, { useEffect } from 'react';
import { Modal, Button, Spin } from 'antd';
import { useSelector, useDispatch } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import PolicyBenefitList from './PolicyBenefit/List';
import PayeePaymentInformationList from './PayeePaymentInformation/List';
import PayeeInformationList from './PayeeInformation/List';

import styles from './index.less';

const PaymentAllocationModal = ({ children }: any) => {
  const show = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.show
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const modalLoading = useSelector(
    ({ loading }: any) =>
      loading.effects[`${NAMESPACE}/getAccountHolderId`] ||
      loading.effects[`${NAMESPACE}/getAccountHolderId`]
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/savePayeeDicts`,
    });
  }, []);

  const onConfirm = async () => {
    // const { claimEntities, claimProcessData } = createNormalizeData(claimData, wholeEntities);

    // await dispatch({
    //   type: `${NAMESPACE}/paymentUpdateData`,
    //   payload: {
    //     claimEntities,
    //     claimProcessData,
    //   },
    // });
    dispatch({
      type: `${NAMESPACE}/validatePaymentAllocation`,
    });
    // dispatch({
    //   type: `${NAMESPACE}/paymentHiddenModal`,
    // });
  };

  const onCancel = () => {
    dispatch({
      type: `${NAMESPACE}/paymentHiddenModal`,
    });
  };

  return (
    <Modal
      visible={show}
      title={formatMessageApi({
        Label_BIZ_Claim: 'PayeeInfo',
      })}
      footer={
        <div className={styles.paymentAllocatioFooter}>
          <Button className={styles.modalButton} onClick={onCancel}>
            {formatMessageApi({
              Label_COM_Opus: 'cancel',
            })}
          </Button>
          {editable && (
            <Button type="primary" onClick={onConfirm}>
              {formatMessageApi({
                Label_BPM_Button: 'Confirm',
              })}
            </Button>
          )}
        </div>
      }
      closable={false}
      width="80%"
      centered
      destroyOnClose
    >
      <Spin spinning={!!modalLoading}>
        <div className={styles.paymentAllocationmodal}>{children}</div>
      </Spin>
    </Modal>
  );
};

export default () => {
  return (
    <PaymentAllocationModal>
      <PolicyBenefitList />
      <PayeePaymentInformationList />
      <PayeeInformationList />
    </PaymentAllocationModal>
  );
};
