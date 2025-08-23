import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';

import { Icon, Button } from 'antd';
import classnames from 'classnames';

import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetLoanDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetLoanDetailList';
import EditTable from '../Load-Table/Edit';
import styles from './index.less';

const Detail = ({ config }: any) => {
  const dispatch = useDispatch();

  const [expendStatus, setExpendStatus] = useState(false);

  const loanDetailList = useGetLoanDetailList();

  const handleAdd = () => {
    setExpendStatus(true);
    dispatch({
      type: `${NAMESPACE}/addLoanDetailList`,
    });
  };

  useEffect(() => {
    if (loanDetailList.length > 0) setExpendStatus(true);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.titleinfo}>
        <div className={classnames(styles.head, { [styles.hidden]: expendStatus })}>
          <div className={styles.titleWrap}>
            <span className={styles.title}>Loan</span>
            <div className={styles.actions}>
              <Icon
                type={!expendStatus ? 'down' : 'up'}
                onClick={() => setExpendStatus(!expendStatus)}
              />
            </div>
          </div>
          <Button onClick={handleAdd}>Add Loan</Button>
        </div>
      </div>
      {expendStatus ? (
        <div className={styles.content}>
          <EditTable loanDetailList={loanDetailList} config={config} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detail;
