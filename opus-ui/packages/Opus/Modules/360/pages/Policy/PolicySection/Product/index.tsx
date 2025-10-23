import React from 'react';
import lodash from 'lodash';
import Product from './Product';

export default ({ productInfoList, exclusionList }: any) => {
  return (
    lodash
      .chain(productInfoList)
      .orderBy(['coverageSeq'])
      .map((item) => (
        <Product key={item?.productCode} exclusionList={exclusionList} item={item} />
      ))
      .value()
  );
};
