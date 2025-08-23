import React, { useState } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';

import PolicyList from './PolicyList';
import style from './index.less';
import { useSelector } from 'dva';

export default () => {
  const [tabKey, setTabKey] = useState('All');
  const Tabs = () => {
    const tabList = [
      { key: 'All', value: 'All' },
      { key: 'Opus', value: 'Opus' },
      { key: 'LA', value: 'LA/IL' },
      { key: 'workQueue', value: 'Workqueue' },
    ];
    return (
      <div className={style.Tabs}>
        {lodash.map(tabList, (tab) => (
          <div
            className={classNames(style.tab, { [style.highTab]: tab.key === tabKey })}
            onClick={() => setTabKey(tab.key)}
          >
            {tab.value}
          </div>
        ))}
      </div>
    );
  };
  const posHistoryList = useSelector((state: any) => state.insured360?.posHistoryList);
  const sourceSystemKey = lodash
    .chain(posHistoryList)
    .groupBy('sourceSystem')
    .keys()
    .reduce((result: any, value: any) => {
      if (
        lodash.includes(['IL', 'LA', 'null'], value) &&
        (lodash.includes(result, 'IL') ||
          lodash.includes(result, 'LA') ||
          lodash.includes(result, 'null'))
      ) {
        return result;
      } else {
        return [...result, value];
      }
    }, [])
    .value();
  const historyList = lodash
    .chain(posHistoryList)
    .groupBy('policyId')
    .map((item, key) => {
      const policyInfo = { policyId: key, mainProductCode: lodash.first(item)?.mainProductCode };
      const policyGroupList = lodash.filter(item, (policyItem: any) => {
        switch (tabKey) {
          case 'All':
            return true;
          case 'LA':
            return (
              policyItem.sourceSystem === tabKey ||
              policyItem.sourceSystem === 'IL' ||
              !policyItem.sourceSystem
            );
          default:
            return policyItem.sourceSystem === tabKey;
        }
      });
      return {
        policyInfo,
        policyList: policyGroupList,
        policyId: key,
      };
    })
    .filter((item) => !lodash.isEmpty(item.policyList))
    .value();

  return (
    <>
      {sourceSystemKey.length > 1 && <Tabs />}
      <PolicyList tabKey={tabKey} historyList={historyList} />
    </>
  );
};
