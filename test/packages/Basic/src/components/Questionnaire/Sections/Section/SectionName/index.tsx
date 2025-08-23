import React from 'react';
import styles from './index.less';

const SectionName = ({ sectionName }: any) => {
  return <h1 className={styles.sectionName}>{sectionName}</h1>;
};

SectionName.displayName = 'sectionName';

export default SectionName;
