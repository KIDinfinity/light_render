import React, { PureComponent } from 'react';
import { Card, Col, Row } from 'antd';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DeleteButton from 'claim/components/DeleteButton';
import IncidentListItemOfGroupPayableList from './IncidentListItemOfGroupPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';
import styles from './IncidentListItem.less';

@connect(({ JPCLMOfClaimAssessmentController, claimEditable }, { incidentId }) => ({
  incidentItem: JPCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
  taskNotEditable: claimEditable.taskNotEditable,
}))
class IncidentListItem extends PureComponent {
  state = {
    leftOffsetHeight: 0,
  };

  handleDelete = () => {
    const { dispatch, incidentId } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/removeIncidentItem',
      payload: {
        incidentId,
      },
    });
  };

  updateLeftRefHeight = (ref) => {
    const leftOffsetHeight = ref?.offsetHeight;
    const { leftOffsetHeight: oldOffsetHeight } = this.state;
    if (leftOffsetHeight !== oldOffsetHeight) {
      this.setState({
        leftOffsetHeight,
      });
    }
  };

  render() {
    const { incidentId, incidentNo, taskNotEditable } = this.props;
    const { leftOffsetHeight } = this.state;

    return (
      <div className={styles.incidentItem}>
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <div
              ref={(ref) => {
                if (ref) {
                  this.updateLeftRefHeight(ref);
                }
              }}
            >
              <Card
                className={styles.left}
                title={`${formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
                })} ${incidentNo}`}
                bordered={false}
                extra={
                  taskNotEditable ? undefined : <DeleteButton handleClick={this.handleDelete} />
                }
              >
                <IncidentListItemOfGroupPayableList incidentId={incidentId} />
                <IncidentListItemOfBasicInfo incidentId={incidentId} />
                <DiagnosisList incidentId={incidentId} />
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <TreatmentList incidentId={incidentId} leftOffsetHeight={leftOffsetHeight} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default IncidentListItem;
