import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentListItem from './IncidentListItem';

@connect(({ bpOfClaimAssessmentController }: any) => ({
  incidentList: lodash.get(bpOfClaimAssessmentController, 'claimProcessData.incidentList'),
}))
class IncidentList extends PureComponent {
  render() {
    const { incidentList }: any = this.props;

    return (
      <div>
        {lodash.isArray(incidentList) &&
          incidentList.length > 0 &&
          lodash.map(incidentList, (item) => (
            <IncidentListItem key={item} total={incidentList.length} incidentId={item} />
          ))}
      </div>
    );
  }
}

export default IncidentList;
