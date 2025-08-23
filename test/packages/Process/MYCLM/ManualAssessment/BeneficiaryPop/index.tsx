import React, { useState } from 'react';
import { NAMESPACE } from '../activity.config';
import { Table } from 'antd';
import Columns from './Columns';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonModal from 'basic/components/CommonModal';
import styles from './style.less';

const BeneficiaryPop = () => {
  const dispatch = useDispatch();
  const [beneficiaryInfo, setBeneficiaryInfo] = useState<any>(null);

  const { beneficiaryPopUp, beneficiariesInfo } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      beneficiaryPopUp: modelnamespace.beneficiaryPopUp,
      beneficiariesInfo: modelnamespace.beneficiariesInfo,
    }),
    shallowEqual
  );

  const closePopUp = () => {
    dispatch({
      type: `${NAMESPACE}/setBeneficiaryPopUp`,
      payload: {
        beneficiaryPopUp: false,
      },
    });
  };

  const confirm = async () => {
    if (beneficiaryInfo) {
      await dispatch({
        type: `${NAMESPACE}/fillBeneficiary`,
        payload: {
          beneficiaryInfo,
        },
      });
    }
    dispatch({
      type: `${NAMESPACE}/setBeneficiaryPopUp`,
      payload: {
        beneficiaryPopUp: false,
      },
    });
  };

  const getRowKey = (data) => data?.policyId + data?.clientId;

  return (
    <CommonModal
      visible={beneficiaryPopUp}
      onCancel={closePopUp}
      onConfirm={confirm}
      onReturn={closePopUp}
      confirmAuth={true}
      returnAuth={true}
      width="76%"
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>Client Scroll</div>
        <Table
          rowKey={(row) => getRowKey(row)}
          columns={Columns}
          dataSource={beneficiariesInfo || []}
          scroll={{ x: true }}
          style={{ whiteSpace: 'nowrap' }}
          pagination={{
            pageSize: 5,
            hideOnSinglePage: true,
            size: 'small',
          }}
          rowSelection={{
            type: 'radio',
            onChange: (_, item) => setBeneficiaryInfo(item?.[0]),
          }}
        />
      </div>
    </CommonModal>
  );
};

export default BeneficiaryPop;
