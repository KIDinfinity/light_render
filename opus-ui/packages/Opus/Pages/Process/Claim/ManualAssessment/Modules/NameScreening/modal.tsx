import React from 'react';
import { Modal, Table, Button } from 'antd';

import { useSelector, useDispatch } from 'dva';
import moment from 'moment';
import Tenant from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { NAMESPACE } from '../../activity.config';
import { Form } from 'antd';
import { FormItemInput, FormItemDatePicker, FormItemSelect } from 'basic/components/Form';
import { formUtils, FormAntCard } from 'basic/components/Form';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { tenant, Region } from '@/components/Tenant';

const format = (() => {
  return tenant.region({ [Region.JP]: 'YYYY/MM/DD HH:mm:ss', notMatch: 'DD/MM/YYYY HH:mm:ss' });
})();
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
    title: formatMessageApi({ Label_BIZ_Claim: 'result' }),
    dataIndex: 'result',
    key: 'result',
    render: (text: string) => formatMessageApi({ Dropdown_CLM_AMLResult: text }),
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'Actimize' }),
    dataIndex: 'source',
    key: 'source',
    render: (text: string) =>
      formatMessageApi({ Dropdown_COM_YN: text === 'actimizeApi' ? 'Y' : 'N' }),
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'LastChecked' }),
    dataIndex: 'lastCheckedOn',
    key: 'lastCheckedOn',
    render: (text: string) => (moment(text).isValid() ? moment(text).format(format) : text),
  },
];

const handleRefresh = async ({ dispatch, processInstanceId, taskId, setOpen }: any) => {
  const params = await dispatch({
    type: `${NAMESPACE}/getDataForSubmit`,
  });

  await dispatch({
    type: `${NAMESPACE}/refreshNameScreening`,
    payload: { ...params, processInstanceId, taskId },
    setOpen,
  });

  await dispatch({
    type: `${NAMESPACE}/saveSnapshot`,
  });
};

const handleFrcm = async (dispatch: any) => {
  const url: any = await dispatch({
    type: `${NAMESPACE}/fcrmNameScreening`,
  });

  if (url) {
    window.open(url, '_blank');
  }
};

const NameScreeningModal = ({ setOpen, open, form }: any) => {
  const { dataSource, processInstanceId, taskId, taskNotEditable } = useSelector((state: any) => ({
    dataSource: state?.[NAMESPACE]?.claimProcessData?.claimAmlNameScreeningDOList || [],
    processInstanceId: state?.processTask?.getTask?.processInstanceId,
    taskId: state?.processTask?.getTask?.taskId,
    taskNotEditable: state?.claimEditable.taskNotEditable,
  }));
  const dispatch = useDispatch();
  const footer = (
    <div className={styles.footer}>
      {!taskNotEditable && (
        <>
          <Button className={styles.closebtn} onClick={() => setOpen(false)}>
            {formatMessageApi({
              Label_BPM_Button: 'Close',
            })}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              handleRefresh({ dispatch, processInstanceId, taskId, setOpen });
            }}
          >
            {formatMessageApi({
              Label_BPM_Button: 'Refresh',
            })}
          </Button>
        </>
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
      closable={taskNotEditable}
      onCancel={() => setOpen(false)}
      footer={footer}
    >
      <Table columns={columns} dataSource={dataSource} pagination={false} rowKey="id" />
      {/* <Form layout="horizontal">
        <Row>
          <Col span={6}>
            <FormItemInput
              disabled
              labelId="fullName"
              labelTypeCode="Label_CLM_Opus"
              form={form}
              formName="fullName"
            />
          </Col>
          <Col span={6}>
            <FormItemDatePicker
              disabled
              labelId="dateOfBirth"
              labelTypeCode="Label_BIZ_Individual"
              form={form}
              formName="dateOfBirth"
            />
          </Col>
          <Col span={4}>
            <FormItemSelect
              disabled
              labelId="gender"
              labelTypeCode="Label_BIZ_Individual"
              form={form}
              formName="gender"
              dictTypeCode="Gender"
            />
          </Col>
          <Col span={4}>
            <FormItemSelect
              disabled
              labelId="result"
              labelTypeCode="Label_BIZ_Claim"
              form={form}
              formName="result"
              dictTypeCode="Dropdown_CLM_AMLResult"
            />
          </Col>
          <Col span={4}>
            <FormItemDatePicker
              disabled
              labelId="LastChecked"
              labelTypeCode="Label_BIZ_Claim"
              form={form}
              formName="lastCheckedOn"
              format="YYYY/MM/DD HH:mm:ss"
            />
          </Col>
        </Row>
      </Form> */}
    </Modal>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  item: modelnamepsace?.claimProcessData?.claimAmlNameScreeningDOList?.[0] || {},
}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(NameScreeningModal)
);
