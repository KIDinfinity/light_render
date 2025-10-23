import React, { Component } from 'react';
import { NAMESPACE } from './activity.config';

import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import PageContainer from 'basic/components/Elements/PageContainer';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionTitle from 'claim/components/SectionTitle';
import CaseSplit from 'claim/pages/CaseSplit';
import type { IDictionary } from '@/dtos/dicts';
import type { IPolicy } from '@/dtos/claim';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import eSubmimnssionValidation from 'bpm/components/Hoc/eSubmimnssionValidation';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import PayeeInfo from './Payee';
import Incident from './Incident/List';
import Claimant from './Claimant/Claimant';
import Insured from './Insured/InsuredV2';
import ServiceAgent from './ServiceAgent/ServiceAgent';
import SearchModal from './Insured/SearchModal';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import BeneficiaryPop from './BeneficiaryPop';

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
  submited: boolean;
  taskDetail: any;
  dictsClaimType: IDictionary[];
  saveSnapshot: Function;
  listPolicy: IPolicy[];
}

@connect(
  ({
    [NAMESPACE]: modelnamepsace,
    user,
    formCommonController,
    dictionaryController,
    claimEditable,
  }: any) => ({
    claimProcessData: modelnamepsace.claimProcessData,
    claimEntities: modelnamepsace.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.ClaimType,
    taskNotEditable: claimEditable.taskNotEditable,
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
      type: `${NAMESPACE}/saveClaimProcessData`,
      taskDetail,
      payload: businessData,
    });

    await dispatch({
      type: `${NAMESPACE}/getLatestOcrStatus`,
      payload: {
        caseNo: taskDetail?.processInstanceId,
      },
    });

    this.getC360Data();
    this.getDropdown();
    this.getRepeatableByServiceCode();
    this.getServiceItemFeesListMap();
    this.getSurgeryProcedureByRegion();
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
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.PHDataCapture,
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
        claimNo: taskDetail?.businessNo,
      },
    });
  };

  updateClaimProcessData = async (claimProcessData: any, fnShowLoading: any) => {
    const { dispatch } = this.props;
    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: claimProcessData,
    });
    await dispatch({
      type: `${NAMESPACE}/saveDefaultClaimProcessData`,
    });

    if (lodash.isFunction(fnShowLoading)) {
      fnShowLoading(false);
    }
  };

  getC360Data = () => {
    const { claimProcessData, dispatch, taskNotEditable }: any = this.props;
    const insuredId = lodash.get(claimProcessData?.insured, 'insuredId');
    if (insuredId && !taskNotEditable) {
      dispatch({
        type: `${NAMESPACE}/getC360Data`,
        payload: {
          isInitial: true,
        },
      });
    }
  };

  getRepeatableByServiceCode = () => {
    const { dispatch, claimEntities }: any = this.props;
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: { serviceItemList: claimEntities?.serviceItemListMap || {} },
    });
  };

  getServiceItemFeesListMap = () => {
    const { dispatch, claimEntities }: any = this.props;

    lodash.map(claimEntities?.incidentListMap, (item: any) => {
      dispatch({
        type: `${NAMESPACE}/getServiceItemFeesListMap`,
        payload: { serviceItemList: claimEntities?.serviceItemListMap, incidentId: item?.id },
      });
    });
  };

  render() {
    const { dictsClaimType, listPolicy, taskDetail } = this.props;

    return (
      <>
        <PageContainer pageConfig={taskDetail}>
          <Row gutter={24}>
            <Col {...layout}>
              <Insured />
            </Col>
            <Col {...layout}>
              <Claimant />
            </Col>
          </Row>
          <ServiceAgent />
          <Incident />
          <SectionTitle
            title={formatMessageApi({
              Label_BIZ_Claim:
                'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
            })}
          />
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
          <SearchModal />
          <BeneficiaryPop />
          <FurtherClaimModal namespace={NAMESPACE} />
        </PageContainer>
      </>
    );
  }
}

export default BPOfDataCapture;
