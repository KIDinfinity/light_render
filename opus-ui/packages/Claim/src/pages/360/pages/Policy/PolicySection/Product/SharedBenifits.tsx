import React from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { subtract } from '@/utils/precisionUtils';
import BenefitTitle from './BenifitsItemLayout/BenefitTitle';
import SharedBenifitsItem from './SharedBenifitsItem';
import styles from './SharedBenifits.less';

export default function SharedBenifits({ shareLimitInfoList }: any) {
  return (
    <>
      <div className={classnames(styles.benefitType, styles.Benefits)}>
        {formatMessageApi({ Label_BIZ_Claim: 'ShareBenefits' })}
      </div>
      {lodash.map(lodash.orderBy(shareLimitInfoList, ['limitCode']), (list, key) => (
        <div className={styles.clounm} key={key}>
          <BenefitTitle>
            {formatMessageApi({ Label_BIZ_Claim: 'BeneLimit' })}
            {formatMessageApi({ Label_BIZ_Claim: 'ShareLimit' })}
            {formatMessageApi({ Label_BIZ_Claim: 'RemainingBalance' })}
            {formatMessageApi({ Label_BIZ_Claim: 'LimitFormula' })}
          </BenefitTitle>
          <div className={styles.benefitLimit}>
            <div className={styles.item}>
              {formatMessageApi({ Dropdown_CLM_BenefitLimit: list?.limitCode })}
            </div>
            <div className={styles.item}>
              {lodash.isNumber(list?.limitValue) ? list?.limitValue : ''}
            </div>
            <div className={classnames(styles.item, styles.remainingBalance)}>
              {list?.showRemainingBalance ? subtract(list?.limitValue, list?.amount) : ''}
            </div>
            <div className={styles.item}>
              {`${list?.calculateFormula || ''}${
                list?.calculateFormula && list?.limitLayer ? ',' : ''
              }${list?.limitLayer || ''}`}
            </div>
          </div>
          <SharedBenifitsItem shareBenefitList={list?.shareBenefitList} />
        </div>
      ))}
    </>
  );
}
