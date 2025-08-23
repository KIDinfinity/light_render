import React, { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PaymentMethodType from 'process/NB/PremiumSettlement/Enum/paymentMethodType';
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
      <div className={styles.head}>
        <span className={styles.title}>
          {formatMessageApi({
            Label_BIZ_Policy: 'PaymentMethod',
          })}
        </span>
        <div className={styles.mode}>
          <div
            className={classnames({
              [styles.selectMode]: paymentMethodType === PaymentMethodType.Online,
              [styles.notSelectMode]: paymentMethodType !== PaymentMethodType.Online,
            })}
            onClick={() => {
              onChange(PaymentMethodType.Online);
            }}
          >
            ONLINE
          </div>
          <div
            className={classnames({
              [styles.selectMode]: paymentMethodType === PaymentMethodType.Offline,
              [styles.notSelectOfflineMode]: paymentMethodType !== PaymentMethodType.Offline,
            })}
            onClick={() => {
              onChange(PaymentMethodType.Offline);
            }}
          >
            OFFLINE
          </div>
        </div>
      </div>
      <PaymentMethod paymentMethodType={paymentMethodType} />
      {/* <RefundProcess /> */}
    </div>
  );
};

export default RefundPayment;
