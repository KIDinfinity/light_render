import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import DiagnosisListItem from './DiagnosisListItem';
import styles from './DiagnosisList.less';

@connect(
  (
    { PHCLMOfClaimAssessmentController, claimEditable, formCommonController }: any,
    { incidentId }: any
  ) => ({
    diagnosisList: lodash.get(
      PHCLMOfClaimAssessmentController,
      `claimEntities.incidentListMap.${incidentId}.diagnosisList`
    ),
    taskNotEditable: claimEditable.taskNotEditable,
    submited: formCommonController.submited,
    claimNo: PHCLMOfClaimAssessmentController.claimProcessData?.claimNo,
  })
)
class DiagnosisList extends PureComponent {
  handleAdd = () => {
    const { dispatch, claimNo, incidentId } = this.props;
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'PHCLMOfClaimAssessmentController/addDiagnosisItem',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  render() {
    const { incidentId, diagnosisList, hasTreatment, taskNotEditable, submited }: any = this.props;

    const isShow = lodash.compact(diagnosisList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.diagnosiCard : ''}>
        {isShow && (
          <div>
            {submited && lodash.isEmpty(diagnosisList) && (
              <ErrorTooltipManual
                manualErrorMessage={formatMessageApi(
                  { Label_COM_WarningMessage: 'ERR_000011' },
                  'Diagnosis item'
                )}
              />
            )}
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
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
            })}
          />
        )}
      </div>
    );
  }
}

export default DiagnosisList;
