import React, { useState } from 'react';
import { Icon } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';
import { FormAntCard } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetBankInfoFieldDataReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldDataReadOnly';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import PayType from 'process/NB/Enum/PayType';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const ReadOnlyDividendICPInfoDetail = ({ bankInfoConfig }: any) => {
  const icpDividendInfoData = useGetBankInfoFieldDataReadOnly({ type: 'ID' });
  const { icpDividendPayType } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => ({
      icpDividendPayType: modelnamepsace?.businessData?.policyList?.[0]?.icpDividendPayType,
    }),
    shallowEqual
  );
  const showDropdown = icpDividendPayType === PayType.BankTransfer;
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
          <div className={styles.num}>
            {`${formatMessageApi({
              Label_BIZ_Policy: 'DividendandICPInfo',
            })}:`}
          </div>
          <div className={styles.currency}>
            {formatMessageApi({
              Dropdown_POL_DividendICPlPaymentMethod: icpDividendPayType,
            })}
          </div>
          {showDropdown &&
            (isShowData ? (
              <Icon type="up" onClick={() => setIsShowData(false)} style={{ marginLeft: '4px' }} />
            ) : (
              <Icon type="down" onClick={() => setIsShowData(true)} style={{ marginLeft: '4px' }} />
            ))}
        </div>
      </div>
      {isShowData && (
        <div className={styles.Renewal}>
          <FormAntCard className={styles.wrap}>
            <ConfigurableReadOnlySection
              config={bankInfoConfig}
              data={{ ...icpDividendInfoData, icpDividendPayType }}
            />
          </FormAntCard>
        </div>
      )}
    </div>
  );
};

export default ReadOnlyDividendICPInfoDetail;
