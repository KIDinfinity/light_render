import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import memoizeOne from 'memoize-one';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { getExistDiagnosisList } from 'claim/pages/utils/selector';
import { getDiagnosisSectionError } from 'claim/pages/validators/sectionValidators';
import styles from './DiagnosisList.less';
import DiagnosisListItem from './DiagnosisListItem';

interface IProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  claimNo: string;
  submited: boolean;
  hasTreatment: boolean;
  existDiagnosisList: any;
}

const mapStateToProps = (
  { apOfClaimAssessmentController, formCommonController, claimEditable },
  { incidentId }
) => {
  const { claimEntities } = apOfClaimAssessmentController;
  const incidentItem = claimEntities.incidentListMap[incidentId];
  const { diagnosisListMap } = claimEntities;

  return {
    submited: formCommonController.submited,
    claimNo: apOfClaimAssessmentController.claimProcessData.claimNo,
    diagnosisList: incidentItem.diagnosisList,
    existDiagnosisList: getExistDiagnosisList(incidentId, diagnosisListMap),
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

const getSectionErrorMemoized = memoizeOne(getDiagnosisSectionError);

@connect(mapStateToProps)
class DiagnosisList extends Component<IProps> {
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
      type: 'apOfClaimAssessmentController/addDiagnosisItem',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  getSectionErrors = () => {
    const { existDiagnosisList } = this.props;
    const errorMessage = getSectionErrorMemoized(existDiagnosisList);
    return errorMessage ? <ErrorTooltipManual manualErrorMessage={errorMessage} /> : null;
  };

  render() {
    const {
      incidentId,
      diagnosisList,
      hasTreatment,
      existDiagnosisList,
      submited,
      taskNotEditable,
    } = this.props;
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
            {submited && this.getSectionErrors()}
            {lodash.map(lodash.compact(diagnosisList), (item: any, index: number) => (
              <DiagnosisListItem
                incidentId={incidentId}
                diagnosisId={item}
                existDiagnosisCode={existDiagnosisList}
                key={item}
                dataIndex={index}
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
