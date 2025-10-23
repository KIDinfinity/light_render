import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'dva';
import { tenant } from '@/components/Tenant';
import PolicyList from './PolicyList';

const { TabPane } = Tabs;

export default () => {
  const [tabkey, setTabkey] = useState('All');
  const posHistoryList = useSelector(({ insured360 }) => insured360?.posHistoryList) || [];
  const tabs = ['All', 'Opus', 'LA/IL'];

  return (
    <div style={{paddingBottom: '20px'}}>
      {
        tenant.isTH()? (
          <Tabs
            activeKey={tabkey}
            onChange={(key: any) => {
              setTabkey(key)
            }}
          >
            {
              tabs.map((key) => {
                const filteredList = key === 'All'? posHistoryList :
                  key === 'LA/IL'? posHistoryList.filter(item => item.sourceSystem === 'LA' || item.sourceSystem === 'IL')
                  :posHistoryList.filter(item => item.sourceSystem === key);
                return (
                  <TabPane
                    tab={key}
                    key={key}
                  >
                    <PolicyList posHistoryList={filteredList}/>
                  </TabPane>
                )
              })
            }
          </Tabs>
        ) : (
          <PolicyList posHistoryList={posHistoryList}/>
        )
      }

    </div>

  )
}

