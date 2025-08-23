import React, { useCallback } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { Icon } from 'antd';

export default function Header({ item, expanded, onExpandedChange }: any) {
  const { riskStatus, policyId, informationCategories } = item;

  const onToggleExpand = useCallback(() => {
    onExpandedChange({
      [policyId]: !expanded ? informationCategories.map((cate: any) => cate.category) : [],
    });
  }, [expanded, informationCategories, policyId, onExpandedChange]);

  return (
    <div className={styles.header}>
      <div className={styles.line} />
      <div className={styles.wrap}>
        <div className={styles.id}>{policyId}</div>
        {riskStatus && (
          <span className={styles.status}>{formatMessageApi({ risk_status: riskStatus })}</span>
        )}
      </div>
      <div className={styles.expand} onClick={onToggleExpand}>
        <Icon type={expanded ? 'fullscreen-exit' : 'fullscreen'} />
      </div>
    </div>
  );
}
