import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import { Region, tenant } from '@/components/Tenant';
import classNames from 'classnames';
import styles from './index.less';

const PremiumInfo = () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const regionCode = tenant.region();
  const policyList = lodash.get(businessData, 'policyList[0]', {});
  const {
    baseProductCode,
    baseProductName,
    laPolicyStatus,
    netPremium,
    policyDecision,
    policyStatus,
    toleranceAmount,
  } = policyList;

  const showBaseProduct = regionCode === Region.ID;
  const showTolerancePremium = netPremium <= toleranceAmount;

  const contentList = useMemo(
    () => [
      {
        title: formatMessageApi({ Label_COM_General: 'PolicyNo' }),
        content: policyDecision?.policyId || '-',
        show: true,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Policy: 'BaseProduct',
        }),
        content:
          baseProductCode && baseProductName ? `${baseProductCode} - ${baseProductName}` : '-',
        show: showBaseProduct,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Policy: 'OWBStatus',
        }),
        content: formatMessageApi({ Dropdown_POL_PolicyStatusCode: policyStatus }) || '-',
        show: true,
        className: showBaseProduct ? 'split' : undefined,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Policy: 'LAStatus',
        }),
        content: formatMessageApi({ Dropdown_POL_PolicyStatusCode: laPolicyStatus }) || '-',
        show: true,
        className: showBaseProduct ? 'split' : undefined,
      },
      {
        title: formatMessageApi({
          Label_BIZ_Policy: 'TolerancePremium',
        }),
        content: toleranceAmount || '-',
        show: showTolerancePremium,
      },
    ],
    [
      baseProductCode,
      baseProductName,
      laPolicyStatus,
      policyDecision,
      policyStatus,
      showBaseProduct,
      showTolerancePremium,
      toleranceAmount,
    ]
  );

  return (
    <div>
      <div
        className={classNames(styles.wrap, {
          [styles.custom]: showBaseProduct,
        })}
      >
        {contentList.map(({ show, title, content, className }) =>
          show ? (
            <div
              className={classNames(styles.content, {
                [styles[`${className}`]]: !!className,
              })}
              key={title}
            >
              <div className={styles.title}>{title}</div>
              <div className={styles.con}>{content}</div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default PremiumInfo;
