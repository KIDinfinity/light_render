import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import PaymentMethod from './PaymentMethod';
import styles from './index.less';

const RefundPayment = () => {
  const dispatch = useDispatch();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );

  const paymentMethodType = lodash.get(businessData, 'policyList[0].paymentMethodType');

  const onChange = async (paymentType: any) => {
    await dispatch({
      type: `${NAMESPACE}/savePremiumPaymentMethodType`,
      payload: {
        paymentMethodType: paymentType,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getBankList`,
    });
    dispatch({
      type: `${NAMESPACE}/checkRefundEditable`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.wrap}>
      <PaymentMethod paymentMethodType={paymentMethodType} />
    </div>
  );
};

export default RefundPayment;
