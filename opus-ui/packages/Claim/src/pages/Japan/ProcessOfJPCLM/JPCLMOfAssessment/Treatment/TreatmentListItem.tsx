import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import DeleteButton from 'claim/components/DeleteButton';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import TreatmentListItemOfPayableList from './TreatmentListItemOfPayableList';
import ProcedureList from '../Procedure/ProcedureList';
import OtherProcedureList from '../OtherProcedure/OtherProcedureList';
import JPMedicineTreatmentList from '../Medicine/JPMedicineTreatmentList';

@connect(({ claimEditable }) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class TreatmentListItem extends PureComponent {
  handleDelete = () => {
    const { dispatch, treatmentId, incidentId } = this.props;

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/removeTreatmentItem',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  render() {
    const { incidentId, treatmentId, treatmentNo, taskNotEditable } = this.props;
    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
        })} ${treatmentNo}`}
        bordered={false}
        style={{ width: '100%', marginBottom: '10px' }}
        extra={taskNotEditable ? undefined : <DeleteButton handleClick={this.handleDelete} />}
      >
        <TreatmentListItemOfPayableList incidentId={incidentId} treatmentId={treatmentId} />
        <TreatmentListItemOfBasicInfo incidentId={incidentId} treatmentId={treatmentId} />
        <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
        <OtherProcedureList incidentId={incidentId} treatmentId={treatmentId} />
        <JPMedicineTreatmentList incidentId={incidentId} treatmentId={treatmentId} />
      </Card>
    );
  }
}

export default TreatmentListItem;
