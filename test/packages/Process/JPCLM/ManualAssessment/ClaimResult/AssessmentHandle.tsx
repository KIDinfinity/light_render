/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import lodash from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { settlementDecision as settlementDecisionEnum } from 'claim/pages/Enum';
import { AssessmentSettlementLogic } from 'process/JPCLM/ManualAssessment/_models/functions/AssessmentSettlementLogic';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import NameScreening from '../NameScreening';
import noReassessmentByFlags from '../_models/functions/split/noReassessmentByFlags';
import styles from './AssessmentHandle.less';

interface IProps {
  isClickClaimRegister: boolean;
  handleBeneficiaryOpen: any;
  handleClaimRgister: any;
  handleReAssessment: any;
  taskNotEditable: boolean;
  reAssessmentLoading: any;
  submited: boolean;
  open: any;
  isShowIcon: any;
  taskDetail: any;
  diagnosisListMap: any;
  claimPayableListMap: any;
  assessmentDecision: any;
}

@connect(
  ({
    claimEditable,
    loading,
    formCommonController,
    JPCLMOfClaimAssessment,
    paymentAllocation,
    processTask,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    reAssessmentLoading: loading.effects['commonClaimAssessmentController/reAssessment'],
    claimReversalLoading: loading.effects['JPCLMOfClaimAssessment/BOclaimReversal'],
    changeHosNoLoading: loading.effects['JPCLMOfClaimAssessment/BOchangeHosNo'],
    submited: formCommonController.submited,
    payeeListMap: JPCLMOfClaimAssessment.claimEntities.payeeListMap,
    isClickClaimRegister: JPCLMOfClaimAssessment.isClickClaimRegister,
    diagnosisListMap: JPCLMOfClaimAssessment.claimEntities.diagnosisListMap,
    policyBenefitListMap: JPCLMOfClaimAssessment.claimEntities.policyBenefitListMap,
    beneficiaryListMap: JPCLMOfClaimAssessment.claimEntities.beneficiaryListMap,
    isShowIcon: !!paymentAllocation.errors?.length,
    taskDetail: processTask.getTask,
    claimPayableListMap: JPCLMOfClaimAssessment.claimEntities.claimPayableListMap,
    assessmentDecision: JPCLMOfClaimAssessment.claimProcessData.claimDecision?.assessmentDecision,
    flags: JPCLMOfClaimAssessment.claimProcessData.flags,
  })
)
class AssessmentHandle extends PureComponent<IProps> {
  handleClickClaimRegister = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessment/savePartyListInfo',
      payload: {
        isClickClaimRegister: true,
      },
    });
  };

  handleRegister = (isNoDiagnosisListMap: any) => {
    const { claimPayableListMap, assessmentDecision, handleClaimRgister } = this.props;
    const claimPayableList = lodash.sample(claimPayableListMap);
    const { settlementDecision, detailedAssessmentDecision } = claimPayableList;
    const errorsVLD_000576 = AssessmentSettlementLogic({
      assessmentDecision,
      settlementDecision,
      claimPayableListMap,
    });
    const errorsERR_000001 =
      settlementDecision !== settlementDecisionEnum['01'] &&
      lodash.isEmpty(detailedAssessmentDecision);
    const errors = errorsVLD_000576 || errorsERR_000001;

    if (errors) {
      const { dispatch }: any = this.props;
      dispatch({
        type: 'JPCLMOfClaimAssessment/saveClaimPayableListGroupResultError',
        payload: {
          claimPayableListMap,
          settlementDecision: errorsVLD_000576,
          detailedAssessmentDecision: errorsERR_000001,
        },
      });
    } else {
      return !isNoDiagnosisListMap ? handleClaimRgister() : this.handleClickClaimRegister();
    }
  };

  render() {
    const {
      handleBeneficiaryOpen,
      handleReAssessment,
      handleClaimReversal,
      handlechangeHosNo,
      taskNotEditable,
      reAssessmentLoading,
      submited,
      open,
      isShowIcon,
      taskDetail,
      diagnosisListMap,
      claimReversalLoading,
      changeHosNoLoading,
      dispatch,
      flags,
    } = this.props;

    const isNoDiagnosisListMap = lodash.isEmpty(diagnosisListMap);
    const defKeyOfMaunal = lodash.isEqual(TaskDefKey.JP_CLM_ACT003, taskDetail?.taskDefKey);
    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          <NameScreening />
          {!taskNotEditable && (
            <Button
              onClick={handleReAssessment}
              loading={reAssessmentLoading}
              disabled={noReassessmentByFlags(flags)}
            >
              {formatMessageApi({
                Label_BPM_Button:
                  'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
              })}
            </Button>
          )}
          <ButtonWithIcon
            handleClick={handleBeneficiaryOpen}
            open={open}
            showIcon={isShowIcon && submited}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
            })}
          />
          {!taskNotEditable && (
            <Button
              onClick={() => {
                dispatch({
                  type: 'JPCLMOfClaimAssessment/BOclaimReversal',
                });
              }}
              loading={claimReversalLoading}
            >
              {formatMessageApi({
                Label_BPM_Button: 'Claim Reversal',
              })}
            </Button>
          )}
          {!taskNotEditable && (
            <Button
              onClick={() => {
                dispatch({
                  type: 'JPCLMOfClaimAssessment/BOchangeHosNo',
                });
              }}
              loading={changeHosNoLoading}
            >
              {formatMessageApi({
                Label_BPM_Button: 'Change Hospitalization Number',
              })}
            </Button>
          )}
          {/* {defKeyOfMaunal && (
            <ButtonWithIcon
              // eslint-disable-next-line react/jsx-no-bind
              handleClick={this.handleRegister.bind(isNoDiagnosisListMap)}
              buttonText={formatMessageApi({
                Label_BIZ_Claim: 'Claim Register',
              })}
              showIcon={isClickClaimRegister && isNoDiagnosisListMap}
              errorsMSG={isClickClaimRegister && VLD_000006(isNoDiagnosisListMap)}
            />
          )} */}
        </div>
      </div>
    );
  }
}

export default AssessmentHandle;
