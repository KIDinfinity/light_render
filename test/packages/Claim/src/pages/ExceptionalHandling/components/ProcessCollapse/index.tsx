import React, { useState } from 'react';
import { Collapse } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import styles from './index.less';
import PanelContent from './PanelContent';

const { Panel }: any = Collapse;

function ProcessCollapse({ integrationProcessInfoList }: any) {
  // const [activeKey, setActiveKey] = useState([integrationProcessInfoList[0]?.id]);
  const [activeKey, setActiveKey] = useState('');
  return (
    <Collapse
      bordered={false}
      className={styles.collapse}
      // defaultActiveKey={[integrationProcessInfoList[0]?.id]}
      onChange={(e: any) => {
        setActiveKey(e);
      }}
    >
      {lodash.map(integrationProcessInfoList, (item: any) => {
        return (
          <Panel
            showArrow={false}
            className={{
              [styles.panel]: true,
              [styles.activePanel]: activeKey.includes(item.id),
            }}
            header={
              <div className={styles.header}>
                <div>{item?.requestTime && moment(item?.requestTime).format('L LTS')}</div>
                <div>{item.url}</div>
              </div>
            }
            key={item.id}
          >
            <PanelContent item={item} />
          </Panel>
        );
      })}
    </Collapse>
  );
}

export default ProcessCollapse;
