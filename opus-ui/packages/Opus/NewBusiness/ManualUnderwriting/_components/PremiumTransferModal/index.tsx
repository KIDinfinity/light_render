import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Icon, Modal, Spin } from 'antd';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import PremiumInformation from './Components/PremiumInformation';
import TransferInformation from './Components/TransferInformation';
import { formUtils } from 'basic/components/Form';
import TaskDefKey from 'basic/enum/TaskDefKey';
import { TransferPaymentStatus } from '../../_enum';
import { Action } from '@/components/AuditLog/Enum';

const { confirm } = Modal;

const PremiumTransferModal = () => {
  const dispatch = useDispatch();

  const businessData = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.businessData;
  });

  const premiumTransferList = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.modalData.processData.premiumTransferList;
  });

  const paymentAmountData = useSelector(({ [NAMESPACE]: state }: any) => {
    return state?.paymentAmountData;
  });

  const {
    show,
    // resolve,
    reject,
    errorMsgs = [],
    taskDetail,
  } = useSelector(({ [NAMESPACE]: state }: any) => state?.premiumTransferModalData);
  const hasError = !!errorMsgs.length && !lodash.isEmpty(errorMsgs[0]);
  const isPremiumSettlement = taskDetail?.activityKey === TaskDefKey.BP_NB_ACT006;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject('Canceled');
    }

    dispatch({
      type: `${NAMESPACE}/setPremiumTransferModalData`,
      payload: {
        show: false,
      },
    });
  }, [dispatch, reject]);
  const handleConfirm = useCallback(() => {
    const targetIds = lodash.uniq(
      premiumTransferList
        .filter((item: any) => formUtils.queryValue(item.status) !== TransferPaymentStatus.Success)
        .map((item: any) => formUtils.queryValue(item.targetPolicyId))
        .filter((id: any) => !!id)
    );

    confirm({
      title: formatMessageApi({ Label_COM_Opus: 'confirmation' }),
      width: 500,
      centered: true,
      content: `You are transferring this premium to policy No.${targetIds.join(
        `, No.`
      )}. Please confirm to continue.`,
      okText: formatMessageApi({ Label_BPM_Button: 'Confirm' }),
      onOk: async () => {
        setConfirmLoading(true);

        const payload: any = {
          type: 'transfer',
        };
        dispatch({
          type: 'auditLogController/logTask',
          payload: {
            action: Action.PaymentTransfer,
          },
        });
        // 兼容premium settlement
        if (isPremiumSettlement) {
          payload.businessData = lodash.cloneDeep(businessData);
        }

        await dispatch({
          type: `${NAMESPACE}/setTransferData`,
          payload: payload,
        });

        setConfirmLoading(false);
      },
    });
  }, [businessData, dispatch, isPremiumSettlement, premiumTransferList]);

  const getPaymentData = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/getRefreshPaymentAmount`,
      payload: {
        init: true,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (show) {
      setLoading(true);
      getPaymentData();

      // 兼容premium settlement，初始化modalData
      if (isPremiumSettlement) {
        dispatch({
          type: `${NAMESPACE}/saveShowModal`,
          payload: {
            type: 'ALL',
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (!lodash.isEmpty(paymentAmountData)) {
      setLoading(false);
    }
  }, [paymentAmountData]);

  return (
    <Modal
      centered
      destroyOnClose
      maskClosable={false}
      width={680}
      visible={show}
      title={
        <div className={styles.title}>
          {<Icon type="retweet" />}
          <span>{formatMessageApi({ Label_COM_Opus: 'PaymentTransfer' })}</span>
        </div>
      }
      onCancel={handleCancel}
      footer={[
        <Button className={styles.close} key="back" disabled={loading} onClick={handleCancel}>
          {formatMessageApi({
            Label_BPM_Button: 'Close',
          })}
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={loading || hasError}
          onClick={handleConfirm}
          loading={confirmLoading}
        >
          {formatMessageApi({
            Label_BPM_Button: 'Confirm',
          })}
        </Button>,
      ]}
      className={styles.premiumTransferModal}
    >
      <Spin spinning={loading}>
        <div className={styles.content}>
          {!!errorMsgs.length && !lodash.isEmpty(errorMsgs[0]) && (
            <div className={styles.errorMsgs}>
              {errorMsgs.map((err: any) => {
                const { code, content } = err || {};
                return (
                  <div className={styles.msg} key={code}>
                    <Icon type="exclamation-circle" />
                    {content}
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles.header}>
            {formatMessageApi({ Label_COM_Opus: 'PolicyPremiumInformation' })}
          </div>
          <PremiumInformation />
          <div className={styles.header}>
            {formatMessageApi({ Label_COM_Opus: 'TransferInformation' })}
          </div>
          <TransferInformation />
        </div>
      </Spin>
    </Modal>
  );
};

export default PremiumTransferModal;
