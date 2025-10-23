import React, { useState } from 'react';
import Fundfield from 'process/NB/ManualUnderwriting/Fund/Fund-Field';
import { Icon, Button } from 'antd';
import classnames from 'classnames';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormAntCard } from 'basic/components/Form';
import useGetAutoAttachFundStatus from 'process/NB/ManualUnderwriting/_hooks/useGetAutoAttachFundStatus';
import EditTable from 'process/NB/ManualUnderwriting/Fund/Fund-Table/Edit';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Total from './Total';
import styles from './index.less';

const Detail = ({ config }: any) => {
  const dispatch = useDispatch();
  const [expendStatus, setExpendStatus] = useState(true);
  const handleAddFund = () => {
    setExpendStatus(true);
    dispatch({
      type: `${NAMESPACE}/addFundTableRow`,
    });
  };
  const autoAttachFundStatus = useGetAutoAttachFundStatus();

  const titleRender = (
    <div className={styles.titleinfo}>
      <div className={styles.titleWrap}>
        <span className={styles.title}>
          {formatMessageApi({
            Label_BIZ_FND: 'FundSelection',
          })}
        </span>
        <div className={styles.actions}>
          <Icon
            type={!expendStatus ? 'down' : 'up'}
            onClick={() => setExpendStatus(!expendStatus)}
          />
        </div>
      </div>
      {!autoAttachFundStatus && <Button onClick={handleAddFund}>Add Fund</Button>}
    </div>
  );

  return (
    <FormAntCard
      className={classnames(styles.detail, {
        [styles.hidden]: !expendStatus,
      })}
      title={titleRender}
    >
      {expendStatus ? (
        <div className={styles.content}>
          <div className={styles.BaseInfo}>
            <Fundfield/>
          </div>
          <div className={styles.fundTable}>
            <EditTable config={config} />
            <Total config={config}  />
          </div>
        </div>
      ) : (
        <></>
      )}
    </FormAntCard>
  );
};

export default Detail;
