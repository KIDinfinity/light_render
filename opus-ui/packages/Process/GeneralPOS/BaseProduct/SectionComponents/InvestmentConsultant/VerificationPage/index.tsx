import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

const VerificationPage = ({ remark }) => {
  return (
    <Button className={styles.element}>
      <a href={remark?.url} target="_blank" rel="noreferrer">
        Verification Page
      </a>
    </Button>
  );
};

VerificationPage.displayName = 'verificationPage';

export default VerificationPage;
