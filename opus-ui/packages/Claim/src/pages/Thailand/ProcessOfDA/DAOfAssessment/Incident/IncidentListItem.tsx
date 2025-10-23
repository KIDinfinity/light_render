import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentListItemOfShort from './IncidentListItemOfShort';
import IncidentListItemOfExpend from './IncidentListItemOfExpend';
import styles from './IncidentListItem.less';

interface IncidentItemProps {
  total: number;
  incidentNo: number;
  incidentId: string;
}

@connect(({ daOfClaimAssessmentController }: any, { incidentId }: any) => ({
  incidentItem: daOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
}))
class IncidentItem extends PureComponent<IncidentItemProps> {
  render() {
    const { incidentItem, incidentId }: any = this.props;
    const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

    return (
      <div className={styles.incidentItem}>
        {hasTreatment ? (
          <IncidentListItemOfExpend
            incidentId={incidentId}
            incidentNo={incidentItem?.incidentNo}
            hasTreatment={hasTreatment}
          />
        ) : (
          <IncidentListItemOfShort
            incidentId={incidentId}
            incidentNo={incidentItem?.incidentNo}
            hasTreatment={hasTreatment}
          />
        )}
      </div>
    );
  }
}

export default IncidentItem;
