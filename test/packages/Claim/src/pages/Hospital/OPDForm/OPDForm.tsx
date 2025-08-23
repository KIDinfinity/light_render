import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import FormItem from '../FormItem/FormItem';
import DiagnosisForm from './DiagnosisForm';
import MainBenefitForm from './MainBenefitForm';
import styles from './index.less';

interface IProps {
  idx: number;
  causeOfIncident: string;
  causeOfIncidentList: any[];
}

// @ts-ignore
@connect(({ hospitalDetailController }: any, { idx }: { idx: string | number }) => ({
  causeOfIncident: lodash.get(
    hospitalDetailController,
    `invoiceInforData[${idx}]registration.incidentList[0].causeOfIncident`
  ),
  causeOfIncidentList: lodash.get(hospitalDetailController, 'causeOfIncident'),
}))
class OPDForm extends Component<IProps> {
  render() {
    const { causeOfIncidentList, causeOfIncident, idx } = this.props;
    const causeOfIncidentObj = lodash.find(
      causeOfIncidentList,
      (item: any) => item.dictCode === causeOfIncident
    );
    const causeOfIncidentText = causeOfIncidentObj ? causeOfIncidentObj.dictName : causeOfIncident;
    return (
      <Row className={styles.opdForm} type="flex" gutter={16}>
        <Col span={24}>
          <FormItem labelText="Cause of Incident" ctnText={causeOfIncidentText} />
        </Col>
        <Col span={14}>
          <DiagnosisForm idx={idx} />
        </Col>
        <Col span={10}>
          <MainBenefitForm idx={idx} />
        </Col>
      </Row>
    );
  }
}

export default OPDForm;
