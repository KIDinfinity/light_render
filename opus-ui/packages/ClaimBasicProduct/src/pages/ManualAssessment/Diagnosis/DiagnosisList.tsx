import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DiagnosisListItem from './DiagnosisListItem';
import styles from './DiagnosisList.less';

@connect(({ bpOfClaimAssessmentController, claimEditable }: any, { incidentId }: any) => ({
  diagnosisList: lodash.get(
    bpOfClaimAssessmentController,
    `claimEntities.incidentListMap.${incidentId}.diagnosisList`
  ),
  taskNotEditable: claimEditable.taskNotEditable,
}))
class DiagnosisList extends PureComponent {
  render() {
    const { incidentId, diagnosisList, hasTreatment, taskNotEditable }: any = this.props;

    const isShow = lodash.compact(diagnosisList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.diagnosiCard : ''}>
        {isShow && (
          <div>
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
              })}
            </h3>
            {lodash.map(lodash.compact(diagnosisList), (item) => (
              <DiagnosisListItem
                incidentId={incidentId}
                diagnosisId={item}
                key={item}
                hasTreatment={hasTreatment}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default DiagnosisList;
