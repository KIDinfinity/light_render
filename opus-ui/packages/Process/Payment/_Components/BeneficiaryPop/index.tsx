import React, { useState } from 'react';
import { Table, notification } from 'antd';
import Columns from './Columns';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import CommonModal from 'basic/components/CommonModal';
import styles from './style.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const BeneficiaryPop = ({ NAMESPACE }: any) => {
  const dispatch = useDispatch();
  const [beneficiaryInfo, setBeneficiaryInfo] = useState<any>(null);

  const { isShow, clientInfoList, availableClientIds = [], mandatory } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      isShow: modelnamespace?.paymentModal?.beneficiaryPopUp?.isShow,
      clientInfoList: modelnamespace?.paymentModal?.c360PolicyInfo?.clientInfoList,
      availableClientIds: modelnamespace?.paymentModal?.beneficiaryPopUp?.availableClientIds,
      mandatory: modelnamespace?.paymentModal?.beneficiaryPopUp?.mandatory,
    }),
    shallowEqual
  );

  const closePopUp = () => {
    dispatch({
      type: `${NAMESPACE}/paymentFillBeneficiary`,
      payload: {
        beneficiaryInfo: false,
      },
    });
    dispatch({
      type: `${NAMESPACE}/paymentSetBeneficiaryPopUp`,
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
      type: `${NAMESPACE}/paymentFillBeneficiary`,
      payload: {
        beneficiaryInfo,
      },
    });
    dispatch({
      type: `${NAMESPACE}/paymentSetBeneficiaryPopUp`,
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
