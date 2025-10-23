import React, { Component } from 'react';
import { NAMESPACE } from './activity.config';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Row, Col, notification } from 'antd';
import lodash from 'lodash';

import SectionTitle from 'claim/components/SectionTitle';
import Insured from './Insured';
import Claimant from './Claimant';
import ServiceAgent from './ServiceAgent';
import AssessmentResult from './ClaimResult/AssessmentResult';
import AssessmentHandle from './ClaimResult/AssessmentHandle';
import CaseSplit, { ESplitTypes } from 'claim/pages/CaseSplit';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { createNormalizeData, denormalizeClaimData } from '@/utils/claimUtils';
import { wholeEntities } from './_models/dto/EntriesModel';
import { updateSplitDataByIncident, updateSplitDataByPolicy } from './_models/functions';
import { getReAssessmentWarn } from 'process/Utils';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { safeParseUtil } from '@/utils/utils';
import PageContainer from 'basic/components/Elements/PageContainer';

import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import PaymentAllocation from 'claim/pages/PaymentAllocation';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import PopUpEditPayable from './PopUpEditPayable';
import PopUpPayable from './PopUpPayable';
import { IncidentV2 } from './V2';


const layout = {
  xs: { span: 12 },
  sm: { span: 12 },
  md: { span: 12 },
  lg: { span: 12 },
};
interface IProps {
  dispatch: Dispatch<any>;
  userId: string;
  taskDetail: any;
  buttonList: any;
}

@connect()
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class IDOfManualAssessment extends Component<IProps> {
  state = {
    beneficiaryModeOpen: false,
    isRegisterTrigger: false,
  };

  componentDidMount = async () => {
    const { dispatch } = this.props;
    await this.getClaimData();
    await this.getDropdown();
    await dispatch({
      type: `${NAMESPACE}/getClaim`,
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

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;

    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
    };

    // 保存理赔比较数据
    dispatch({
      type: `${NAMESPACE}/initCompareClaimData`,
      payload: { taskId: taskDetail.taskId },
    });

    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
    });
  };

  getDropdown = async () => {
    const { dispatch, taskDetail }: any = this.props;

    await dispatch({
      type: `${NAMESPACE}/queryListPolicy`,
      payload: {
        claimNo: taskDetail?.businessNo || taskDetail?.inquiryBusinessNo,
      },
    });

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.ManualAssessment,
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

  handleReAssessment = async () => {
    const { dispatch } = this.props;

    // TODO：这里也许用回调到这里去掉用effer更好(promise)
    getReAssessmentWarn({ nameSpace: NAMESPACE, dispatch });
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

  handleAllocationOpen = () => {
    const { dispatch } = this.props;
    const result: any = dispatch({
      type: `${NAMESPACE}/getDenormalizedData`,
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
          type: `${NAMESPACE}/savePaymentAllocation`,
          payload: claimData,
        });
      }
    });
    this.handleBeneficiaryClose();
  };

  handleClaimRgister = async () => {
    const { dispatch, taskDetail, buttonList, tabs, isShowRemark }: any = this.props;
    const { isRegisterTrigger } = this.state;

    if (isRegisterTrigger) return;
    this.setState({
      isRegisterTrigger: true,
    });

    const activityButtonList = lodash.first(buttonList)?.activityButtonServiceList;
    const { method = {}, activityVariables = {} } = lodash.pick(
      safeParseUtil(activityButtonList?.[1]?.buttonParams),
      ['method', 'activityVariables']
    );
    setTimeout(async () => {
      await dispatch({
        type: `${NAMESPACE}/isClickRegisterToggle`,
        payload: true,
      });
      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      await dispatch({
        type: `${NAMESPACE}/isClickRegisterToggle`,
        payload: false,
      });
      if (errors?.length > 0) {
        this.setState({
          isRegisterTrigger: false,
        });

        return;
      }

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const submitData = getSubmitData({ taskDetail, dataForSubmit, variables: activityVariables });
      const inquiryClaimNo = lodash.get(submitData?.businessData, 'inquiryClaimNo');
      // 对接payment allocation
      const backData: any = await dispatch({
        type: 'paymentAllocation/allocationDockings',
        payload: {
          claimData: submitData?.businessData,
        },
      });
      const { output } = backData;
      lodash.set(submitData, 'businessData', output);

      const response = await dispatch({
        type: `${NAMESPACE}/registerHkClaimCase`,
        payload: {
          ...submitData,
          method,
          inquiryBusinessNo: inquiryClaimNo,
        },
      });

      // 将返回的claim数据同步到主页面
      if (!lodash.isEmpty(output)) {
        dispatch({
          type: `${NAMESPACE}/savePaymentAllocation`,
          payload: output,
        });
      }

      this.setState({
        isRegisterTrigger: false,
      });

      if (response?.success) {
        notification.success({
          message: 'Claim Register successfully!',
        });

        dispatch({
          type: `${NAMESPACE}/checkRegisterMcs`,
          payload: {
            claimNo: taskDetail?.businessNo,
          },
        });

        if (isShowRemark) {
          dispatch({
            type: 'navigatorInformationController/loadAllCategoryInformation',
            payload: {
              tabs,
            },
          });
        } else {
          dispatch({
            type: 'workspaceSwitchOn/changeSwitch',
            payload: {
              name: 'remark',
            },
          });
        }
      }
    });
  };

  render() {
    const { beneficiaryModeOpen, isRegisterTrigger } = this.state;
    const { dictsClaimType, listPolicy, taskDetail }: any = this.props;

    return (
      <PageContainer pageConfig={taskDetail}>
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
        <AssessmentResult />
        <AssessmentHandle
          handleBeneficiaryOpen={this.handleAllocationOpen}
          open={beneficiaryModeOpen}
          handleReAssessment={this.handleReAssessment}
          handleClaimRgister={this.handleClaimRgister}
          loading={isRegisterTrigger}
        />
        <IncidentV2 />
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
        <PaymentAllocation onCancel={this.handleAllocationClose} />
        <FurtherClaimModal namespace={NAMESPACE} />
        <PopUpPayable />
        <PopUpEditPayable />
      </PageContainer>
    );
  }
}

export default IDOfManualAssessment;
