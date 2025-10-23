import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './AssessmentHandle.less';

@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class AssessmentHandle extends Component {
  render() {
    const { handleReAssessment, taskNotEditable } = this.props;

    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          {/* <Button onClick={handleBeneficiaryOpen}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
          })}
        </Button> */}
          {!taskNotEditable && (
            <Button onClick={handleReAssessment}>
              {formatMessageApi({
                Label_BPM_Button:
                  'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
              })}
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default AssessmentHandle;
