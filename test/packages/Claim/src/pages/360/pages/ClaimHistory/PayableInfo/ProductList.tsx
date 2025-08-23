import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import ProductItem from './ProductItem';

import styles from './style.less';

interface IProps {
  productList: any[];
}

const ProductList: FunctionComponent<IProps> = ({ productList }) => {
  return (
    <div className={styles.productList}>
      {lodash.map(productList, (item: any, index: number) => (
        <ProductItem productItem={item} key={`${item.id}-${index}`} />
      ))}
    </div>
  );
};

export default ProductList;
