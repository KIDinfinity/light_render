import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import TreatmentListItem from './TreatmentListItem';
import styles from './TreatmentList.less';

@connect(({ bpOfClaimAssessmentController }, { incidentId }) => ({
  treatmentList:
    bpOfClaimAssessmentController.claimEntities.incidentListMap[incidentId].treatmentList,
}))
class TreatmentList extends PureComponent {
  render() {
    const { treatmentList, incidentId } = this.props;

    return (
      <div className={styles.treatmentListWrap}>
        {lodash.isArray(treatmentList) &&
          lodash.map(treatmentList, (item) => (
            <TreatmentListItem incidentId={incidentId} treatmentId={item} key={item} />
          ))}
      </div>
    );
  }
}

export default TreatmentList;
