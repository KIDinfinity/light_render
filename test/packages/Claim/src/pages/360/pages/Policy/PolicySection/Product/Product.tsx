import React from 'react';
import lodash from 'lodash';
import { Collapse } from 'antd';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatDate, formatCurrency } from '../../../../_functions';
import ProductBenefitItem from './ProductBenefitItem';
import styles from './Product.less';

const { Panel } = Collapse;

export default ({ item }: any) => {
  return (
    <div className={styles.bg}>
      <Collapse bordered={false}>
        <Panel
          header={
            <div>
              <div>
                <div className={styles.display}>
                  {!lodash.isEmpty(item.coverageKey) && (
                    <span className={styles.coverageKey}>{item.coverageSeq} -</span>
                  )}

                  <span className={classNames(styles.colorwhite, styles.productCode)}>
                    {formatMessageApi({
                      Dropdown_PRD_Product: item?.aliasProductCode || item?.productCode,
                    })}
                  </span>
                </div>
                <div className={styles.display}>
                  <span className={styles.colorwhite}>
                    {formatCurrency({ currency: item?.currency, value: item?.sumAssured })}
                  </span>
                </div>
              </div>
              <div>
                {item?.issueEffectiveDate && item?.riskCessationDate && (
                  <div className={styles.display}>
                    {`${formatDate(item?.issueEffectiveDate)} ~ ${formatDate(
                      item?.riskCessationDate
                    )}`}
                  </div>
                )}
                <div className={styles.display}>
                  {item?.riskStatus && (
                    <span className={styles.boder}>
                      {formatMessageApi({ risk_status: item?.riskStatus })}
                    </span>
                  )}
                  {item?.beyondNel && (
                    <span className={styles.boder}>
                      {formatMessageApi({ Dropdown_CLM_IsBeyondNEL: item?.beyondNel })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          }
        >
          <ProductBenefitItem
            benefitTypeInfoList={item?.benefitTypeInfoList}
            shareLimitInfoList={item?.shareLimitInfoList}
          />
        </Panel>
      </Collapse>
    </div>
  );
};
