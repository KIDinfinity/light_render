import React from 'react';
import { Button } from 'antd';
import useCallPremiumEnquiry from 'process/NB/ManualUnderwriting/_hooks/useCallPremiumEnquiry';
import styles from './index.less';

export default () => {
  const refreshButton = useCallPremiumEnquiry();
  return (
    <>
      <Button
        onClick={refreshButton}
        size="small"
        className={styles.refresh}
      >
        Refresh
      </Button>
    </>
  );
};
