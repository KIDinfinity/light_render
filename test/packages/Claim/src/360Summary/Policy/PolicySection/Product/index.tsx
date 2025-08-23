import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Card from '../card';
import Product from './Product';

export default ({ productInfoList, mainProductCode }: any) => {
  return (
    <Card title={formatMessageApi({ Label_BIZ_Policy: 'Product' })}>
      {lodash
        .chain(productInfoList)
        .orderBy((item) => item?.productCode === mainProductCode || item?.productCode)
        .orderBy(['coverageSeq'])
        .map((item) => <Product key={item?.productCode} item={item} />)
        .value()}
    </Card>
  );
};
