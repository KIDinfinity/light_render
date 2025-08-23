import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Tabs } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
const { TabPane } = Tabs;
import Card from '../card';
import Product from './Product';

export default ({ productInfoList, mainProductCode }: any) => {
  const showNewUI = useMemo(() => {
    return lodash.find(
      productInfoList,
      ({ revampDate }: any) => !!revampDate && !lodash.isEmpty(revampDate)
    );
  }, [productInfoList]);

  return (
    <Card title={formatMessageApi({ Label_BIZ_Policy: 'Product' })}>
      {!!showNewUI ? (
        <Tabs>
          {lodash.map(productInfoList, (item) => (
            <TabPane tab={item.revampTabName} key={item.revampTabName}>
              <Product key={item?.productCode} item={item} />
            </TabPane>
          ))}
        </Tabs>
      ) : (
        <>
          {lodash
            .chain(productInfoList)
            .orderBy((item) => item?.productCode === mainProductCode || item?.productCode)
            .orderBy(['coverageSeq'])
            .map((item) => <Product key={item?.productCode} item={item} />)
            .value()}
        </>
      )}
    </Card>
  );
};
