import Tenant, { Region, tenant } from '@/components/Tenant';
import { querySnapshotVersion } from '@/services/navigatorTaskInfoControllerService';
import { createNormalizeData, denormalizeClaimData } from '@/utils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Col, Modal, notification, Row } from 'antd';
import { formUtils } from 'basic/components/Form';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import SectionTitle from 'claim/components/SectionTitle';
import CaseSplit, { ESplitTypes } from 'claim/pages/CaseSplit';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import {
  isIDAC,
  isOPDCashless,
  isOPDHospitalBill,
  isOPDHospitalPortal,
  isReimbursement,
} from 'claim/pages/Thailand/flowConfig';
import classNames from 'classnames';
import { connect } from 'dva';
import CaseCategory from 'enum/CaseCategory';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import FlowUpClaim from '../../FollowUpClaim';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import AssessmentResult from './ClaimResult/AssessmentResult';
import DecisionModal from './DecisionModal';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import IncidentList from './Incident/IncidentList';
import InsuredInfo from './Insured/InsuredInfo';
import InvoiceEntireList from './Invoice/InvoiceEntireList';
import PayeeInfoList from './Payee/PayeeInfoList';
import { wholeEntities } from './_models/dto/EntriesModel';

import PayeeList from './Payee/NewPayee';
import Policy from './Policy/Policy';
import PolicyBenefitList from './Policy/PolicyBenefitList';

import styles from './DAOfAssessment.less';

import updateSplitDataByIncident from './_models/functions/split/updateSplitDataByIncident';
import updateSplitDataByPolicy from './_models/functions/split/updateSplitDataByPolicy';

interface IState {
  showPrimary: boolean;
  incidentId?: string;
  init?: boolean;
  benefitOpen: boolean;
  reAssessValidatingLoading?: boolean;
  requeirdError?: boolean;
  reAssTrigger?: boolean;
}

interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData?: any;
  claimEntities?: any;
  taskDetail: any;
  errors: any;
}

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

@connect(
  ({
    daOfClaimAssessmentController,
    user,
    formCommonController,
    dictionaryController,
    task,
  }: any) => ({
    claimProcessData: daOfClaimAssessmentController.claimProcessData,
    claimEntities: daOfClaimAssessmentController.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    claimDecision: lodash.get(daOfClaimAssessmentController, 'claimProcessData.claimDecision'),
    payeeList: lodash.get(daOfClaimAssessmentController, 'claimProcessData.payeeList'),
    claimPayableList: lodash.get(
      daOfClaimAssessmentController,
      'claimProcessData.claimPayableList'
    ),
    dictsClaimType: dictionaryController.APDAClaimType,
    listPolicy: daOfClaimAssessmentController.listPolicy,
  })
)
// @ts-ignore
@changeWorkSpaceHoc
// @ts-ignore
@setEnvoyHoc
// @ts-ignore
@setInformationHoc
// @ts-ignore
@setInsured360Hoc
// @ts-ignore
@setClaimEditableHoc
class DAOfAssessment extends Component<IProps, IState> {
  state = {
    showPrimary: true,
    incidentId: this.props?.claimProcessData?.incidentList?.[0] || '',
    benefitOpen: false,
    reAssessValidatingLoading: false,
    reAssTrigger: false,
  };

  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();
    this.openAllocationDataChannel();
    this.getListPerConfinementLimit();
    this.setState({
      incidentId: this.props?.claimProcessData?.incidentList?.[0] || '',
      reAssessValidatingLoading: false,
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
    dispatch({
      type: 'followUpClaim/clearFlowUp',
    });
    // 初始化payment allocation
    dispatch({
      type: 'paymentAllocation/resetAllocation',
    });

    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    if (prevProps?.showRequiredError && !this.props.showRequiredError && this.state.reAssTrigger) {
      this.setState({ reAssTrigger: false });
    }
  }
  get displayPaymentAllocate() {
    const { claimProcessData }: any = this.props;
    const config = {
      [CaseCategory.TH_GC_CTG01]: 'claimPayableAmount',
      [CaseCategory.IDAC]: 'payToCustomer',
      [CaseCategory.TH_GC_CTG06]: 'payToCustomer',
      [CaseCategory.TH_GC_CTG07]: 'payToCustomer',
      [CaseCategory.TH_GC_CTG03]: 'payToCustomer',
    };
    const caseCategory = lodash.get(claimProcessData, 'caseCategory');
    const target = {
      claimPayableAmount: formUtils.queryValue(
        lodash.get(claimProcessData, 'claimDecision.claimPayableAmount')
      ),
      payToCustomer: formUtils.queryValue(
        lodash.get(claimProcessData, 'claimDecision.payToCustomer')
      ),
    };
    const result = lodash.some(config, (item, key) => key === caseCategory && target[item] > 0);

    return result;
  }

  getClaimData = async () => {
    const { dispatch, businessData }: any = this.props;

    await dispatch({
      type: 'daOfClaimAssessmentController/saveClaimProcessData',
      payload: businessData,
    });

    dispatch({
      type: 'daOfClaimAssessmentController/retrieve3CiIndicator',
    });

    // 初始化followUp
    dispatch({
      type: 'followUpClaim/initFollowUpClaim',
      payload: businessData,
    });

    // 保存理赔比较数据
    dispatch({
      type: 'daOfClaimAssessmentController/initCompareClaimData',
      payload: {
        businessData,
      },
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail } = this.props;

    dispatch({
      type: 'daOfClaimAssessmentController/queryListPolicy',
      payload: {
        claimNo: taskDetail.businessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'Deny_Reason_ManaulAssessment' }),
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THDAAssessment,
    });
    dispatch({
      type: 'dictionaryController/medicalProviderDropdown',
    });
  };

  handleSwitch = (showPrimary: boolean, incidentId?: string) => {
    this.setState({ showPrimary, incidentId });
  };

  handleReAssessment = async () => {
    const { dispatch, taskDetail, showRequiredError } = this.props;
    this.setState({ reAssessValidatingLoading: true });
    const result = await dispatch({
      type: 'task/checkVersion',
      payload: { taskId: taskDetail.taskId },
    });

    if (!result?.success) {
      Modal.error({
        okText: 'Close',
        content: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_001117',
        }),
      });
      this.setState({ reAssessValidatingLoading: false });
      return;
    }
    await dispatch({
      type: 'formCommonController/handleSubmited',
    });

    const errors = await dispatch({
      type: 'daOfClaimAssessmentController/validateFields',
      payload: {
        skipValidateFormIds: [
          'claimPayableListItem-',
          'treatmentPayableListItem-',
          'treatmentPayableListItemOfAI-',
          'invoicePayableListItem-',
          'treatmentPayableListItemAdd',
          'invoiceItemPayableItemAdd',
          '-claimDecision',
        ],
        onlyRequired: true,
      },
    });

    if (
      (!lodash.isEmpty(errors) &&
        lodash
          .chain(errors)
          .flatMap()
          .some(
            (item) => item.message === formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })
          )
          .value()) ||
      showRequiredError
    ) {
      this.setState({ reAssessValidatingLoading: false, reAssTrigger: true });
      return;
    }

    this.setState({ reAssessValidatingLoading: false });

    const response: any = await dispatch({
      type: 'commonClaimAssessmentController/reAssessment',
      payload: {
        nameSpace: 'daOfClaimAssessmentController',
      },
    });
    await dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
    if (response && !lodash.isEmpty(response?.businessData)) {
      dispatch({
        type: 'daOfClaimAssessmentController/getListPerConfinementLimit',
      });
    }
  };

  getClaimCaseData = () => {
    const { claimProcessData, claimEntities }: any = this.props;

    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    return content;
  };

  updatePaymentAmount = async (claimData: any) => {
    const { dispatch }: any = this.props;
    const result = await dispatch({
      type: 'daOfClaimAssessmentController/updatePayableAmount',
      payload: createNormalizeData(claimData, wholeEntities),
    });

    const { claimProcessData, claimEntities } = result;
    return denormalizeClaimData(claimProcessData, claimEntities);
  };

  updateClaimProcessData = async (claimProcessData: any, fnShowLoading: Function) => {
    const { dispatch }: any = this.props;
    // 更新前端页面数据
    dispatch({
      type: 'daOfClaimAssessmentController/saveClaimProcessData',
      payload: claimProcessData,
    });
    // 保存理赔比较数据
    dispatch({
      type: 'daOfClaimAssessmentController/initCompareClaimData',
      payload: {
        businessData: claimProcessData,
      },
    });
    // 更新snapshot数据
    const result = await dispatch({
      type: 'claimCaseController/saveSnapshot',
      payload: {
        postData: claimProcessData,
      },
    });
    if (!lodash.get(result, 'success')) {
      notification.error({
        message: formatMessageApi({ Label_COM_WarningMessage: 'venus.claim.re-assessment-failed' }),
      });
    }
    if (lodash.isFunction(fnShowLoading)) fnShowLoading(false);
  };

  updatePostData = (postData: any, splitType: string) => {
    switch (splitType) {
      case ESplitTypes.Incident:
        return updateSplitDataByIncident(postData);
      case ESplitTypes.Policy:
      default:
        return updateSplitDataByPolicy(postData);
    }
  };

  handleBenefitOpen = () => {
    this.setState({
      benefitOpen: true,
    });
  };

  handleBenefitClose = () => {
    this.setState({
      benefitOpen: false,
    });
  };

  getListPerConfinementLimit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/getListPerConfinementLimit',
    });
  };

  openAllocationDataChannel = () => {
    const { dispatch } = this.props;
    return tenant.region({
      [Region.TH]: null,
      notMatch() {
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
      },
    });
  };

  handleAllocationOpen = () => {
    const { dispatch } = this.props;
    if (tenant.isTH()) {
      this.handleBenefitOpen();
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
      this.handleBenefitOpen();
    });
  };

  handleAllocationClose = () => {
    const { dispatch } = this.props;

    this.handleBenefitClose();

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

  render() {
    const { showPrimary, incidentId, benefitOpen, reAssessValidatingLoading, reAssTrigger } =
      this.state;
    const {
      claimProcessData,
      dictsClaimType,
      listPolicy,
      taskDetail,
      payeeList,
      showRequiredError,
    }: any = this.props;
    const caseCategory = lodash.get(claimProcessData, 'caseCategory');

    const displayPayeeInfo =
      isReimbursement(caseCategory) ||
      isIDAC(caseCategory) ||
      isOPDHospitalBill(caseCategory) ||
      isOPDHospitalPortal(caseCategory) ||
      isOPDCashless(caseCategory);

    const completedSplitCase = lodash.includes(claimProcessData.flags, 'no_reassessment');

    return (
      // <div></div>
      <div
        className={classNames(
          styles.da_assessment,
          showPrimary ? 'assessment_primary' : 'assessment_secondary'
        )}
      >
        <FlowUpClaim getClaimCaseData={this.getClaimCaseData} showAll />
        <InsuredInfo />
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <AssessmentResult />
        <AssessmentHandle
          handleBeneficiaryOpen={this.handleAllocationOpen}
          // @ts-ignore
          open={benefitOpen}
          handleReAssessment={this.handleReAssessment}
          displayPaymentAllocate={this.displayPaymentAllocate}
          reAssessValidatingLoading={reAssessValidatingLoading}
          reAssTrigger={reAssTrigger}
          showRequiredError={showRequiredError}
        />
        <div className={styles.incident_wrap}>
          <IncidentList
            handleSwitch={(incidentID: string) => this.handleSwitch(false, incidentID)}
            showPrimary={showPrimary}
          />
          <InvoiceEntireList
            incidentId={incidentId}
            handleSwitch={(incidentID: string) => this.handleSwitch(true, incidentID)}
            showPrimary={showPrimary}
          />
        </div>
        {displayPayeeInfo && (
          <>
            <SectionTitle
              title={formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
              })}
            />
            <PayeeInfoList />
          </>
        )}
        {(isReimbursement(caseCategory) ||
          isOPDHospitalPortal(caseCategory) ||
          isOPDCashless(caseCategory) ||
          isIDAC(caseCategory)) && (
          // @ts-ignore
          <CaseSplit
            updatePaymentAmount={this.updatePaymentAmount}
            updateClaimProcessData={this.updateClaimProcessData}
            updatePostData={this.updatePostData}
            claimTypes={dictsClaimType}
            listPolicy={listPolicy}
            taskDetail={taskDetail}
            region="TH"
            tabConfig={{
              document: { disabled: true },
              incident: { disabled: true },
              case: { disabled: true },
              policy: { disabled: completedSplitCase },
              differentIncidentNo: { disabled: completedSplitCase },
            }}
          />
        )}
        {this.displayPaymentAllocate && (
          <>
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
                      // @ts-ignore
                      <PayeeList key={item} payeeId={item} />
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
        )}
        <DecisionModal />
      </div>
    );
  }
}

export default DAOfAssessment;
