import React, { Component } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { checkCriticalIllnessByEntities } from 'claimBasicProduct/pages/validators';
import { getExistDiagnosisCode, getExistCriticalIllness } from 'claim/pages/utils/selector';
import styles from './DiagnosisList.less';
import DiagnosisListItem from './DiagnosisListItem';

const mapStateToProps = (
  { bpOfDataCaptureController, formCommonController, claimEditable }: any,
  { incidentId }: any
) => {
  const { claimEntities } = bpOfDataCaptureController;
  const incidentItem = claimEntities.incidentListMap[incidentId];
  const { diagnosisListMap } = claimEntities;

  return {
    submited: formCommonController.submited,
    claimNo: bpOfDataCaptureController.claimProcessData.claimNo,
    claimTypeArray: formUtils.queryValue(incidentItem.claimTypeArray),
    diagnosisList: incidentItem.diagnosisList,
    existDiagnosisCode: getExistDiagnosisCode(incidentId, diagnosisListMap),
    existCriticalIllness: getExistCriticalIllness(incidentId, diagnosisListMap),
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class DiagnosisList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      submited: nextSubmited,
      claimNo: nextClaimNo,
      claimTypeArray: nextClaimTypeArray,
      diagnosisList: nextDiagonsisList,
      existDiagnosisCode: nextExistDiagnosisCode,
      existCriticalIllness: nextExistCriticalIllness,
    } = nextProps;
    const {
      submited,
      claimNo,
      claimTypeArray,
      diagnosisList,
      existDiagnosisCode,
      existCriticalIllness,
    } = this.props;

    return (
      !(submited === nextSubmited) ||
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(claimTypeArray, nextClaimTypeArray) ||
      !lodash.isEqual(diagnosisList, nextDiagonsisList) ||
      !lodash.isEqual(existDiagnosisCode, nextExistDiagnosisCode) ||
      !lodash.isEqual(existCriticalIllness, nextExistCriticalIllness)
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
      type: 'bpOfDataCaptureController/addDiagnosisItem',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  render() {
    const {
      submited,
      hasTreatment,
      incidentId,
      claimTypeArray,
      diagnosisList,
      existDiagnosisCode,
      existCriticalIllness,
      taskNotEditable,
    } = this.props;
    const isReauired = checkCriticalIllnessByEntities(claimTypeArray, existCriticalIllness);
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
            {submited && !isReauired && (
              <ErrorTooltipManual manualErrorMessage="Require at least one critical diagnosis when claim type contains Critical Illness." />
            )}
            {lodash.map(lodash.compact(diagnosisList), (item) => (
              <DiagnosisListItem
                incidentId={incidentId}
                diagnosisId={item}
                key={item}
                hasTreatment={hasTreatment}
                existDiagnosisCode={existDiagnosisCode}
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
