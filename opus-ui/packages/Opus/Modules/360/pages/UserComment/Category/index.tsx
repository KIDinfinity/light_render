import React, { useCallback } from 'react';
import { Collapse } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Content from '../Content';

const { Panel } = Collapse;

export default function Category({ item, expandedKeys = [], onExpandedChange }: any) {
  const { informationCategories = [], policyId } = item;

  const onCollapseChange = useCallback(
    (keys) => {
      onExpandedChange({
        [policyId]: keys,
      });
    },
    [policyId, onExpandedChange]
  );

  return (
    <div className={styles.category}>
      <Collapse bordered={false} onChange={onCollapseChange} activeKey={expandedKeys}>
        {informationCategories.map((informationCategory: any) => {
          const { category, comments = [] } = informationCategory;

          const header = (
            <div className={styles.header}>
              <span className={styles.title}>{formatMessageApi({ category })}</span>
              <span className={styles.count}>{`(${comments.length})`}</span>
            </div>
          );

          return (
            <Panel key={category} header={header}>
              <Content comments={comments} />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}
