import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import CaseSplit from 'claim/pages/CaseSplit';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import eSubmimnssionValidation from 'bpm/components/Hoc/eSubmimnssionValidation';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import PageContainer from 'basic/components/Elements/PageContainer';
import PayeeInfo from './Payee';
import { Row, Col } from 'antd';
import Incident from './Incident/List';
import Claimant from './Claimant/Claimant';
import Insured from './Insured/Insured';
import ServiceAgent from './ServiceAgent/ServiceAgent';
import SearchList from '../Components/Procedure/AntiCancerAndHormone/SearchList';

import InformationModal from 'packages/Opus/NewBusiness/ManualUnderwriting/_components/InformationModal';
import ProcedureModal from 'packages/Opus/Pages/Process/Claim/DataCapture/Procedure/Modal/index.tsx';
import OtherProcedureModal from 'packages/Opus/Pages/Process/Claim/DataCapture/OtherProcedure/Modal/index.tsx';
import { manualUpdateForceUpdateFlag } from 'process/PAEngine/VNBCalculator/services/vnbCalculatorServices';
interface IProps {
  dispatch: Dispatch<any>;
  claimProcessData: any;
  claimEntities: any;
  userId: string;
  submited: boolean;
  taskDetail: any;
  dictsClaimType: IDictionary[];
  saveSnapshot: any;
  listPolicy: amy;
}

@connect(
  ({
    [NAMESPACE]: modelnamespace,
    user,
    formCommonController,
    dictionaryController,
    claimEditable,
    task,
  }: any) => ({
    claimProcessData: modelnamespace.claimProcessData,
    claimEntities: modelnamespace.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.ClaimType,
    editable: !claimEditable.taskNotEditable,
    forceUpdateFlag: task?.forceUpdateFlag,
  })
)
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
@eSubmimnssionValidation(NAMESPACE)
class BPOfDataCapture extends Component<IProps> {
  componentDidMount = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;

    await dispatch({
      type: `${NAMESPACE}/businessDataCreate`,
      taskDetail,
      payload: businessData,
    });
    this.getDropdown();

    dispatch({
      type: `${NAMESPACE}/saveCurrentController`,
      payload: { taskDetail },
    });
    dispatch({
      type: 'auditLogController/saveCurrentController',
      payload: {
        currentController: NAMESPACE,
      },
    });
  };

  componentDidUpdate({ editable: preEditable }: any) {
    const {
      dispatch,
      claimProcessData: { insured },
      editable,
      forceUpdateFlag,
    }: any = this.props;

    if (!!editable && editable !== preEditable && !!insured?.policyId) {
      dispatch({
        type: `${NAMESPACE}/getPolicyList`,
        payload: {
          policyId: insured?.policyId,
        },
      });
    }

    if (forceUpdateFlag === 'Y') {
      setTimeout(() => {
        this.forceUpdateSnapshot();
      }, 2000);
    }
  }

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: `${NAMESPACE}/clean`,
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
      type: `${NAMESPACE}/checkRegisterMcs`,
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });
    dispatch({
      type: `${NAMESPACE}/getAgentNoList`,
      payload: {
        claimNo: taskDetail?.businessNo,
      },
    });
  };

  forceUpdateSnapshot = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;

    await dispatch({
      type: `${NAMESPACE}/businessDataCreate`,
      taskDetail,
      payload: businessData,
    });

    dispatch({
      type: `${NAMESPACE}/saveSnapshot`,
    });

    dispatch({
      type: 'task/updataTask',
      payload: {
        forceUpdateFlag: undefined,
      },
    });

    return;
  };

  updateClaimProcessData = (claimProcessData: any, fnShowLoading: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE}/businessDataCreate`,
      payload: claimProcessData,
    });

    if (lodash.isFunction(fnShowLoading)) {
      fnShowLoading(false);
    }
  };

  render() {
    const { dictsClaimType, listPolicy, taskDetail } = this.props;

    return (
      <PageContainer pageConfig={taskDetail}>
        <Row gutter={24}>
          <Col span={12}>
            <Insured />
          </Col>
          <Col span={12}>
            <Claimant taskDetail={taskDetail} />
          </Col>
        </Row>
        <ServiceAgent />
        <Incident />
        <PayeeInfo />
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
        <InformationModal />
        <SearchList NAMESPACE={NAMESPACE} />
        <ProcedureModal />
        <OtherProcedureModal />
        {/* <FurtherClaimModal namespace={NAMESPACE} /> */}
      </PageContainer>
    );
  }
}

export default BPOfDataCapture;
