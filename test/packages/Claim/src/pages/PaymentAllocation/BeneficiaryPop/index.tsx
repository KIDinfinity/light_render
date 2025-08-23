import React, { useState } from 'react';
import { Table, notification } from 'antd';
import Columns from './Columns';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonModal from 'basic/components/CommonModal';
import styles from './style.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const NAMESPACE = 'paymentAllocation';
const BeneficiaryPop = () => {
  const dispatch = useDispatch();
  const [beneficiaryInfo, setBeneficiaryInfo] = useState<any>(null);

  const { isShow, clientInfoList, availableClientIds = [], mandatory } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      isShow: modelnamespace.beneficiaryPopUp?.isShow,
      clientInfoList: modelnamespace.claimData?.c360PolicyInfo?.clientInfoList,
      availableClientIds: modelnamespace.beneficiaryPopUp?.availableClientIds,
      mandatory: modelnamespace.beneficiaryPopUp?.mandatory,
    }),
    shallowEqual
  );

  const closePopUp = () => {
    dispatch({
      type: `${NAMESPACE}/fillBeneficiary`,
      payload: {
        beneficiaryInfo: false,
      },
    });
    dispatch({
      type: `${NAMESPACE}/setBeneficiaryPopUp`,
      payload: {
        beneficiaryPopUp: {
          isShow: false,
        },
      },
    });
  };

  const confirm = async () => {
    if (mandatory && !beneficiaryInfo) {
      notification.warning({
        message: formatMessageApi(
          {
            Label_COM_WarningMessage: 'MSG_000011',
          },
          'Selection'
        ),
      });
      return;
    }
    dispatch({
      type: `${NAMESPACE}/fillBeneficiary`,
      payload: {
        beneficiaryInfo,
      },
    });
    dispatch({
      type: `${NAMESPACE}/setBeneficiaryPopUp`,
      payload: {
        beneficiaryPopUp: {
          isShow: false,
        },
      },
    });
  };

  return (
    <CommonModal
      visible={isShow}
      onCancel={closePopUp}
      onConfirm={confirm}
      onReturn={closePopUp}
      confirmAuth={true}
      maskClosable={!mandatory}
      returnAuth={!mandatory}
      width="76%"
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>Client Scroll</div>
        <Table
          rowKey={(row) => row.clientId}
          columns={Columns}
          dataSource={
            clientInfoList?.filter((clientInfo) =>
              availableClientIds.some((clientId) => clientId === clientInfo.clientId)
            ) || []
          }
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
