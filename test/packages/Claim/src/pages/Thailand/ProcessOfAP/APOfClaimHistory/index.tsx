import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import SectionTitle from 'claim/components/SectionTitle';
import lodash from 'lodash';
import HistorySider from 'claim/pages/HistorySider';
import BasicInfo from '../../Components/BasicInfo';
import InsuredInfo from '../APOfAssessment/Insured/InsuredInfo';
import AssessmentResult from '../APOfAssessment/ClaimResult/AssessmentResult';
import IncidentList from '../APOfAssessment/Incident/IncidentList';
import styles from './APOfClaimHistory.less';
import FlowUpClaim from '../../FollowUpClaim';
import dictionaryConfig from './DictionaryByTypeCodes.config';

@connect(({ apOfClaimAssessmentController, workspaceHistory, claimEditable }: any) => ({
  claimProcessData: apOfClaimAssessmentController.claimProcessData,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class APOfManualAssessment extends Component {
  getChildContext() {
    const { taskNotEditable } = this.props;

    return {
      taskNotEditable,
    };
  }

  componentDidMount = () => {
    this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'apOfClaimAssessmentController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
    dispatch({
      type: 'insured360/clearInsuredReducer',
    });
    dispatch({
      type: 'followUpClaim/clearFlowUp',
    });
  };

  getDropdown = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THAPHhistory,
    });
    dispatch({
      type: 'dictionaryController/diagnosisDropdown',
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
  };

  render() {
    const { claimProcessData, getCaseNoByBusinessNo }: any = this.props;

    return (
      <>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus-claim-label-apInquiry',
          })}
        >
          {claimProcessData && (
            <BasicInfo caseNo={getCaseNoByBusinessNo} claimProcessData={claimProcessData} />
          )}
        </TaskDetailHeader>
        <div className={styles.container}>
          <HistorySider
            caseNo={getCaseNoByBusinessNo}
            claimNo={lodash.get(claimProcessData, 'claimNo', '')}
            caseCategory={lodash.get(claimProcessData, 'caseCategory', '')}
          />
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
              <FlowUpClaim showAll />
              <InsuredInfo />
              <SectionTitle
                title={formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
                })}
              />
              <AssessmentResult />
              <IncidentList />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default APOfManualAssessment;
