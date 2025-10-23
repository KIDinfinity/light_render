import React from 'react';
import lodash from 'lodash';
import ProductItem from './ProductItem';

import styles from './index.less';

export default ({productList}: any) => {
  return (
    <div className={styles.productList}>
      {lodash.map(
        productList,
        (item, index) =>
          lodash.size(item?.factorList) > 0 && (
            <ProductItem
              key={`${item.policyNo}${item.productCode}`}
              index={index}
              productItem={item}
            />
          )
      )}
    </div>
  );
};
