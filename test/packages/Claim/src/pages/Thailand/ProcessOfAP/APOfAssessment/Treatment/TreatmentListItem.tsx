import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import MainBenefitList from '../MainBenefit/MainBenefitList';
import ProcedureList from '../Procedure/ProcedureList';

class TreatmentItem extends PureComponent {
  render() {
    const { incidentId, treatmentId, treatmentNo }: any = this.props;

    return (
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
    );
  }
}

export default TreatmentItem;
