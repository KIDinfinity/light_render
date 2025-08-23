import type { IPolicy } from '@/dtos/claim';
import type { IDictionary } from '@/dtos/dicts';
import { createNormalizeData, denormalizeClaimData } from '@/utils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Col, notification, Row } from 'antd';
import PageContainer from 'basic/components/Elements/PageContainer';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import HospitalIncomeModal from 'claim/components/CalculationPathModal/HospitalIncomeModal';
import InpatientPerDayModal from 'claim/components/CalculationPathModal/InpatientPerDayModal';
import OutPatientModal from 'claim/components/CalculationPathModal/OutPatientModal';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import SectionTitle from 'claim/components/SectionTitle';
import CaseSplit, { ESplitTypes } from 'claim/pages/CaseSplit';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import { connect } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { getReAssessmentWarn } from 'process/Utils';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import Payment from '../../Payment';
import { NAMESPACE } from './activity.config';
import BeneficiaryPop from './BeneficiaryPop';
import Claimant from './Claimant/ClaimantV2';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import AssessmentResult from './ClaimResult/AssessmentResult';
import AssessmentAdjustmentResult from './ClaimAdjustmentResult';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import IncidentList from './Incident/List';
import Insured from './Insured/InsuredV2';
import PopUpEditPayable from './PopUpEditPayable';
import PopUpPayable from './PopUpPayable';
import ServiceAgent from './ServiceAgent/ServiceAgentV2';
import ServiceItemBreakdown from './ServiceItemBreakdown';
import { wholeEntities } from './_models/dto/EntriesModel';
import AppealInformation from './AppealInformation';
import { updateSplitDataByIncident, updateSplitDataByPolicy } from './_models/functions';

const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};
interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  claimEntities: any;
  userId: string;
  taskDetail: any;
  buttonList: any;
  dictsClaimType: IDictionary[];
  saveSnapshot: Function;
  listPolicy: IPolicy[];
  taskNotEditable?: boolean;
  isAppeal?: boolean;
  originalClaimNo?: string;
}

@connect(
  ({
    [NAMESPACE]: modelnamepsace,
    user,
    claimEditable,
    dictionaryController,
    navigatorInformationController,
    workspaceSwitchOn,
  }: any) => ({
    claimProcessData: modelnamepsace.claimProcessData,
    claimEntities: modelnamepsace.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    dictsClaimType: dictionaryController.ClaimType,
    listPolicy: modelnamepsace.listPolicy,
    tabs: navigatorInformationController.tabs,
    isShowRemark: workspaceSwitchOn.isShow.isShowRemark,
    taskNotEditable: claimEditable.taskNotEditable,
    diagnosisListMap: modelnamepsace.claimEntities.diagnosisListMap,
    isAppeal: modelnamepsace.claimProcessData?.appeal,
    originalClaimNo: modelnamepsace.claimProcessData?.claimAppealOriginalCase?.originalClaimNo,
  })
)
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class HKOfManualAssessment extends Component<IProps> {
  state = {
    beneficiaryModeOpen: false,
    isRegisterTrigger: false,
  };

  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();
    await this.getPaymentInitPageLoad();
    await this.getExchangeRateForInvoiceCurrencyPayout();
    const { dispatch, taskDetail } = this.props;
    dispatch({
      type: `${NAMESPACE}/getRelatedCase`,
    });

    this.getRepeatableByServiceCode();
    this.getServiceItemFeesListMap();
    this.getSurgeryProcedureByRegion();
    dispatch({
      type: `${NAMESPACE}/getListBenefitFactors`,
      payload: {
        claimNo: taskDetail?.inquiryBusinessNo,
      },
    });

    const taskResponse = await dispatch({
      type: `${NAMESPACE}/getClaim`,
    });

    // 保存理赔比较数据
    dispatch({
      type: `${NAMESPACE}/initCompareClaimData`,
      payload: {
        taskId: taskDetail.taskId,
        claimData: taskResponse?.resultData?.businessData,
      },
    });

    await dispatch({
      type: `${NAMESPACE}/getLatestOcrStatus`,
      payload: {
        caseNo: taskDetail?.processInstanceId,
      },
    });
  };

  getPaymentInitPageLoad = () => {
    const { dispatch, taskNotEditable } = this.props;

    !taskNotEditable &&
      dispatch({
        type: `${NAMESPACE}/paymentInitPageLoad`,
        payload: {
          wholeEntities,
        },
      });
  };

  getSurgeryProcedureByRegion = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE}/getSurgeryProcedureByRegion`,
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE}/clearClaimProcessData`,
    });

    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getExchangeRateForInvoiceCurrencyPayout = async () => {
    const { dispatch, claimEntities }: any = this.props;
    const invoiceKeyList = lodash
      .map(claimEntities.treatmentListMap, (item) => item.invoiceList)
      .flat();
    const dateList = invoiceKeyList
      .map((key) => {
        const date = claimEntities.invoiceListMap?.[key]?.exchangeDate;
        return moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : false;
      })
      .filter((bool) => bool);
    dateList.push(moment().format('YYYY-MM-DD'));

    await dispatch({
      type: `${NAMESPACE}/getExchangeRate`, //入口处请求汇率
      payload: { dateList },
    });
    await dispatch({
      type: `${NAMESPACE}/handleExchangeRateForInvoiceCurrencyPayout`,
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;
    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
    };

    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
      updatePayables: true,
    });
  };

  getDropdown = async () => {
    const { dispatch, taskDetail, originalClaimNo, isAppeal }: any = this.props;

    if (isAppeal) {
      if (originalClaimNo) {
        await dispatch({
          type: `${NAMESPACE}/queryListPolicy`,
          payload: {
            claimNo: originalClaimNo,
          },
        });
      }
    } else {
      await dispatch({
        type: `${NAMESPACE}/queryListPolicy`,
        payload: {
          claimNo: taskDetail?.businessNo || taskDetail?.inquiryBusinessNo,
        },
      });
    }

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.PHManualAssessment,
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
      type: `${NAMESPACE}/checkRegisterMcs`,
      payload: {
        caseNo: taskDetail?.caseNo,
      },
    });
    dispatch({
      type: `${NAMESPACE}/getAgentNoList`,
      payload: {
        claimNo: taskDetail?.businessNo,
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

  handleReAssessment = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: `${NAMESPACE}/setBreakdownConfirm`,
    });
    // TODO：这里也许用回调到这里去掉用effer更好(promise)
    getReAssessmentWarn({ nameSpace: NAMESPACE, dispatch });
  };

  updatePaymentAmount = async (claimData: any) => {
    const { dispatch }: any = this.props;
    const result = await dispatch({
      type: `${NAMESPACE}/updatePayableAmount`,
      payload: createNormalizeData(claimData, wholeEntities),
    });
    const { claimProcessData, claimEntities } = result;
    return denormalizeClaimData(claimProcessData, claimEntities);
  };

  updateClaimProcessData = async (claimProcessData: any, fnShowLoading: Function) => {
    const { dispatch }: any = this.props;
    // 更新前端页面数据
    dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: claimProcessData,
      updatePayables: true,
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
        message: 'Re-Assessment failed!',
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

  getRepeatableByServiceCode = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: {},
    });
  };

  getServiceItemFeesListMap = () => {
    const { dispatch, claimEntities }: any = this.props;

    lodash.map(claimEntities.incidentListMap, (item: any) => {
      dispatch({
        type: `${NAMESPACE}/getServiceItemFeesListMap`,
        payload: { serviceItemList: claimEntities.serviceItemListMap, incidentId: item?.id },
      });
    });
  };

  handleAllocationOpen = () => {
    const { dispatch } = this.props;

    dispatch({
      type: `${NAMESPACE}/showPaymentModal`,
      payload: { NAMESPACE },
    });
  };

  render() {
    const { beneficiaryModeOpen } = this.state;
    const { dictsClaimType, listPolicy, taskDetail, buttonList, isAppeal, originalClaimNo } = this.props;

    if(isAppeal && !originalClaimNo) {
      return (<PageContainer pageConfig={taskDetail}>
        <AppealInformation />
      </PageContainer>)
    }

    return (
      <PageContainer pageConfig={taskDetail}>
        {!!isAppeal && <AppealInformation />}
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
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        {!isAppeal && <AssessmentResult />}

        {!!isAppeal && <AssessmentAdjustmentResult isClaimAppeal={isAppeal} />}
        <AssessmentHandle
          handleBeneficiaryOpen={this.handleAllocationOpen}
          open={beneficiaryModeOpen}
          handleReAssessment={this.handleReAssessment}
          taskDetail={taskDetail}
          buttonList={buttonList}
          isAppeal={isAppeal}
        />
        <IncidentList />
        <CaseSplit
          updatePaymentAmount={this.updatePaymentAmount}
          updateClaimProcessData={this.updateClaimProcessData}
          updatePostData={this.updatePostData}
          claimTypes={dictsClaimType}
          listPolicy={listPolicy}
          taskDetail={taskDetail}
          tabConfig={{
            document: { disabled: true },
          }}
        />
        <Payment NAMESPACE={NAMESPACE} />
        <HospitalIncomeModal title="modal" />
        <OutPatientModal />
        <InpatientPerDayModal />
        <BeneficiaryPop />
        <PopUpPayable />
        <PopUpEditPayable />
        <ServiceItemBreakdown />
        <FurtherClaimModal namespace={NAMESPACE} />
      </PageContainer>
    );
  }
}

export default HKOfManualAssessment;
