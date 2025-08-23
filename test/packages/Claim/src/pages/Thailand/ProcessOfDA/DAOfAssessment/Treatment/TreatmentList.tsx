import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import TreatmentListItem from './TreatmentListItem';
import styles from './TreatmentList.less';

@connect(({ daOfClaimAssessmentController }, { incidentId }) => ({
  treatmentList:
    daOfClaimAssessmentController.claimEntities.incidentListMap[incidentId]?.treatmentList,
}))
class TreatmentList extends Component {
  render() {
    const { treatmentList, incidentId } = this.props;

    return (
      <div className={styles.treatmentListWrap}>
        {lodash.isArray(treatmentList) &&
          lodash.map(treatmentList, (item, index) => (
            <TreatmentListItem
              incidentId={incidentId}
              treatmentId={item}
              treatmentNo={index + 1}
              key={item}
            />
          ))}
      </div>
    );
  }
}

export default TreatmentList;
