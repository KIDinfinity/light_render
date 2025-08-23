import React, { Component } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { getExistDiagnosisList } from 'claim/pages/utils/selector';
import DiagnosisListItem from './DiagnosisListItem';
import styles from './DiagnosisList.less';
import { VLD_000052, VLD_000110 } from '@/utils/validations';

const mapStateToProps = (
  { JPCLMOfClaimAssessmentController, formCommonController, claimEditable },
  { incidentId }
) => {
  const { claimEntities } = JPCLMOfClaimAssessmentController;
  const incidentItem = claimEntities.incidentListMap[incidentId];
  const { diagnosisListMap } = claimEntities;

  return {
    submited: formCommonController.submited,
    claimNo: JPCLMOfClaimAssessmentController.claimProcessData.claimNo,
    diagnosisList: incidentItem.diagnosisList,
    existDiagnosisList: getExistDiagnosisList(incidentId, diagnosisListMap),
    taskNotEditable: claimEditable.taskNotEditable,
  };
};
@connect(mapStateToProps)
class DiagnosisList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      submited: nextSubmited,
      claimNo: nextClaimNo,
      diagnosisList: nextDiagonsisList,
      existDiagnosisList: nextExistDiagnosisList,
    } = nextProps;
    const { submited, claimNo, diagnosisList, existDiagnosisList } = this.props;

    return (
      !(submited === nextSubmited) ||
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(diagnosisList, nextDiagonsisList) ||
      !lodash.isEqual(existDiagnosisList, nextExistDiagnosisList)
    );
  }

  handleAdd = () => {
    const { dispatch, claimNo, incidentId } = this.props;
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addDiagnosisItem',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  render() {
    const { incidentId, diagnosisList, submited, existDiagnosisList, taskNotEditable } = this.props;
    const diagnosisTypeSelectMain = VLD_000110(existDiagnosisList);

    const isShow = lodash.compact(diagnosisList).length > 0 || !taskNotEditable;
    return (
      <div className={isShow ? styles.diagnosiCard : ''}>
        {isShow && (
          <div>
            {VLD_000052(diagnosisList, submited) && (
              <ErrorTooltipManual
                manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000072' })}
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
                diagnosisTypeSelectMain={diagnosisTypeSelectMain}
                existDiagnosisList={existDiagnosisList}
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
