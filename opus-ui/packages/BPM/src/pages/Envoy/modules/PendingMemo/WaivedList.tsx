import React from 'react';
import { Collapse } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './pendingMemo.less';

const { Panel } = Collapse;

const Header = ({ memoCode }: { memoCode: string }) => (
  <div className={styles.header}>
    <div className={styles.memoCode}>
      {formatMessageApi({
        Label_Sider_Envoy: 'MemoCode',
      })}
      <div className={styles.code}>{memoCode}</div>
    </div>
    <div className={styles.status}>
      {formatMessageApi({
        Label_Sider_Envoy: 'MemoStatus03',
      })}
    </div>
  </div>
);

export default ({ list = [] }: any) => {
  return (
    <div className={styles.deleteList}>
      <Collapse>
        {lodash.map(list, (item: any, idx: number) => (
          <Panel header={<Header memoCode={item.memoCode} />} key={idx} showArrow={false}>
            <div className={styles.memoDesc}>{item.memoDesc}</div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
