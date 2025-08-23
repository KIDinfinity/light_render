import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Row, Col, Modal } from 'antd';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Tenant, { tenant } from '@/components/Tenant';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import SectionTitle from 'claim/components/SectionTitle';
import HistorySider from 'claim/pages/HistorySider';
import { historyTitle } from 'claim/pages/Thailand/ProcessOfDA/flowConfig';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import CaseCategory from 'enum/CaseCategory';
import InsuredInfo from '../DAOfAssessment/Insured/InsuredInfo';
import PayeeInfo from '../DAOfAssessment/Payee/PayeeInfo';
import AssessmentResult from '../DAOfAssessment/ClaimResult/AssessmentResult';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import IncidentList from '../DAOfAssessment/Incident/IncidentList';
import InvoiceEntireList from '../DAOfAssessment/Invoice/InvoiceEntireList';
import BasicInfo from '../../Components/BasicInfo';

import PolicyBenefitList from '../DAOfAssessment/Policy/PolicyBenefitList';
import PayeeList from '../DAOfAssessment/Payee/NewPayee';
import Policy from '../DAOfAssessment/Policy/Policy';

import styles from './index.less';
import FlowUpClaim from '../../FollowUpClaim';
import dictionaryConfig from './DictionaryByTypeCodes.config';

const layout = {
  xs: {
    span: 12,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 12,
  },
};

class DAOfClaimHistory extends Component<any> {
  state = {
    showPrimary: true,
    incidentId: '',
    benefitOpen: false,
  };

  componentDidMount = async () => {
    this.getDropdown();
    this.openAllocationDataChannel();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/clearClaimProcessData',
    });
    dispatch({
      type: 'insured360/clearInsuredReducer',
    });
    dispatch({
      type: 'followUpClaim/clearFlowUp',
    });
    // 初始化payment allocation
    dispatch({
      type: 'paymentAllocation/resetAllocation',
    });
  };

  getDropdown = () => {
    const {
      dispatch,
      params: { claimNo = '' },
    } = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'Deny_Reason_ManaulAssessment' }),
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THDAAssessmentHistory,
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
  };

  handleSwitch = (showPrimary: boolean, incidentId?: string) => {
    this.setState({ showPrimary, incidentId });
  };

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    const claimData: any = dispatch({
      type: 'daOfClaimAssessmentController/getDenormalizedData',
    });

    return claimData?.then?.((data: any) => {
      dispatch({
        type: 'paymentAllocation/openDataChannel',
        payload: { claimData: data },
      });

      return data;
    });
  };

  handleAllocationOpen = () => {
    const { dispatch } = this.props;

    if (tenant.isTH()) {
      this.setState({
        benefitOpen: true,
      });
      return;
    }

    const result: any = dispatch({
      type: 'daOfClaimAssessmentController/getDenormalizedData',
    });

    result?.then?.((claimData: any) => {
      dispatch({
        type: 'paymentAllocation/allocationOpen',
        payload: { claimData },
      });
    });
  };

  handleAllocationClose = () => {
    const { dispatch } = this.props;

    const backData: any = dispatch({
      type: 'paymentAllocation/getClaimData',
    });

    backData?.then?.((claimData: any) => {
      if (!lodash.isEmpty(claimData)) {
        dispatch({
          type: 'daOfClaimAssessmentController/savePaymentAllocation',
          payload: claimData,
        });
      }
    });
  };

  handleBenefitClose = () => {
    this.setState({
      benefitOpen: false,
    });
  };

  render() {
    const { claimProcessData, params, getCaseNoByBusinessNo, payeeList }: any = this.props;
    const { showPrimary, incidentId, benefitOpen } = this.state;
    const { caseCategory } = params;

    const title = historyTitle[caseCategory];
    const isRebAndDa =
      caseCategory === CaseCategory.TH_GC_CTG01 || caseCategory === CaseCategory.IDAC;

    return (
      <>
        <TaskDetailHeader
          taskStatus=""
          title={formatMessageApi({
            Label_BIZ_Claim: title,
          })}
        >
          {claimProcessData && (
            // @ts-ignore
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
              <div className={styles.btnWrap}>
                <AssessmentResult />
              </div>
              <AssessmentHandle handleBeneficiaryOpen={this.handleAllocationOpen} />
              <div className={styles.incident_wrap}>
                <IncidentList
                  showPrimary={showPrimary}
                  handleSwitch={(id: string) => this.handleSwitch(false, id)}
                />
                <InvoiceEntireList
                  showPrimary={showPrimary}
                  incidentId={incidentId}
                  handleSwitch={() => this.handleSwitch(true)}
                />
              </div>
              {isRebAndDa && !lodash.isEmpty(payeeList) && (
                <SectionTitle
                  title={formatMessageApi({
                    Label_BIZ_Claim:
                      'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
                  })}
                />
              )}
              {isRebAndDa &&
                lodash.map(lodash.compact(payeeList), (item: any) => (
                  <PayeeInfo key={item} payeeId={item} />
                ))}
            </div>
          </div>
        </div>
        <Tenant.TH>
          <Modal
            visible={benefitOpen}
            footer={null}
            onCancel={this.handleBenefitClose}
            width="80%"
            bodyStyle={{
              zIndex: 1000,
              minHeight: 600,
            }}
          >
            <Row gutter={24}>
              <Col {...layout}>
                <PolicyBenefitList />
              </Col>
              <Col {...layout}>
                {lodash.map(lodash.compact(payeeList), (item: any) => (
                  <PayeeList
                    key={item}
                    // @ts-ignore
                    payeeId={item}
                  />
                ))}
                <Policy />
              </Col>
            </Row>
          </Modal>
        </Tenant.TH>
        <Tenant.TH match={false}>
          <PaymentAllocation onCancel={this.handleAllocationClose} />
        </Tenant.TH>
      </>
    );
  }
}

export default connect(({ daOfClaimAssessmentController, workspaceHistory }: any) => ({
  claimProcessData: daOfClaimAssessmentController.claimProcessData,
  getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
  payeeList: lodash.get(daOfClaimAssessmentController, 'claimProcessData.payeeList'),
}))(DAOfClaimHistory);
