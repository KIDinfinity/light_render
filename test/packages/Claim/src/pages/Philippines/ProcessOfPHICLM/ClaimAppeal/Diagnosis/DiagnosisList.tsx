import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { withContextData } from '@/components/_store';
import DiagnosisListItem from './DiagnosisListItem';

import styles from './DiagnosisList.less';

@connect(
  (
    { PHCLMOfAppealCaseController, claimEditable }: any,
    { incidentId, withData: { caseType } }: any
  ) => ({
    diagnosisList: caseType
      ? lodash.get(
          PHCLMOfAppealCaseController,
          `${caseType}.claimEntities.incidentListMap.${incidentId}.diagnosisList`
        )
      : lodash.get(
          PHCLMOfAppealCaseController,
          `claimEntities.incidentListMap.${incidentId}.diagnosisList`
        ),
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class DiagnosisList extends PureComponent {
  render() {
    const {
      incidentId,
      diagnosisList,
      hasTreatment,
      taskNotEditable: notEditable,
      withData,
    }: any = this.props;
    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;
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

export default withContextData(DiagnosisList);
