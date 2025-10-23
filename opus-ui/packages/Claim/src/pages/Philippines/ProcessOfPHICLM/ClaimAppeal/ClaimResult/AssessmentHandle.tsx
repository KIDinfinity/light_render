/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
// import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';

import styles from './AssessmentHandle.less';

@connect(({ claimEditable, loading, formCommonController, paymentAllocation }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  reAssessmentLoading: loading.effects['commonClaimAssessmentController/reAssessment'],
  submited: formCommonController.submited,
  isShowIcon: !!paymentAllocation.errors?.length,
}))
class AssessmentHandle extends PureComponent {
  render() {
    const {
      handleBeneficiaryOpen,
      // handleReAssessment,
      // taskNotEditable,
      // reAssessmentLoading,
      submited,
      open,
      isShowIcon,
    } = this.props;

    return (
      <div className={styles.btnWrap}>
        <ButtonWithIcon
          handleClick={handleBeneficiaryOpen}
          open={open}
          showIcon={isShowIcon && submited}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
          })}
        />
        {/* {!taskNotEditable && (
          <Button onClick={handleReAssessment} loading={reAssessmentLoading}>
            {formatMessageApi({
              Label_BPM_Button:
                'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
            })}
          </Button>
        )} */}
      </div>
    );
  }
}

export default AssessmentHandle;
