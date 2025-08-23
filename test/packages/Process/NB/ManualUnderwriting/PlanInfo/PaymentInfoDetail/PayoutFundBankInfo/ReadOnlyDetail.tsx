import React, { useState } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import { FormAntCard } from 'basic/components/Form';
import useGetBankInfoFieldDataReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldDataReadOnly';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import styles from './index.less';

const RenewalPaymentAmount = ({ bankInfoConfig }: any) => {
  const payoutFundBankInfoTableData = useGetBankInfoFieldDataReadOnly({ type: 'P' });
  const [isShowData, setIsShowData] = useState(false);
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
          <div className={styles.num}>Payout Fund Bank Info:</div>
          {isShowData ? (
            <Icon type="up" onClick={() => setIsShowData(false)} style={{ marginLeft: '4px' }} />
          ) : (
            <Icon type="down" onClick={() => setIsShowData(true)} style={{ marginLeft: '4px' }} />
          )}
        </div>
      </div>
      {isShowData && (
        <div className={styles.Renewal}>
          <FormAntCard className={styles.wrap}>
            <ConfigurableReadOnlySection
              config={bankInfoConfig}
              data={payoutFundBankInfoTableData}
            />
          </FormAntCard>
        </div>
      )}
    </div>
  );
};

export default RenewalPaymentAmount;
