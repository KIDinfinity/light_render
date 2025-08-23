import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import CaseSplit from 'claim/pages/CaseSplit';
import type { IDictionary } from '@/dtos/dicts';
import type { IPolicy } from '@/dtos/claim';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import eSubmimnssionValidation from 'bpm/components/Hoc/eSubmimnssionValidation';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import PageContainer from 'basic/components/Elements/PageContainer';
import PayeeInfo from './Payee';
import Incident from './Incident/List';
import ClaimantInfo from './Claimant/Claimant';
import InsuredInfo from './Insured/Insured';
import ServiceAgentInfo from './ServiceAgent/ServiceAgent';
import { ElementConfig } from 'basic/components/Form';
import activityLocalConfig from './activity.config';

interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  claimEntities: any;
  userId: string;
  submited: boolean;
  taskDetail: any;
  dictsClaimType: IDictionary[];
  saveSnapshot: Function;
  listPolicy: IPolicy[];
}

@connect(
  ({
    JPCLMOfDataCapture,
    user,
    formCommonController,
    dictionaryController,
    claimEditable,
  }: any) => ({
    claimProcessData: JPCLMOfDataCapture.claimProcessData,
    claimEntities: JPCLMOfDataCapture.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.ClaimType,
    editable: claimEditable.taskNotEditable,
  })
)
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
@eSubmimnssionValidation('JPCLMOfDataCapture')
class BPOfDataCapture extends Component<IProps> {
  componentDidMount = async () => {
    const { dispatch, businessData = {}, taskDetail, editable }: any = this.props;

    await dispatch({
      type: 'JPCLMOfDataCapture/businessDataCreate',
      taskDetail,
      payload: businessData,
    });
    this.getDropdown();
    if (editable) {
      await dispatch({
        type: 'JPCLMOfDataCapture/getPolicyList',
        payload: {
          policyId: businessData?.insured?.policyId,
        },
      });
    }
    if (!taskDetail?.businessNo) {
      dispatch({
        type: 'insured360/saveTaskInfo',
        payload: {
          taskDetail: {
            ...taskDetail,
            insuredId: businessData?.insured?.insuredId,
          },
        },
      });
    }
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'JPCLMOfDataCapture/clean',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.JPDataCapture,
    });
    dispatch({
      type: 'dictionaryController/bankDropdown',
    });
    dispatch({
      type: 'dictionaryController/occupationDropdown',
    });

    dispatch({
      type: 'JPCLMOfDataCapture/checkRegisterMcs',
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });
    dispatch({
      type: 'JPCLMOfDataCapture/getAgentNoList',
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });
  };

  updateClaimProcessData = (claimProcessData: any, fnShowLoading: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfDataCapture/businessDataCreate',
      payload: claimProcessData,
    });

    if (lodash.isFunction(fnShowLoading)) {
      fnShowLoading(false);
    }
  };

  render() {
    const { dictsClaimType, listPolicy, taskDetail } = this.props;

    return (
      <>
        <PageContainer pageConfig={taskDetail}>
          <ElementConfig.ActivityLayout config={activityLocalConfig}>
            <InsuredInfo section="insured" />
            <ClaimantInfo section="claimant" />
            <ServiceAgentInfo section="agent" />
            <Incident section="incident" />
            <PayeeInfo section="payee" />
          </ElementConfig.ActivityLayout>
          <CaseSplit
            updateClaimProcessData={this.updateClaimProcessData}
            claimTypes={dictsClaimType}
            listPolicy={listPolicy}
            taskDetail={taskDetail}
            tabConfig={{
              splitTypeDef: 'Incident',
              policy: { disabled: true },
              document: { disabled: true },
            }}
          />
        </PageContainer>
      </>
    );
  }
}

export default BPOfDataCapture;
