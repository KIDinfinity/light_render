import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentListItem from './IncidentListItem';

@connect(({ PHCLMOfAppealCaseController }: any) => {
  const incidentList = lodash.get(PHCLMOfAppealCaseController, 'claimProcessData.incidentList', []);
  const lastIncidentId = incidentList[incidentList?.length - 1];

  return { incidentList, lastIncidentId };
})
class IncidentList extends PureComponent {
  render() {
    const { incidentList, lastIncidentId }: any = this.props;

    return (
      <div>
        {lodash.isArray(incidentList) &&
          incidentList.length > 0 &&
          lodash.map(incidentList, (item) => (
            <IncidentListItem
              key={item}
              total={incidentList.length}
              incidentId={item}
              lastIncidentId={lastIncidentId}
            />
          ))}
      </div>
    );
  }
}

export default IncidentList;
