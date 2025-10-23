import React, { useEffect } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PremiumType from 'process/NB/PremiumSettlement/Enum/premiumType';
import useGetReCalculateTotalPremium from 'process/NB/PremiumSettlement/_hooks/useGetReCalculateTotalPremium';
import useGetPremiumType from 'process/NB/PremiumSettlement/_hooks/useGetPremiumType';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import AdjustPremiumSection from './AdjustPremiumSection';
import styles from './index.less';

const CalculateInfo = () => {
  let netPremium: any;
  const dispatch = useDispatch();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const premiumType = useGetPremiumType();
  const currencyCode = lodash.get(businessData, 'policyList[0].currencyCode', '');
  const premiumDue = lodash.get(businessData, 'policyList[0].premiumDue', '');
  const premiumReceived = lodash.get(businessData, 'policyList[0].premiumReceived', '');
  const totalPremium = lodash.get(businessData, 'policyList[0].totalPremium', '');

  const getNetPremium = (premiumDueNum: any, suspenseNum: any) => {
    netPremium = lodash.toNumber(premiumDueNum - suspenseNum);
    const formatNetPremium = getFieldDisplayAmount(
      lodash.toNumber(premiumDueNum - suspenseNum),
      'nb.policyList.premiumReceived'
    );
    return formatNetPremium;
  };

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveNetPremium`,
      payload: { netPremium },
    });
  }, [netPremium]);

  const reCalculateTotalPremium = useGetReCalculateTotalPremium({
    premiumReceived,
    totalPremium,
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.calculate}>
        {premiumType === PremiumType.PremiumCollection && (
          <div className={styles.content}>
            <span className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Policy: 'PremiumDue',
              })}
            </span>
            <div>
              <span className={styles.num}>
                {getFieldDisplayAmount(premiumDue, 'nb.policyList.premiumDue')}
              </span>
              <span>{currencyCode}</span>
            </div>
          </div>
        )}
        <div className={styles.content}>
          <span className={styles.title}>
            {premiumType === PremiumType.PremiumCollection && <Icon type="minus" />}
            {formatMessageApi({
              Label_BIZ_Policy: 'PremiumReceived',
            })}
          </span>
          <div>
            <span className={styles.num}>
              {getFieldDisplayAmount(premiumReceived, 'nb.policyList.premiumReceived')}
            </span>
            <span>{currencyCode}</span>
          </div>
        </div>
        {premiumType === PremiumType.PremiumRefund && (
          <div className={styles.content}>
            <span className={styles.title}>
              <Icon type="minus" />
              {formatMessageApi({
                Label_BIZ_Policy: 'AdjustPremium',
              })}
            </span>
            <span className={styles.adjust}>
              <AdjustPremiumSection />
            </span>
          </div>
        )}
        <div className={classNames(styles.content, styles.total)}>
          <Icon type="pause" rotate={90} />
          <div>
            <span className={styles.num} style={{ fontSize: '32px' }}>
              {premiumType === PremiumType.PremiumCollection
                ? getNetPremium(premiumDue || 0, premiumReceived || 0)
                : reCalculateTotalPremium}
            </span>
            <span>{currencyCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateInfo;
