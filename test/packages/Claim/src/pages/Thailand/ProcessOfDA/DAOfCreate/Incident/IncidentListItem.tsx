import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentListItemOfExpend from './IncidentListItemOfExpend';
import styles from './IncidentListItem.less';

interface IncidentItemProps {
  total: number;
  incidentNo: number;
  incidentId: string;
}

@connect(({ daProcessController }: any, { incidentId }: any) => ({
  incidentItem: daProcessController.claimEntities.incidentListMap[incidentId],
}))
class IncidentItem extends PureComponent<IncidentItemProps> {
  render() {
    const { incidentItem, incidentId, incidentNo }: any = this.props;
    const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

    return (
      <div className={styles.incidentItem}>
        <IncidentListItemOfExpend
          incidentId={incidentId}
          incidentNo={incidentNo}
          hasTreatment={hasTreatment}
        />
      </div>
    );
  }
}

export default IncidentItem;
