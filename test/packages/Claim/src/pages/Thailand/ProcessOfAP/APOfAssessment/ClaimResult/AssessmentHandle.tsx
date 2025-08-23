import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './AssessmentHandle.less';
import ErrorTip from '@/components/ErrorTooltip/ErrorTip';

@connect(({ claimEditable, loading }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  reAssessmentLoading: loading.effects['commonClaimAssessmentController/reAssessment'],
}))
class AssessmentHandle extends Component {
  render() {
    const {
      handleReAssessment,
      taskNotEditable,
      showRequiredError,
      reAssTrigger,
      reAssessValidatingLoading,
      reAssessmentLoading,
    } = this.props;

    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          {/* <Button onClick={handleBeneficiaryOpen}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
          })}
        </Button> */}
          {!taskNotEditable && (
            <div className={styles.pr}>
              <Button
                onClick={handleReAssessment}
                loading={reAssessValidatingLoading || reAssessmentLoading}
              >
                {formatMessageApi({
                  Label_BPM_Button:
                    'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
                })}
              </Button>
              {showRequiredError && reAssTrigger && (
                <ErrorTip
                  defaultVisible={true}
                  className={styles.errorIcon}
                  noForm={true}
                  getPopupContainer={(triggerNode) => triggerNode.parentNode.parentNode.parentNode}
                  title={formatMessageApi({
                    Label_COM_WarningMessage: 'MSG_001296',
                  })}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AssessmentHandle;
