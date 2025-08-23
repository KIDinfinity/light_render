import React from 'react';
import styles from './index.less';

const Description = ({ description }: any) => {
  return <h2 className={styles.questionDescription}>{description}</h2>;
};

Description.displayName = 'description';

export default Description;
