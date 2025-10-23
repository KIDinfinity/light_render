/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import lodash from 'lodash';
// import { withRouter } from 'dva/router';
import { Button, Checkbox } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import { ESkipCalculate } from '../_models/dto/ESkipCalculate';
import styles from './AssessmentHandle.less';
import ReCalculateButton from './ReCalculateButton';

interface ISProps {
  handleBeneficiaryOpen?: any;
  handleReAssessment?: any;
  taskNotEditable?: boolean;
  flags?: string;
  skipOds?: string;
  dispatch?: Dispatch;
}

// @withRouter
@connect(
  ({
    daOfClaimAssessmentController,
    claimEditable,
    loading,
    formCommonController,
    paymentAllocation,
  }: any) => ({
    reAssessmentLoading: loading.effects['commonClaimAssessmentController/reAssessment'],
    reCalculateLoading: loading.effects['daOfClaimAssessmentController/reCalculate'],
    flags: daOfClaimAssessmentController?.claimProcessData?.flags,
    taskNotEditable: claimEditable.taskNotEditable,
    submited: formCommonController.submited,
    skipOds: daOfClaimAssessmentController?.claimProcessData?.skipOds,
    isShowIcon: !!paymentAllocation.errors?.length,
    policyBenefitListMap: daOfClaimAssessmentController?.claimEntities?.policyBenefitListMap,
  })
)
class AssessmentHandle extends Component<ISProps> {
  handleSkipOds = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { dispatch } = this.props;
    const {
      target: { checked },
    } = e;

    if (lodash.isFunction(dispatch))
      dispatch({
        type: 'daOfClaimAssessmentController/saveSkipOds',
        payload: {
          skipOds: checked ? ESkipCalculate.Yes : ESkipCalculate.No,
        },
      });
  };

  get isShow() {
    const { policyBenefitListMap } = this.props;
    const errors = formUtils.getErrorArray(policyBenefitListMap);
    return !lodash.isEmpty(errors);
  }

  render() {
    const {
      reAssessmentLoading,
      reCalculateLoading,
      handleBeneficiaryOpen,
      handleReAssessment,
      taskNotEditable,
      flags,
      submited,
      open,
      location,
      skipOds,
      displayPaymentAllocate,
    } = this.props;

    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          {displayPaymentAllocate && (
            <ButtonWithIcon
              handleClick={handleBeneficiaryOpen}
              open={open}
              showIcon={this.isShow && submited}
              buttonText={formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-data-capture.title.payee-information',
              })}
            />
          )}
          {!taskNotEditable && (
            <div className={styles.btnReassessment}>
              <Button
                onClick={handleReAssessment}
                disabled={lodash.chain(flags).split(',').includes('no_reassessment').value()}
                loading={reAssessmentLoading && !reCalculateLoading}
              >
                {formatMessageApi({
                  Label_BPM_Button:
                    'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
                })}
              </Button>
              {lodash.toUpper(location?.query?.displaySkipOds) === ESkipCalculate.Yes ? (
                <Checkbox
                  onChange={this.handleSkipOds}
                  className={styles.skipOds}
                  value={skipOds === ESkipCalculate.Yes}
                >
                  skip ods
                </Checkbox>
              ) : null}
            </div>
          )}
          <ReCalculateButton />
        </div>
      </div>
    );
  }
}

export default AssessmentHandle;
