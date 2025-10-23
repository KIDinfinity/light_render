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
import PayeeInfo from './Payee/PayeeInfo';
import IncidentList from './Incident/IncidentList';
import ClaimantInfo from './Claimant/ClaimantInfo';
import InsuredInfo from './Insured/InsuredInfo';
import dictionaryConfig from '../DictionaryByTypeCodes.config';

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
  ({ bpOfDataCaptureController, user, formCommonController, dictionaryController }: any) => ({
    claimProcessData: bpOfDataCaptureController.claimProcessData,
    claimEntities: bpOfDataCaptureController.claimEntities,
    userId: lodash.get(user, 'currentUser.userId'),
    submited: formCommonController.submited,
    dictsClaimType: dictionaryController.ClaimType,
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
      type: 'bpOfDataCaptureController/saveClaimProcessData',
      payload: businessData,
    });
    await dispatch({
      type: 'bpOfDataCaptureController/saveDefaultClaimProcessData',
    });

    this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'bpOfDataCaptureController/clearClaimProcessData',
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getDropdown = () => {
    const { dispatch, taskDetail }: any = this.props;
    const { caseCategory, activityKey, taskDefKey } = lodash.pick(taskDetail, [
      'caseCategory',
      'activityKey',
      'taskDefKey',
    ]);
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.[caseCategory]?.[activityKey || taskDefKey],
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
      type: 'bpOfDataCaptureController/saveClaimProcessData',
      payload: claimProcessData,
    });
    await dispatch({
      type: 'bpOfDataCaptureController/saveDefaultClaimProcessData',
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
      </>
    );
  }
}

export default BPOfDataCapture;
