import React, { useMemo } from 'react';
import { useDispatch } from 'dva';
import { Table, Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';

export default ({ loanContractNo, tooltip, trigger, record }: any) => {
  const dispatch = useDispatch();

  const content = useMemo(() => {
    const columns = [
      {
        title: formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' }),
        dataIndex: 'loanPolicyNo',
      },
    ];
    const historyData = lodash.map(record?.loanHistoryList || [], (item) => item);
    return (
      <div className={styles.relatePolicy}>
        <Table rowKey="id" columns={columns} dataSource={historyData} pagination={false} />
      </div>
    );
  }, [record?.loanHistoryList]);

  const onClick = () => {
    dispatch({
      type: `${NAMESPACE}/fetchPolicyLoanHistory`,
      payload: {
        loanDetailId: record?.id,
      },
    });
  };

  return (
    <>
      {!tooltip ? (
        <span>{loanContractNo}</span>
      ) : (
        // @ts-ignore
        <Tooltip title={content} onClick={onClick} trigger={trigger || 'hover'}>
          <span className={styles.loanContractNo}>{loanContractNo}</span>
        </Tooltip>
      )}
    </>
  );
};
