import React from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import { ReactComponent as backIcon } from 'bpm/assets/back.svg';
import { add } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { formatCurrency } from '../../../_functions/format';

interface Iamount {
  value: number;
  currencyCode: string;
}

interface IProductItem {
  coverageType?: string;
  amount?: Iamount[];
  products: any[];
  handleClickFn: Function;
}

export default ({ coverageType = '', amount = [], products = [], handleClickFn }: IProductItem) => {
  const amounts = lodash
    .chain(amount)
    .reduce((result, item) => {
      const temp = result;
      temp[item?.currency] = add(temp?.[item?.currency] || 0, item?.sumAssured);
      return temp;
    }, {})
    .map((item, key) => formatCurrency({ currency: key, value: item }))
    .value();

  return (
    <div className={styles.detailWrap}>
      <div className={styles.detail}>
        <div className={styles.detailItem}>
          <div className={styles.itemName}>
            {formatMessageApi({ Dropdown_CLM_CoverageType: coverageType })}
          </div>
          <div className={styles.itemAmount}>
            {lodash.isEmpty(amounts) ? null : `${lodash.join(amounts, ',')}`}
          </div>
        </div>
        {lodash.map(products, (product: any) => (
          <div className={styles.detailItem}>
            <div className={styles.itemName}>
              <p className={styles.policyId}>{product?.policyId}</p>
              <p className={styles.productName}>
                {formatMessageApi({
                  Dropdown_PRD_Product: product?.aliasProductCode || product?.productCode,
                })}
              </p>
            </div>
            <div className={styles.itemAmount}>
              {formatCurrency({ currency: product?.currency, value: product?.sumAssured })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.backGroupBtn} onClick={() => handleClickFn('')}>
        <Icon component={backIcon} />
      </div>
    </div>
  );
};
