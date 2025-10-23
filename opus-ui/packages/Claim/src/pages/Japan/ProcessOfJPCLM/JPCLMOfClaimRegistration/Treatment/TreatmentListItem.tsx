import React, { PureComponent } from 'react';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import ProcedureList from '../Procedure/ProcedureList';

class TreatmentListItem extends PureComponent {
  render() {
    const { incidentId, treatmentId, treatmentNo, dataEditable, handleDelete } = this.props;

    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
        })} No. ${treatmentNo}`}
        bordered={false}
        style={{ width: '100%', marginBottom: '10px' }}
        extra={
          <div>
            {dataEditable && (
              <ButtonOfSmall
                icon="close"
                handleClick={() => handleDelete({ incidentId, treatmentId })}
              />
            )}
          </div>
        }
      >
        <TreatmentListItemOfBasicInfo
          incidentId={incidentId}
          treatmentId={treatmentId}
          dataEditable={dataEditable}
        />
        <ProcedureList
          incidentId={incidentId}
          treatmentId={treatmentId}
          dataEditable={dataEditable}
        />
      </Card>
    );
  }
}

export default TreatmentListItem;
