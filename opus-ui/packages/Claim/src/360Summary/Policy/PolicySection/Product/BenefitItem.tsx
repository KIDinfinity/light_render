import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { subtract } from '@/utils/precisionUtils';
import BenifitsItemLayout from './BenifitsItemLayout';
import styles from './BenefitType.less';

export default ({ benefitItemInfo }: any) => {
  return (
    <>
      <div className={styles.benefitItemTitle}>
        {`${benefitItemInfo?.benefitItemCode} ${formatMessageApi({
          Dropdown_PRD_BenefitItem: benefitItemInfo?.benefitItemCode,
        })}`}
      </div>
      <div className={styles.benefitTypeItem}>
        <BenifitsItemLayout>
          <BenifitsItemLayout.Title>
            {formatMessageApi({ Label_BIZ_Claim: 'BeneLimit' })}
            {formatMessageApi({ Label_BIZ_Claim: 'LimitValue' })}
            {formatMessageApi({ Label_BIZ_Claim: 'RemainingBalance' })}
            {formatMessageApi({ Label_BIZ_Claim: 'LimitFormula' })}
          </BenifitsItemLayout.Title>
          {lodash.map(
            lodash.orderBy(benefitItemInfo?.limitInfoList, ['limitCode']),
            (item, key) => (
              <BenifitsItemLayout.Item key={key}>
                {formatMessageApi(
                  {
                    Dropdown_CLM_BenefitLimit: item?.limitCode,
                  },
                  item?.spcParamValue
                )}
                {lodash.isNil(item?.limitValue) ? '' : item?.limitValue}
                <div className="remainingBalance">
                  {item?.showRemainingBalance
                    ? subtract(item?.limitValue, item?.amount) > 0
                      ? subtract(item?.limitValue, item?.amount)
                      : 0
                    : ''}
                </div>
                {`${item?.calculateFormula || ''}${
                  item?.calculateFormula && item?.limitLayer ? ',' : ''
                }${item?.limitLayer || ''}`}
              </BenifitsItemLayout.Item>
            )
          )}
        </BenifitsItemLayout>
      </div>
    </>
  );
};
