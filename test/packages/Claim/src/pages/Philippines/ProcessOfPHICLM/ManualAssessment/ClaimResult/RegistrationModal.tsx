import React from 'react';
import { Modal, Button, Table } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './RegistrationModal.less';

const footer = (handleOk: React.MouseEventHandler<HTMLElement>, handleCancel: React.MouseEventHandler<HTMLElement>) => {
    return (
      <div className={styles.footer}>
        <Button type="primary" onClick={handleOk}>
          {formatMessageApi({
            Label_BIZ_Claim: 'form.confirm',
          })}
        </Button>
        <Button onClick={handleCancel}>
          {formatMessageApi({
            Label_BIZ_Claim: 'form.cancel',
          })}
        </Button>
      </div>
    );
  }

const RegistrationModal = ({ showModal, handleCancel, handleOk, individualPolicys }: any) => {

    const columns: any[] = [{
        title: formatMessageApi({Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no'}),
        dataIndex: 'policyNo',
        key: 'policyNo',
    }, {
        title: formatMessageApi({Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.product'}),
        dataIndex: 'product',
        key: 'product',
    },{
      title: formatMessageApi({Label_BIZ_Claim: 'Selected'}),
      dataIndex: 'selectIndicator',
      key: 'selectIndicator',
    },
    {
        title: formatMessageApi({Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-time'}),
        dataIndex: 'submissionDate',
        key: 'submissionDate',
        render: (text: string) => moment(text).isValid() ? moment(text)?.format('L') : text
    }, {
        title: formatMessageApi({Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name'}),
        dataIndex: 'diagnosisCode',
        key: 'diagnosisCode'
    }, {
        title: formatMessageApi({Label_BIZ_Claim: 'DateOfDeath'}),
        dataIndex: 'dateTimeOfDeath',
        key: 'dateTimeOfDeath',
        render: (text: string) => lodash.map(text, (item: any) => moment(item).isValid() ? moment(item)?.format('L') : item)
    }]
    return (<Modal
                className={styles.registration}
                visible={showModal}
                title={formatMessageApi({Label_BIZ_Claim: 'MessageBeforeRegister'})}
                onCancel={handleCancel}
                footer={footer(handleOk, handleCancel)}
                width="60%"
                bodyStyle={{
                    zIndex: 1000,
                }}
            >
                <Table columns={columns} dataSource={individualPolicys} pagination={false} rowKey='id' />
            </Modal>)
}

export default RegistrationModal;
