import React from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import { EPolicySource } from 'claim/enum/EPolicySource';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useExpanderController from 'navigator/hooks/useExpanderController';

import ProductItem from './productItem';
import styles from './index.less';

const classNameMap = {
  [EPolicySource.Individual]: styles.blue,
  [EPolicySource.Group]: styles.skyBlue,
};

export default ({
  policySource = 'G',
  productInfoList,
}: {
  policySource: string;
  productInfoList: any[];
}) => {
  const titleMap = {
    [EPolicySource.Individual]: formatMessageApi({
      Label_BIZ_Policy: 'INDpolicy',
    }),
    [EPolicySource.Group]: formatMessageApi({
      Label_BIZ_Policy: 'Grppolicy',
    }),
  };

  const productGroup = lodash
    .chain(productInfoList)
    .groupBy('productCode')
    .map((products, productCode) => {
      return {
        productCode,
        aliasProductCode: products[0]?.aliasProductCode,
        amount: lodash.map(products, (productInfo: any) =>
          lodash.pick(productInfo, ['currency', 'sumAssured'])
        ),
      };
    })
    .value();

  const productGroupList = lodash.map(productGroup, (item: any, index: number) => (
    <ProductItem
      key={`${item.productCode}-${index}`}
      productCode={item?.productCode}
      aliasProductCode={item?.aliasProductCode}
      amount={item?.amount}
    />
  ));

  const { isExpanderSwitchOn } = useExpanderController();

  const prexis = classNameMap?.[policySource] || '';
  return (
    <div className={classnames(styles.itemGroup, prexis, isExpanderSwitchOn ? styles.ex : '')}>
      <div className={styles.header}>
        {titleMap?.[policySource]}
        <span className={styles.mark}>{lodash.size(productGroupList)}</span>
      </div>
      <div className={styles.itemGroupList}>{productGroupList}</div>
    </div>
  );
};
