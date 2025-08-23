import React, { useState } from 'react';
import { useDispatch } from 'dva';
import { Table, Tooltip } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';

export default ({ loanContractNo, tooltip, trigger, NAMESPACE, record }: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const columns = [
    {
      title: formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' }),
      dataIndex: 'loanPolicyNo',
    },
  ];

  const content = (
    <div className={styles.relatePolicy}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );

  const onClick = async () => {

    const allReasonConfigList = await dispatch({
      type: `${NAMESPACE}/getPolicyLoanHistorys`,
      payload: {
        loanDetailId: record?.id
      },
    });

    setData(allReasonConfigList)
  }

  return (
    <>
      {!tooltip ? (
        <span>{loanContractNo}</span>
      ) : (
        <Tooltip title={content} onClick={onClick} trigger={trigger || 'hover'}>
          <span className={styles.loanContractNo}>{loanContractNo}</span>
        </Tooltip>
      )}
    </>
  );
};
