import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import Card from './card';
import Info from './info';
import List from './list';
import Empty from '@/components/Empty';

const policyList = ({ historyList }: any) => {
  const historyGroupList = lodash
    .chain(historyList)
    .groupBy('policyId')
    .map((item, key) => {
      const policyInfo = { policyId: key, mainProductCode: lodash.first(item)?.mainProductCode };
      return {
        policyInfo,
        policyList: item,
        policyId: key,
      };
    })
    .value();
  return (
    <div>
      {!lodash.isEmpty(historyGroupList) ? (
        <>
          {lodash.map(historyGroupList, (item, key) => (
            <Card key={`${item?.policyId}-${key}`}>
              <Info policyInfo={item.policyInfo} />
              <List policyList={item.policyList} />
            </Card>
          ))}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default connect(({ insured360 }: any) => ({
  historyList: insured360?.posHistoryList,
}))(policyList);
