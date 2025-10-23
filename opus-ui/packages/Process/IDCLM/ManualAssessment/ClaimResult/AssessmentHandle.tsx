import { NAMESPACE } from '../activity.config';

/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { serviceItemCode } from 'claim/pages/utils/isServiceItemRequired';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import { VLD_000006 } from 'claim/pages/validators/fieldValidators';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formUtils } from 'basic/components/Form';
import NameScreening from '../NameScreening';
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
  assessmentDecision: any;
  incidentDecisionListMap: any;
  serviceItemListMap: any;
  loading: any;
}

@connect(
  ({
    claimEditable,
    loading,
    formCommonController,
    [NAMESPACE]: modelnamepsace,
    paymentAllocation,
    processTask,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    reAssessmentLoading: loading.effects['commonClaimAssessmentController/reAssessment'],
    submited: formCommonController.submited,
    payeeListMap: modelnamepsace.claimEntities.payeeListMap,
    isClickClaimRegister: modelnamepsace.isClickClaimRegister,
    diagnosisListMap: modelnamepsace.claimEntities.diagnosisListMap,
    policyBenefitListMap: modelnamepsace.claimEntities.policyBenefitListMap,
    beneficiaryListMap: modelnamepsace.claimEntities.beneficiaryListMap,
    isShowIcon: !!paymentAllocation.errors?.length,
    taskDetail: processTask.getTask,
    incidentDecisionListMap: modelnamepsace.claimEntities.claimPayableListMap,
    assessmentDecision: modelnamepsace.claimProcessData?.claimDecision?.assessmentDecision,
    serviceItemListMap: modelnamepsace.claimEntities?.serviceItemListMap,
  })
)
class AssessmentHandle extends PureComponent<IProps> {
  handleClickClaimRegister = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: `${NAMESPACE}/savePartyListInfo`,
      payload: {
        isClickClaimRegister: true,
      },
    });
  };

  handlClaimRegister = () => {
    const {
      handleClaimRgister,
      diagnosisListMap,
      assessmentDecision,
      incidentDecisionListMap,
      serviceItemListMap,
    } = this.props;
    const isNoDiagnosisListMap = lodash.isEmpty(diagnosisListMap);
    const isAssessmentDecisionNA = lodash.isEqual(
      formUtils.queryValue(assessmentDecision),
      ClaimDecision.NA
    );
    const isAllNA = lodash.every(
      incidentDecisionListMap,
      (item) => formUtils.queryValue(item.claimDecision) === ClaimDecision.NA
    );

    const isServiceItemUnitError = lodash.some(serviceItemListMap, (serviceItemList) => {
      const { unit, serviceItem } = serviceItemList;
      if (lodash.isNil(formUtils.queryValue(unit))) {
        return lodash.includes(serviceItemCode, formUtils.queryValue(serviceItem));
      }
      return false;
    });

    if (isServiceItemUnitError) {
      const { dispatch }: any = this.props;
      dispatch({
        type: `${NAMESPACE}/setServiceItemUnitError`,
        payload: {
          isServiceItemUnitError,
          serviceItemListMap,
        },
      });
      return;
    }
    if (isAssessmentDecisionNA && !isAllNA) {
      const { dispatch }: any = this.props;
      dispatch({
        type: `${NAMESPACE}/setAssessmentDecisionError`,
        payload: {
          isAssessmentDecisionNAError: true,
        },
      });
      return;
    }
    return !isNoDiagnosisListMap ? handleClaimRgister() : this.handleClickClaimRegister();
  };

  render() {
    const {
      handleBeneficiaryOpen,
      handleReAssessment,
      taskNotEditable,
      reAssessmentLoading,
      submited,
      open,
      isShowIcon,
      taskDetail,
      diagnosisListMap,
      isClickClaimRegister,
      loading,
    } = this.props;

    const isNoDiagnosisListMap = lodash.isEmpty(diagnosisListMap);
    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          <NameScreening />
          {!taskNotEditable && (
            <Button onClick={handleReAssessment} loading={reAssessmentLoading}>
              {formatMessageApi({
                Label_BPM_Button:
                  'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
              })}
            </Button>
          )}
          <ButtonWithIcon
            // eslint-disable-next-line react/jsx-no-bind
            handleClick={handleBeneficiaryOpen}
            open={open}
            showIcon={isShowIcon && submited}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
            })}
          />
          <ButtonWithIcon
            handleClick={this.handlClaimRegister}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'Claim Register',
            })}
            loading={loading}
            showIcon={isClickClaimRegister && isNoDiagnosisListMap}
            errorsMSG={isClickClaimRegister && VLD_000006(isNoDiagnosisListMap)}
          />
        </div>
      </div>
    );
  }
}

export default AssessmentHandle;
