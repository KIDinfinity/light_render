import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import SectionTitle from 'claim/components/SectionTitle';
import HistorySider from 'claim/pages/HistorySider';
import InsuredInfo from '../HBOfAssessment/Insured/InsuredInfo';
import AssessmentResult from '../HBOfAssessment/ClaimResult/AssessmentResult';
import IncidentList from '../HBOfAssessment/Incident/IncidentList';
import InvoiceEntireList from '../HBOfAssessment/Invoice/InvoiceEntireList';
import BasicInfo from '../../Components/BasicInfo';
import styles from './index.less';
import dictionaryConfig from './DictionaryByTypeCodes.config';

@connect(({ hbOfClaimAssessmentController, workspaceHistory }: any) => ({
  claimProcessData: hbOfClaimAssessmentController.claimProcessData,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
  payeeList: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.payeeList'),
}))
class DAOfClaimHistory extends Component {
  state = {
    showPrimary: true,
    incidentId: '',
  };

  componentDidMount = () => {
    this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'hbOfClaimAssessmentController/clearClaimProcessData',
    });
  };

  getDropdown = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.history,
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
  };

  handleSwitch = (showPrimary: boolean, incidentId?: string) => {
    this.setState({ showPrimary, incidentId });
  };

  render() {
    const { claimProcessData, params, getCaseNoByBusinessNo }: any = this.props;
    const { showPrimary, incidentId } = this.state;

    return (
      <>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus-claim-label-identifyHospitalBillingInquiry',
          })}
        >
          {claimProcessData && (
            <BasicInfo
              caseNo={getCaseNoByBusinessNo}
              caseCategory={params.caseCategory}
              claimProcessData={claimProcessData}
            />
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
              <InsuredInfo />
              <SectionTitle
                title={formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
                })}
              />
              <div className={styles.btnWrap}>
                <AssessmentResult />
              </div>
              <div className={styles.incident_wrap}>
                <IncidentList
                  showPrimary={showPrimary}
                  handleSwitch={(incidentId: string) => this.handleSwitch(false, incidentId)}
                />
                <InvoiceEntireList
                  showPrimary={showPrimary}
                  incidentId={incidentId}
                  handleSwitch={() => this.handleSwitch(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DAOfClaimHistory;
