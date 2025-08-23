import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import SectionTitle from 'claim/components/SectionTitle';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HistorySider from 'claim/pages/HistorySider';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import AssessmentHandle from '../ManualAssessment/ClaimResult/AssessmentHandle';
import AssessmentResult from '../ManualAssessment/ClaimResult/AssessmentResult';
import ServiceAgent from '../ManualAssessment/ServiceAgent/ServiceAgent';
import Insured from '../ManualAssessment/Insured/Insured';
import Claimant from '../ManualAssessment/Claimant/Claimant';
import IncidentList from '../ManualAssessment/Incident/List';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import TaskStatus from 'basic/enum/TaskStatus';
import BasicInfo from './BasicInfo';
import PageContainer from 'basic/components/Elements/PageContainer';

import styles from './index.less';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};

@connect(({ PHCLMOfCTG008AssessmentController, workspaceHistory }) => ({
  claimProcessData: PHCLMOfCTG008AssessmentController.claimProcessData,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
}))
class ClaimApprove extends Component {
  static childContextTypes = {
    taskNotEditable: PropTypes.bool,
  };

  state = {
    beneficiaryModeOpen: false,
  };

  getChildContext() {
    const { taskNotEditable } = this.props;

    return {
      taskNotEditable,
    };
  }

  componentDidMount = async () => {
    this.getDropdown();
    this.openAllocationDataChannel();
  };

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    // TODO 不好的处理方式，需要优化
    const { dispatch, claimProcessData } = this.props;
    if (claimProcessData?.inquiryClaimNo) {
      dispatch({
        type: `PHCLMOfCTG008AssessmentController/getListBenefitFactors`,
        payload: {
          claimNo: claimProcessData?.inquiryClaimNo,
        },
      });
    }
  }

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'PHCLMOfCTG008AssessmentController/clearClaimProcessData',
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getDropdown = () => {
    const { dispatch, params }: any = this.props;
    const businessNo = params.claimNo;

    dispatch({
      type: 'PHCLMOfCTG008AssessmentController/queryListPolicy',
      payload: {
        claimNo: businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.PHHistory,
    });

    dispatch({
      type: 'dictionaryController/nationalityDropdown',
    });
    dispatch({
      type: 'dictionaryController/bankDropdown',
    });
    dispatch({
      type: 'dictionaryController/occupationDropdown',
    });
    dispatch({
      type: 'PHCLMOfCTG008AssessmentController/getAgentNoList',
      payload: {
        claimNo: businessNo,
      },
    });
  };

  handleBeneficiaryOpen = () => {
    this.setState({
      beneficiaryModeOpen: true,
    });
  };

  handleBeneficiaryClose = () => {
    this.setState({
      beneficiaryModeOpen: false,
    });
  };

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    const claimData: any = dispatch({
      type: 'PHCLMOfCTG008AssessmentController/getDenormalizedData',
    });
    return claimData?.then?.((claimData: any) => {
      dispatch({
        type: 'paymentAllocation/openDataChannel',
        payload: { claimData },
      });

      return claimData;
    });
  };

  handleAllocationOpen = () => {
    const { dispatch } = this.props;
    const result: any = dispatch({
      type: 'PHCLMOfCTG008AssessmentController/getDenormalizedData',
    });

    result?.then?.((claimData: any) => {
      dispatch({
        type: 'paymentAllocation/allocationOpen',
        payload: { claimData },
      });
      this.handleBeneficiaryOpen();
    });
  };

  handleAllocationClose = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'paymentAllocation/toggleModal',
      payload: { opened: false },
    });

    const backData: any = dispatch({
      type: 'paymentAllocation/getClaimData',
    });

    backData?.then?.((claimData: any) => {
      if (!lodash.isEmpty(claimData)) {
        dispatch({
          type: 'PHCLMOfCTG008AssessmentController/savePaymentAllocation',
          payload: claimData,
        });
      }
    });
    this.handleBeneficiaryClose();
  };

  render() {
    const { claimProcessData, getCaseNoByBusinessNo }: any = this.props;

    return (
      <PageContainer pageConfig={{}}>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail.title.claim-inquiry',
          })}
          description={claimProcessData?.status === TaskStatus.reversed ? 'Reversed' : ''}
        >
          {claimProcessData && (
            <BasicInfo
              caseNo={getCaseNoByBusinessNo}
              caseCategory={claimProcessData.caseCategory}
              claimProcessData={claimProcessData}
            />
          )}
        </TaskDetailHeader>
        <div className={styles.container}>
          <HistorySider caseNo={getCaseNoByBusinessNo} claimProcessData={claimProcessData} />
          <div className={`${styles.content} ${styles['black-scroll']}`}>
            <div className={styles.wrap}>
              <Row gutter={24}>
                <Col {...layout}>
                  <Insured />
                </Col>
                <Col {...layout}>
                  <Claimant />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ServiceAgent />
                </Col>
              </Row>
              <SectionTitle
                title={formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.title.assessment-information',
                })}
              />
              <AssessmentResult />
              <AssessmentHandle handleBeneficiaryOpen={this.handleAllocationOpen} taskDetail={claimProcessData} />
              <IncidentList />
            </div>
          </div>
          <PaymentAllocation onCancel={this.handleAllocationClose} />
          <HospitalIncomeModal title="modal" />
          <OutPatientModal />
          <InpatientPerDayModal />
          <FurtherClaimModal namespace="PHCLMOfCTG008AssessmentController" />
        </div>
      </PageContainer>
    );
  }
}

export default ClaimApprove;
