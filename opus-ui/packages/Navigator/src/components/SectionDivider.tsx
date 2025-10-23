import React from 'react';
import { Button } from 'antd';
import styles from './sectionDivider.less';

const SectionDivider = ({ title, buttonConfig }) => (
  <div className={styles.section_divide}>
    <span className={styles.title}>{title}</span>
    {buttonConfig && (
      <Button type="primary" size="small" onClick={buttonConfig.action}>
        {buttonConfig.label}
      </Button>
    )}
  </div>
);

export default SectionDivider;
