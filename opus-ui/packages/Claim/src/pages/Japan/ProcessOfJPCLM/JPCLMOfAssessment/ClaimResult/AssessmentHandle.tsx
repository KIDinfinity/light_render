/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import styles from './AssessmentHandle.less';

class AssessmentHandle extends Component {
  render() {
    const {
      handleBenefitOpen,
      handleReAssessment,
      disabled,
      reAssessmentLoading,
      submited,
      isShowIcon,
      open,
    } = this.props;

    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          <ButtonWithIcon
            handleClick={handleBenefitOpen}
            open={open}
            showIcon={isShowIcon && submited}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
            })}
          />
          {!disabled ? (
            <>
              <Button
                onClick={handleReAssessment}
                disabled={disabled}
                loading={reAssessmentLoading}
              >
                {formatMessageApi({
                  Label_BPM_Button:
                    'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
                })}
              </Button>
              <Button disabled={disabled}>
                {formatMessageApi({
                  Label_BPM_Button:
                    'app.navigator.task-detail-of-claim-assessment.button.contract-liquidation',
                })}
              </Button>
              <Button disabled={disabled}>
                {formatMessageApi({
                  Label_BPM_Button:
                    'app.navigator.task-detail-of-claim-assessment.button.assessment-compare',
                })}
              </Button>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  ({
    loading,
    formCommonController,
    JPCLMOfClaimAssessmentController,
    paymentAllocation,
  }: any) => ({
    reAssessmentLoading: loading.effects['JPCLMOfClaimAssessmentController/reAssessment'],
    submited: formCommonController.submited,
    payeeListMap: JPCLMOfClaimAssessmentController.claimEntities.payeeListMap,
    policyBenefitListMap: JPCLMOfClaimAssessmentController.claimEntities.policyBenefitListMap,
    beneficiaryListMap: JPCLMOfClaimAssessmentController.claimEntities.beneficiaryListMap,
    isShowIcon: !!paymentAllocation.errors?.length,
  })
)(AssessmentHandle);
