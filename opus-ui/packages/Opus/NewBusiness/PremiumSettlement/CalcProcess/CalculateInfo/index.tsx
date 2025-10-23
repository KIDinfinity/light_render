import React, { useEffect } from 'react';
import { Col, Icon, Row } from 'antd';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PremiumType from 'opus/NewBusiness/PremiumSettlement/Enum/premiumType';
import useGetReCalculateTotalPremium from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetReCalculateTotalPremium';
import useGetPremiumType from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetPremiumType';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
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
              <span className={styles.space} />
              {formatMessageApi({
                Label_BIZ_Policy: 'PremiumDue',
              })}
            </span>
            <Row className={styles.money}>
              <Col span={15} className={styles.num}>
                {getFieldDisplayAmount(premiumDue, 'nb.policyList.premiumDue')}
              </Col>

              <Col span={8} className={styles.currency}>
                {currencyCode}
              </Col>
            </Row>
          </div>
        )}
        <div className={styles.content}>
          <span className={styles.title}>
            {premiumType === PremiumType.PremiumCollection ? (
              <Icon type="minus" />
            ) : (
              <span className={styles.space} />
            )}
            {formatMessageApi({
              Label_BIZ_Policy: 'PremiumReceived',
            })}
          </span>

          <Row className={styles.money}>
            <Col span={15} className={styles.num}>
              {getFieldDisplayAmount(premiumReceived, 'nb.policyList.premiumReceived')}
            </Col>

            <Col span={8} className={styles.currency}>
              {currencyCode}
            </Col>
          </Row>
        </div>
        {premiumType === PremiumType.PremiumRefund && (
          <div className={styles.content}>
            <span className={styles.title}>
              <Icon type="minus" className={styles.minus} />
              {formatMessageApi({
                Label_BIZ_Policy: 'AdjustPremium',
              })}
            </span>
            <span className={classNames(styles.adjust)}>
              <AdjustPremiumSection />
            </span>
          </div>
        )}
        <div className={classNames(styles.content, styles.total)}>
          <Row className={styles.money}>
            <Col span={15} className={styles.num}>
              {premiumType === PremiumType.PremiumCollection
                ? getNetPremium(premiumDue || 0, premiumReceived || 0)
                : reCalculateTotalPremium}
            </Col>
            <Col span={8} className={styles.currency}>
              {currencyCode}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CalculateInfo;
