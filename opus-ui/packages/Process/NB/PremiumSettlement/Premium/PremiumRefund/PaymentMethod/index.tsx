import React from 'react';
import { Radio } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import classnames from 'classnames';
import PaymentMethodType from 'process/NB/PremiumSettlement/Enum/paymentMethodType';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import styles from './index.less';
import useGetRejected from 'process/NB/PremiumSettlement/_hooks/useGetRejected';
import OfflinePaymentMethod from './OfflinePaymentMethod';
import OnlinePayment from './OnlinePayment';
import useGetPaymentListByPaymentMethodType from 'process/NB/PremiumSettlement/_hooks/useGetPaymentListByPaymentMethodType';
import useHandleChangePaymentType from 'process/NB/PremiumSettlement/_hooks/useHandleChangePaymentType';

const PaymentMethod = ({ paymentMethodType }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const payType = lodash.get(businessData, 'policyList[0].refundPayType');
  const rejected = useGetRejected();
  const isRefundEditable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.refundEditable
  );
  const paymentList = useGetPaymentListByPaymentMethodType();
  const handleChangePayment = useHandleChangePaymentType();
  return (
    <div
      className={classnames(styles.payment, {
        [styles.onlinePayment]: paymentMethodType === PaymentMethodType.Online,
      })}
    >
      <Radio.Group
        onChange={handleChangePayment}
        value={payType}
        disabled={taskNotEditable || rejected || !isRefundEditable}
      >
        {lodash.map(paymentList, (item: any, i: number) => {
          return (
            <div key={item?.paymentMethod ?? i} className={styles.bankInfo}>
              <Radio value={item?.paymentCode} className={styles.radio}>
                <div className={styles.con}>{item?.paymentMethod}</div>
              </Radio>
              {item?.paymentCode === PayType.BankTransfer ? (
                <div className={styles.bankDetail}>
                  {paymentMethodType === PaymentMethodType.Online && <OnlinePayment />}
                  {paymentMethodType === PaymentMethodType.Offline && <OfflinePaymentMethod />}
                </div>
              ) : null}
            </div>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default PaymentMethod;
