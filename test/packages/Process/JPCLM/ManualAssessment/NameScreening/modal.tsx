import React from 'react';
import { Modal, Table, Button } from 'antd';

import { useSelector, useDispatch } from 'dva';
import moment from 'moment';
import Tenant from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const columns = [
  // {
  //   title: formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' }),
  //   dataIndex: 'policyNo',
  //   key: 'policyNo',
  // },
  // {
  //   title: formatMessageApi({ Label_BIZ_Individual: 'ClientID' }),
  //   dataIndex: 'clientId',
  //   key: 'clientId',
  // },
  // {
  //   title: formatMessageApi({ Label_BIZ_Claim: 'Relationship' }),
  //   dataIndex: 'relationship',
  //   key: 'relationship',
  //   render: (text: string) => formatMessageApi({ Dropdown_CLM_CustomerType: text }),
  // },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'FullName' }),
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: formatMessageApi({ Label_BIZ_Individual: 'DOB' }),
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    render: (text: string) => (moment(text).isValid() ? moment(text).format('YYYY/MM/DD') : text),
  },
  {
    title: formatMessageApi({ Label_BIZ_Individual: 'Gender' }),
    dataIndex: 'gender',
    key: 'gender',
    render: (text: string) => formatMessageApi({ Gender: text }),
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'Result' }),
    dataIndex: 'result',
    key: 'result',
    render: (text: string) => formatMessageApi({ Dropdown_CLM_AMLResult: text }),
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'LastChecked' }),
    dataIndex: 'lastCheckedOn',
    key: 'lastCheckedOn',
    render: (text: string) =>
      moment(text).isValid() ? moment(text).format('DD/MM/YYYY HH:MM:SS') : text,
  },
];

const handleRefresh = async ({ dispatch, processInstanceId, taskId }: any) => {
  const params = await dispatch({
    type: 'JPCLMOfClaimAssessment/getDataForSubmit',
  });

  dispatch({
    type: 'JPCLMOfClaimAssessment/refreshNameScreening',
    payload: { ...params, processInstanceId, taskId },
  });
};

const handleFrcm = async (dispatch: any) => {
  const url: any = await dispatch({
    type: 'JPCLMOfClaimAssessment/fcrmNameScreening',
  });

  if (url) {
    window.open(url, '_blank');
  }
};

const NameScreeningModal = ({ setOpen, open }: any) => {
  const { dataSource, processInstanceId, taskId, taskNotEditable } = useSelector((state: any) => ({
    dataSource: state?.JPCLMOfClaimAssessment?.claimProcessData?.claimAmlNameScreeningDOList || [],
    processInstanceId: state?.processTask?.getTask?.processInstanceId,
    taskId: state?.processTask?.getTask?.taskId,
    taskNotEditable: state?.claimEditable.taskNotEditable,
  }));
  const dispatch = useDispatch();
  const footer = (
    <div className={styles.footer}>
      {!taskNotEditable && (
        <Button
          onClick={() => {
            handleRefresh({ dispatch, processInstanceId, taskId });
          }}
        >
          {formatMessageApi({
            Label_BPM_Button: 'Refresh',
          })}
        </Button>
      )}
      <Tenant.JP match={false}>
        <Button
          onClick={() => {
            handleFrcm(dispatch);
          }}
        >
          {formatMessageApi({
            Label_BPM_Button: 'FCRM',
          })}
        </Button>
      </Tenant.JP>
    </div>
  );

  return (
    <Modal
      className={styles.NameScreeningModal}
      width="60%"
      title={formatMessageApi({ Label_BIZ_Claim: 'NameScreening' })}
      visible={open}
      onCancel={() => setOpen(false)}
      footer={footer}
    >
      <Table columns={columns} dataSource={dataSource} pagination={false} rowKey="id" />
    </Modal>
  );
};

export default NameScreeningModal;
