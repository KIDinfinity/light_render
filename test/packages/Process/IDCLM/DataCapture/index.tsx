import React, { Component } from 'react';
import { NAMESPACE } from './activity.config';

import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import type { IDictionary } from '@/dtos/dicts';
import type { IPolicy } from '@/dtos/claim';
import { Row, Col } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import SectionTitle from 'claim/components/SectionTitle';
import Claimant from './Claimant';
import Insured from './Insured';
import SearchModal from './Insured/SearchModal';
import ServiceAgent from './ServiceAgent';
import PageContainer from 'basic/components/Elements/PageContainer';
import PayeeInfo from './Payee';

import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import FurtherClaimModal from 'claim/pages/HongKong/FurtherClaim';
import IncidentV2 from './V2/IncidentV2';


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
class BPOfDataCapture extends Component<IProps> {
  componentDidMount = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;
    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      taskDetail,
      payload: businessData,
    });
    this.getDropdown();
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
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.dataCapture,
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

  render() {
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
        <ServiceAgent />
        <IncidentV2 />
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
          })}
        />
        <PayeeInfo />
        <SearchModal />
        <FurtherClaimModal namespace={NAMESPACE} />
      </PageContainer>
    );
  }
}

export default BPOfDataCapture;
