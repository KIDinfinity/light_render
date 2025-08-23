import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Button } from 'antd';
import lodash from 'lodash';

import { tenant } from '@/components/Tenant';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Action } from '@/components/AuditLog/Enum';

import Basic from './Basic';
import TransferPayButton from './TransferPayButton';

import styles from '../../index.less';

interface IParams {
  showOnly: boolean;
  paymentList: any;
}

export default ({ showOnly, paymentList }: IParams) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const showTransferButton =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace?.regionalDefaultValue?.supportTransferPayment === 'Y'
    ) || false;

  const paymentAmountData =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.paymentAmountData) || {};
  useEffect(() => {
    console.log('hello');
    if (paymentList?.length)
      dispatch({
        type: `${NAMESPACE}/getRefreshPaymentAmount`,
        payload: {
          init: true,
        },
      });
  }, [paymentList]);
  // 这里是为了一直拿refresh的值
  const list = useMemo(() => {
    return lodash
      .chain(paymentList)
      .map((item: any) => ({
        ...item,
        ...paymentAmountData,
        shortfall: paymentAmountData.policyInitialPremium,
      }))
      .value();
  }, [paymentList, paymentAmountData]);

  return (
    <>
      <div className={styles.paymentItemWrap}>
        {!taskNotEditable && showOnly && (
          <div className={styles.buttonWrap}>
            {!lodash.includes(['KH', 'VN'], tenant.region()) && (
              <Button
                loading={loading}
                onClick={async () => {
                  setLoading(true);
                  await dispatch({
                    type: `${NAMESPACE}/getRefreshPaymentAmount`,
                  });
                  await dispatch({
                    type: 'auditLogController/logButton',
                    payload: {
                      action: Action.RefreshInitial,
                    },
                  });
                  setLoading(false);
                }}
                className={styles.refresh}
              >
                Refresh
              </Button>
            )}
            {showTransferButton && <TransferPayButton />}
          </div>
        )}

        <div className={styles.content}>
          {lodash.map(list, (item: any) => (
            <Basic item={item} key={item.id} showOnly={showOnly} />
          ))}
        </div>
      </div>
    </>
  );
};
