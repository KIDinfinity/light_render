import React, { useEffect, useState } from 'react';
import { Tabs, Tooltip } from 'antd';
import classnames from 'classnames';
import TableResult from './Table';
import Info from './Info';
import styles from './index.less';

const { TabPane } = Tabs;

const Result = ({ execList, isExpand }) => {
  const [activeKey, setActiveKey] = useState('info');
  useEffect(() => {
    if (execList?.length) {
      const firstSuccess = execList.find((el: any) => el?.success && !!el?.resultSet?.length);
      if (firstSuccess) {
        setActiveKey(`result_1`);
      }
    }
    if (execList?.length === 1 && execList[0]?.type === 'Validating') {
      setActiveKey('info');
    }
  }, [execList]);
  return (
    <div className={classnames(styles.result, { [styles.mh729]: isExpand })}>
      <Tabs type="card" activeKey={activeKey} onChange={setActiveKey}>
        {execList
          ?.filter((el: any) => el?.success && !!el?.resultSet?.length)
          ?.map((item: any, idx: number) => (
            <Tabs.TabPane
              tab={
                <Tooltip>
                  <span>{`Result ${idx + 1}`}</span>
                </Tooltip>
              }
              key={`result_${idx + 1}`}
            >
              <TableResult isExpand={isExpand} item={item} index={idx} />
            </Tabs.TabPane>
          ))}
        <TabPane tab="Info" key="info">
          <Info execList={execList} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Result;
