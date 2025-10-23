import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { subtract } from '@/utils/precisionUtils';
import BenifitsItemLayout from './BenifitsItemLayout';
import BenefitItem from './BenefitItem';
import styles from './BenefitType.less';

export default ({ benefitTypeInfo }: any) => {
  return (
    <>
      <div className={classnames(styles.benefitType, styles.Benefits)}>
        {`${benefitTypeInfo?.benefitTypeCode} ${formatMessageApi({
          Dropdown_PRD_BenefitType: benefitTypeInfo?.benefitTypeCode,
        })}`}
      </div>
      <div className={styles.benefitTypeItem}>
        {!lodash.isEmpty(benefitTypeInfo?.limitInfoList) && (
          <BenifitsItemLayout key={benefitTypeInfo?.benefitTypeCode}>
            <BenifitsItemLayout.Title>
              {formatMessageApi({ Label_BIZ_Claim: 'BeneLimit' })}
              {formatMessageApi({ Label_BIZ_Claim: 'LimitValue' })}
              {formatMessageApi({ Label_BIZ_Claim: 'RemainingBalance' })}
              {formatMessageApi({ Label_BIZ_Claim: 'LimitFormula' })}
            </BenifitsItemLayout.Title>
            {lodash.map(
              lodash.orderBy(benefitTypeInfo?.limitInfoList, ['limitCode']),
              (item, key) => (
                <BenifitsItemLayout.Item key={key}>
                  {formatMessageApi({ Dropdown_CLM_BenefitLimit: item?.limitCode })}
                  {item?.limitValue || ''}
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
        )}
      </div>
      {lodash.map(
        lodash.orderBy(benefitTypeInfo?.benefitItemInfoList, ['benefitItemCode']),
        (benefitItemInfo, key) => (
          <BenefitItem benefitItemInfo={benefitItemInfo} key={key} />
        )
      )}
    </>
  );
};
