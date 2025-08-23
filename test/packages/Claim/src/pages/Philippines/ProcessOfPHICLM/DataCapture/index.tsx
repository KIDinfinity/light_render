import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SectionTitle from 'claim/components/SectionTitle';
import CaseSplit from 'claim/pages/CaseSplit';
import type { IDictionary } from '@/dtos/dicts';
import type { IPolicy } from '@/dtos/claim';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import IncidentList from './Incident/IncidentList';
import ClaimantInfo from './Claimant/ClaimantInfo';
import InsuredInfo from './Insured/InsuredInfo';
import InsuredListModal from './Insured/InsuredListModal';
import SearchInsuredModal from './Insured/SearchInsuredModal';

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
  ({ PHCLMOfDataCaptureController, user, formCommonController, dictionaryController }: any) => ({
    claimProcessData: PHCLMOfDataCaptureController.claimProcessData,
    claimEntities: PHCLMOfDataCaptureController.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.Dropdown_CLM_PHClaimType,
  })
)
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class BPOfDataCapture extends Component<IProps> {
  componentDidMount = async () => {
    const { dispatch, businessData = {} }: any = this.props;
    await dispatch({
      type: 'PHCLMOfDataCaptureController/saveClaimProcessData',
      payload: businessData,
    });
    await dispatch({
      type: 'PHCLMOfDataCaptureController/saveDefaultClaimProcessData',
    });
    this.calculateIssueAge();
    this.getDropdown();
  };

  calculateIssueAge = () => {
    const { dispatch, businessData = {} }: any = this.props;
    const { insured } = businessData;
    const { issueAge, policyId } = lodash.pick(insured, ['issueAge', 'policyId']);
    if (policyId && !issueAge) {
      dispatch({
        type: 'PHCLMOfDataCaptureController/getByPolicyIdList',
        payload: {
          policyNoList: [lodash.toUpper(policyId)],
        },
      });
    }
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'PHCLMOfDataCaptureController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getDropdown = () => {
    const { dispatch }: any = this.props;

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
  };

  updateClaimProcessData = async (claimProcessData: any, fnShowLoading: any) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'PHCLMOfDataCaptureController/saveClaimProcessData',
      payload: claimProcessData,
    });
    await dispatch({
      type: 'PHCLMOfDataCaptureController/saveDefaultClaimProcessData',
    });

    if (lodash.isFunction(fnShowLoading)) {
      fnShowLoading(false);
    }
  };

  render() {
    const { dictsClaimType, listPolicy, taskDetail } = this.props;
    return (
      <>
        <Row gutter={24}>
          <Col {...layout}>
            <InsuredInfo />
          </Col>
          <Col {...layout}>
            <ClaimantInfo />
          </Col>
        </Row>
        <SectionTitle
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title',
          })}
        />
        <IncidentList />
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
        <InsuredListModal />
        <SearchInsuredModal />
      </>
    );
  }
}

export default BPOfDataCapture;
