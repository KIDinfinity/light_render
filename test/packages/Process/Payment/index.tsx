import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal, Spin } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { createNormalizeData } from '@/utils/claimUtils';

import ButtonList from './ButtonList';
import TabList from './TabList';
import BeneficiaryPop from './_Components/BeneficiaryPop';

import styles from './index.less';

const Payment = ({ NAMESPACE }: any) => {
  const dispatch = useDispatch();

  const {
    show,
    datas: claimData,
    wholeEntities,
  } = useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal) || {};

  const loading =
    useSelector(({ loading }: any) => loading.effects[`${NAMESPACE}/reAllocations`]) || false;

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/paymentHiddenModal`,
    });
  };

  const onConfirm = async () => {
    // TODO:简要处理
    const errors = await dispatch({
      type: `${NAMESPACE}/paymentValidateCertainTab`,
      payload: { NAMESPACE },
    });
    if (errors?.length) return;

    const { claimEntities, claimProcessData } = createNormalizeData(claimData, wholeEntities);

    await dispatch({
      type: `${NAMESPACE}/paymentUpdateData`,
      payload: {
        claimEntities,
        claimProcessData,
      },
    });

    await dispatch({
      type: `${NAMESPACE}/paymentReAllocationSupplement`,
      payload: {
        NAMESPACE,
      },
    });

    dispatch({
      type: `${NAMESPACE}/paymentHiddenModal`,
    });
  };

  return (
    <div>
      <Modal
        visible={show}
        centered
        footer={null}
        className={styles.paymentWrap}
        width={'70%'}
        closable={false}
        forceRender={true}
        zIndex={999}
      >
        {/* // 不加这个的时候关闭按钮会报错 */}
        {show && (
          <div className={styles.container}>
            <ButtonList handleConfirm={onConfirm} handleCancel={handleCancel} />
            <div className={styles.content}>
              <div className={styles.title}>
                {formatMessageApi({
                  Label_BIZ_Claim: 'Payment Maintenance',
                })}
              </div>
              <Spin className={styles.Loading} spinning={loading}>
                <TabList NAMESPACE={NAMESPACE} />
              </Spin>
            </div>
          </div>
        )}
      </Modal>
      <BeneficiaryPop />
    </div>
  );
};

export default Payment;
