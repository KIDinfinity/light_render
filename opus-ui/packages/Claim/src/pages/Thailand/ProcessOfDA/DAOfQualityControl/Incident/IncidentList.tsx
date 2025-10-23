import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentListItem from './IncidentListItem';

interface IProps {
  incidentList?: string[];
}
@connect(({ daOfClaimCaseController }: any) => ({
  incidentList: lodash.get(daOfClaimCaseController, 'claimProcessData.incidentList', []),
}))
class IncidentList extends Component<IProps> {
  render() {
    const { incidentList } = this.props;

    return (
      <div>
        {lodash.map(lodash.compact(incidentList), (item, index) => (
          <div key={`${item}-${index}`}>
            <IncidentListItem
              total={(incidentList as []).length}
              incidentNo={index + 1}
              incidentId={item}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default IncidentList;
