import { Row, Col } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash, { get, chain } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import InsuredInfo from './Insured/InsuredInfo';
import ClaimantInfo from './Claimant/ClaimantInfo';
import IncidentList from './Incident/IncidentList';
import Reporter from './Reporter/Reporter';
import Agent from './Agent/Agent';
import PolicyList from './Policy/PolicyList';
import ApplicationList from './Application/ApplicationList';
import dictionaryConfig from './DictionaryByTypeCodes.config';
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
  saveSnapshot: Function;
}

@connect(
  ({ JPCLMOfClaimRegistrationController, user, formCommonController, claimEditable }: any) => ({
    claimProcessData: JPCLMOfClaimRegistrationController.claimProcessData,
    claimEntities: JPCLMOfClaimRegistrationController.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    parentClaimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.parentClaimNo'),
    taskNotEditable: claimEditable.taskNotEditable,
    dataNotEditable: claimEditable.dataNotEditable,
  })
)
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class JPCLMOfClaimRegistration extends Component<IProps> {
  snapShotStore: any;

  static contextTypes = {
    setValidateHook: PropTypes.func,
    setButtonStatus: PropTypes.func,
    setDataForSubmit: PropTypes.func,
    taskDetail: PropTypes.object,
    setAfterHook: PropTypes.func,
    setHeaderInfo: PropTypes.func,
  };

  constructor(props) {
    super(props);
    // this.snapshotStore = new SnapshotStore();
  }

  componentDidMount = async () => {
    const { dispatch, businessData }: any = this.props;
    await dispatch({
      type: 'JPCLMOfClaimRegistrationController/saveClaimProcessData',
      payload: businessData,
    });

    // 对接360
    const oPolicy = chain(get(businessData, 'policyList'))
      .compact()
      .find((p) => !!p.policyNo)
      .value();

    if (oPolicy && oPolicy.policyNo) {
      dispatch({
        type: 'insured360/getInsuredId',
        payload: {
          policyNo: oPolicy.policyNo,
          caseCategory: businessData?.caseCategory,
        },
      });
    }

    this.getDropdown();
    this.getListPolicy(businessData);
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  handleSetHeaderInfo = (nextClaimProcessData: any) => {
    const { setHeaderInfo } = this.context;
    const submissionChannel = lodash.get(nextClaimProcessData, 'submissionChannel', '');
    const submissionDate = lodash.get(nextClaimProcessData, 'submissionDate', null);
    const parentClaimNo = lodash.get(nextClaimProcessData, 'parentClaimNo', null);
    setHeaderInfo('submissionChannel', submissionChannel);
    setHeaderInfo('parentClaimNo', parentClaimNo);
    // 设置日期
    if (submissionDate !== null) {
      const date = moment(submissionDate).format('L');
      const time = moment(submissionDate).format('LT');
      setHeaderInfo('submissionDate', date);
      setHeaderInfo('submissionTime', time);
    }
  };

  handlePendingInfo = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'envoyController/getEnvoyInfo',
    });
    dispatch({
      type: 'envoyController/getReasonConfigs',
    });
  };

  getDropdown = async () => {
    const { dispatch, taskDetail }: any = this.props;

    await dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.JapanRegistration,
    });

    dispatch({
      type: 'dictionaryController/getListDocsByGroupCode',
      payload: {
        groupCodes: ['documentTypeMandatory_jp'],
      },
    });
  };

  getListPolicy = (claimProcessData) => {
    const { dispatch } = this.props;
    const insuredId = lodash.get(claimProcessData, 'insured.insuredId');

    if (insuredId) {
      dispatch({
        type: 'JPCLMOfClaimRegistrationController/queryListPolicy',
        payload: {
          insuredId,
        },
      });
    }
  };

  render() {
    const { parentClaimNo, dataNotEditable, taskNotEditable } = this.props;

    const dataEditable = !dataNotEditable && lodash.isEmpty(parentClaimNo);
    const taskEditable = !taskNotEditable && lodash.isEmpty(parentClaimNo);
    return (
      <>
        <Row gutter={24}>
          <Col {...layout}>
            <InsuredInfo dataEditable={dataEditable} />
          </Col>
          <Col {...layout}>
            <ClaimantInfo dataEditable={dataEditable} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...layout}>
            <Reporter dataEditable={dataEditable} />
          </Col>
          <Col {...layout}>
            <Agent dataEditable={dataEditable} />
          </Col>
        </Row>
        <IncidentList dataEditable={taskEditable} />
        <PolicyList dataEditable={dataEditable} />
        {parentClaimNo && <ApplicationList />}
      </>
    );
  }
}

export default JPCLMOfClaimRegistration;
