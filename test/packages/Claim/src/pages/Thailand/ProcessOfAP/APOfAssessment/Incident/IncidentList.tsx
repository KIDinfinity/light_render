import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentListItem from './IncidentListItem';

interface IProps {
  incidentList?: string[];
}
@connect(({ apOfClaimAssessmentController }: any) => ({
  incidentList: lodash.get(apOfClaimAssessmentController, 'claimProcessData.incidentList', []),
}))
class IncidentList extends Component<IProps> {
  render() {
    const { incidentList } = this.props;

    return (
      <div>
        {lodash.map(lodash.compact(incidentList), (item, index) => (
          <IncidentListItem key={item} incidentNo={index + 1} incidentId={item} />
        ))}
      </div>
    );
  }
}

export default IncidentList;
