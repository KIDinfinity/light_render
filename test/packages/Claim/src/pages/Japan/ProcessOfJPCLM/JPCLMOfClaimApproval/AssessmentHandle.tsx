import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './AssessmentHandle.less';

const AssessmentHandle = ({ handleBenefitOpen }) => (
  <div className={styles.btnWrap}>
    <div className={styles.btnIcon}>
      <Button onClick={handleBenefitOpen}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
        })}
      </Button>
      <Button>
        {formatMessageApi({
          Label_BPM_Button:
            'app.navigator.task-detail-of-claim-assessment.button.assessment-compare',
        })}
      </Button>
    </div>
  </div>
);

export default AssessmentHandle;
