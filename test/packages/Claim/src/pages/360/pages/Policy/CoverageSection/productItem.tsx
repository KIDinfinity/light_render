import React from 'react';
import lodash from 'lodash';

import { add } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { formatCurrency } from '../../../_functions/format';

interface IAmount {
  currency: string;
  sumAssured: number;
}

interface IProductItem {
  productCode?: string;
  aliasProductCode?: string;
  amount?: IAmount[];
}

export default ({ productCode = '', aliasProductCode, amount = [] }: IProductItem) => {
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
    <div className={styles.item}>
      <div className={styles.name}>
        {formatMessageApi({ Dropdown_PRD_Product: aliasProductCode || productCode })}
      </div>
      <div className={styles.amount}>
        {lodash.isEmpty(amounts) ? null : `${lodash.join(amounts, ',')}`}
      </div>
    </div>
  );
};
