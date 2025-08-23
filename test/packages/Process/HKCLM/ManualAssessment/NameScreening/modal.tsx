import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Modal, Table, Button } from 'antd';

import { useSelector, useDispatch } from 'dva';
import moment from 'moment';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const columns = [
  {
    title: formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' }),
    dataIndex: 'policyNo',
    key: 'policyNo',
  },
  {
    title: formatMessageApi({ Label_BIZ_Individual: 'ClientID' }),
    dataIndex: 'clientId',
    key: 'clientId',
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'Relationship' }),
    dataIndex: 'relationship',
    key: 'relationship',
    render: (text: string) => formatMessageApi({ Dropdown_CLM_CustomerType: text }),
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'FullName' }),
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'ChineseName' }),
    dataIndex: 'chineseName',
    key: 'chineseName',
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
      moment(text).isValid() ? moment(text).format('DD/MM/YYYY HH:mm:ss') : text,
  },
];

const handleRefresh = async ({ dispatch, processInstanceId, taskId, assignee }: any) => {
  const params = await dispatch({
    type: `${NAMESPACE}/getDataForSubmit`,
  });

  dispatch({
    type: `${NAMESPACE}/refreshNameScreening`,
    payload: { ...params, processInstanceId, taskId, assignee },
  });
};

const handleFrcm = async (dispatch: any) => {
  const url: any = await dispatch({
    type: `${NAMESPACE}/fcrmNameScreening`,
  });

  if (url) {
    window.open(url, '_blank', 'noreferrer=true');
  }
};

const NameScreeningModal = ({ setOpen, open }: any) => {
  const dataSource =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimProcessData?.claimAmlNameScreeningDOList
    ) || [];
  const processInstanceId = useSelector(
    ({ processTask }: any) => processTask.getTask?.processInstanceId
  );
  const taskId = useSelector(({ processTask }: any) => processTask.getTask?.taskId);
  const assignee = useSelector(({ processTask }: any) => processTask.getTask?.assignee);
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const dispatch = useDispatch();
  const footer = (
    <div className={styles.footer}>
      {!taskNotEditable && (
        <Button
          onClick={() => {
            handleRefresh({ dispatch, processInstanceId, taskId, assignee });
          }}
        >
          {formatMessageApi({
            Label_BPM_Button: 'Refresh',
          })}
        </Button>
      )}
      <Button
        onClick={() => {
          handleFrcm(dispatch);
        }}
      >
        {formatMessageApi({
          Label_BPM_Button: 'FCRM',
        })}
      </Button>
    </div>
  );

  return (
    <Modal
      className={styles.NameScreeningModal}
      width={'60%'}
      title={formatMessageApi({ Label_BIZ_Claim: 'NameScreening' })}
      visible={open}
      onCancel={() => setOpen(false)}
      footer={footer}
    >
      <Table columns={columns} dataSource={dataSource} pagination={false} rowKey={'id'} />
    </Modal>
  );
};

export default NameScreeningModal;
