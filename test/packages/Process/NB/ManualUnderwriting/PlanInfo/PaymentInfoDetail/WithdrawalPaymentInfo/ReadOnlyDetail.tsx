import React, { useMemo, useState } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import { FormAntCard } from 'basic/components/Form';
import useGetBankInfoFieldDataReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldDataReadOnly';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useGetRefundPayType from 'process/NB/ManualUnderwriting/_hooks/useGetRefundPayType';
import PremiumAction from 'process/NB/PremiumSettlement/Enum/PremiumAction';
import useGetPremiumPaymentCfgList from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumPaymentCfgList';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';

const RenewalPaymentAmount = ({ bankInfoConfig }: any) => {
  const renewalPaymentBankInfoTableData = useGetBankInfoFieldDataReadOnly({ type: 'W' });
  const [isShowData, setIsShowData] = useState(false);
  const refundPayType = useGetRefundPayType();
  const paymentList = useGetPremiumPaymentCfgList();
  const region = tenant.region();

  const paymentMethod = useMemo(() => {
    let _paymentMathod = '-';
    paymentList.forEach((item) => {
      if (
        item.paymentCode === refundPayType &&
        item.premiumAction === PremiumAction.PremiumRefund &&
        region === item.region
      )
        _paymentMathod = item.paymentMethod;
    });
    return _paymentMathod;
  }, [paymentList, refundPayType, region]);

  const isShowBankDetail = useMemo(() => {
    return refundPayType === PayType.BankTransfer;
  }, [refundPayType]);
  return (
    <div className={styles.container}>
      <div
        className={classnames(styles.amount, {
          [styles.expandAmount]: isShowData,
          [styles.packAmount]: !isShowData,
        })}
      >
        <div
          className={classnames(styles.initial, {
            [styles.expandInitial]: isShowData,
            [styles.packInitial]: !isShowData,
          })}
        >
          <div className={styles.num}>
            {' '}
            {formatMessageApi({
              Label_BIZ_Policy: 'RefundPayment',
            })}
            :<span className={styles.refundType}>{paymentMethod}</span>
          </div>
          {isShowBankDetail &&
            (isShowData ? (
              <Icon type="up" onClick={() => setIsShowData(false)} style={{ marginLeft: '4px' }} />
            ) : (
              <Icon type="down" onClick={() => setIsShowData(true)} style={{ marginLeft: '4px' }} />
            ))}
        </div>
      </div>
      {isShowData && isShowBankDetail && (
        <div className={styles.Renewal}>
          <FormAntCard className={styles.wrap}>
            <ConfigurableReadOnlySection
              config={bankInfoConfig}
              data={renewalPaymentBankInfoTableData}
            />
          </FormAntCard>
        </div>
      )}
    </div>
  );
};

export default RenewalPaymentAmount;
