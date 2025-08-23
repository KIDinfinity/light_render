import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TreatmentListItemOfShort from './TreatmentListItemOfShort';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import ProcedureList from '../Procedure/ProcedureList';
import InvoiceList from '../Invoice/InvoiceList';
import styles from './TreatmentListItem.less';

@connect(({ hkProcessController, claimEditable }: any, { treatmentId }: any) => ({
  treatmentNo: hkProcessController.claimEntities.treatmentListMap[treatmentId].treatmentNo,
}))
class TreatmentItem extends PureComponent {
  state = {
    cardStatus: true, // 面板的显示状态，true为打开状态，false为收起状态
  };

  handleDelete = () => {
    const { dispatch, treatmentId, incidentId } = this.props;
    dispatch({
      type: 'hkProcessController/removeTreatmentItem',
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
    const { incidentId, treatmentId, treatmentNo, total } = this.props;
    const { cardStatus } = this.state;

    return (
      <div className={styles.treatmentItem}>
        {!cardStatus && (
          <TreatmentListItemOfShort treatmentId={treatmentId} total={total} onOpen={this.onOpen} />
        )}
        {cardStatus && (
          <Row type="flex" gutter={16}>
            <Col span={12}>
              <Card
                title={`${formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
                })} ${treatmentNo}`}
                bordered={false}
                style={{ width: '100%' }}
                extra={
                  <div className={styles.cardExtra}>
                    <ButtonOfSmall icon="minus" handleClick={this.onClose} />
                    <ButtonOfSmall icon="close" handleClick={this.handleDelete} />
                  </div>
                }
              >
                <TreatmentListItemOfBasicInfo incidentId={incidentId} treatmentId={treatmentId} />
                <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
              </Card>
            </Col>
            <Col span={12}>
              <InvoiceList incidentId={incidentId} treatmentId={treatmentId} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default TreatmentItem;
