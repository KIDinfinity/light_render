import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import ProcedureList from '../Procedure/ProcedureList';
import InvoiceList from '../Invoice/InvoiceList';
import MainBenefitList from '../MainBenefit/MainBenefitList';
import styles from './TreatmentListItem.less';

@connect()
class TreatmentItem extends Component {
  state = {
    cardStatus: true, // 面板的显示状态，true为打开状态，false为收起状态
  };

  handleDelete = () => {
    const { dispatch, treatmentId, incidentId }: any = this.props;

    dispatch({
      type: 'daOfClaimCaseController/removeTreatmentItem',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  onClose = () => {
    this.setState({
      cardStatus: false,
    });
  };

  onOpen = () => {
    this.setState({
      cardStatus: true,
    });
  };

  render() {
    const { incidentId, treatmentId, treatmentNo }: any = this.props;

    return (
      <div className={styles.treatmentItem}>
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <Card
              title={`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
              })} No. ${treatmentNo}`}
              bordered={false}
              style={{ width: '100%' }}
            >
              <TreatmentListItemOfBasicInfo incidentId={incidentId} treatmentId={treatmentId} />
              <MainBenefitList treatmentId={treatmentId} />
              <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
            </Card>
          </Col>
          <Col span={12}>
            <InvoiceList incidentId={incidentId} treatmentId={treatmentId} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TreatmentItem;
