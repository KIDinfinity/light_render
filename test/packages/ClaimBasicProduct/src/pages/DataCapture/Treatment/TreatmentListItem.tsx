import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { deleteWarning, SectionID } from '@/components/sectionWarning/index';
import TreatmentListItemOfShort from './TreatmentListItemOfShort';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import ProcedureList from '../Procedure/ProcedureList';
import InvoiceList from '../Invoice/InvoiceList';
import styles from './TreatmentListItem.less';

@connect(({ bpOfDataCaptureController, claimEditable }: any, { treatmentId }: any) => ({
  treatmentNo: bpOfDataCaptureController.claimEntities.treatmentListMap[treatmentId].treatmentNo,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class TreatmentItem extends PureComponent {
  domRef = React.createRef();

  sectionRef = React.createRef();

  state = {
    cardStatus: true, // 面板的显示状态，true为打开状态，false为收起状态
  };

  handleDelete = () => {
    const { dispatch, treatmentId, incidentId } = this.props;
    deleteWarning({
      domRef: this.domRef,
      sectionRef: this.sectionRef,
      sectionID: SectionID.Treatment,
    }).then(() => {
      dispatch({
        type: 'bpOfDataCaptureController/removeTreatmentItem',
        payload: {
          incidentId,
          treatmentId,
        },
      });
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
    const { incidentId, treatmentId, treatmentNo, total, taskNotEditable } = this.props;
    const { cardStatus } = this.state;

    return (
      <div className={styles.treatmentItem} ref={this.domRef}>
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
                    {!taskNotEditable && (
                      <ButtonOfSmall icon="close" handleClick={this.handleDelete} />
                    )}
                  </div>
                }
                ref={this.sectionRef}
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
