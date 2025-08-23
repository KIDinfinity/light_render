import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// import getPayeeDisable from '../../DAOfAssessment/_models/functions/getPayeeDisable';
import styles from './AssessmentHandle.less';

interface ISProps {
  caseCategory?: string;
  claimDecision?: any;
  handleBeneficiaryOpen?: any;
  showReassessment?: boolean;
}
@connect(({ daOfClaimAssessmentController }: any) => ({
  claimProcessData: lodash.get(daOfClaimAssessmentController, 'claimProcessData'),
  caseCategory: lodash.get(daOfClaimAssessmentController, 'claimProcessData.caseCategory'),
  claimDecision: lodash.get(daOfClaimAssessmentController, 'claimProcessData.claimDecision'),
}))
class AssessmentHandle extends Component<ISProps> {
  render() {
    const { handleBeneficiaryOpen, caseCategory } = this.props;

    return (
      <div className={styles.btnWrap}>
        {(caseCategory === 'TH_GC_CTG01' ||
          caseCategory === 'IDAC' ||
          caseCategory === 'TH_GC_CTG06' ||
          caseCategory === 'TH_GC_CTG07') && (
          <Button onClick={handleBeneficiaryOpen}>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
            })}
          </Button>
        )}
      </div>
    );
  }
}

export default AssessmentHandle;
