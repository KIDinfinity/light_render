import React from 'react';
import { Button } from 'antd';
import styles from './index.less';
import useGetRejected from 'process/NB/PremiumSettlement/_hooks/useGetRejected';

export default ({
  handleAddBankInfo,
  emptySearchQuery,
  taskNotEditable,
  isRefundEditable,
}: any) => {
  const rejected = useGetRejected();

  return (
    <div className={styles.empty}>
      <div>No exsiting bank info found, would you like to add a new one?</div>
      <div className={styles.btn}>
        <Button
          className={styles.yes}
          disabled={rejected || taskNotEditable || !isRefundEditable}
          onClick={handleAddBankInfo}
        >
          Yes
        </Button>
        <Button
          className={styles.no}
          disabled={rejected || taskNotEditable || !isRefundEditable}
          onClick={emptySearchQuery}
        >
          <span>No</span>
        </Button>
      </div>
    </div>
  );
};
