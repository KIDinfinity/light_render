import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import Page from './Page';

interface IParentProps {
  taskDetail: any;
  businessData: any;
  buttonList: any;
}
interface IProps extends IParentProps {
  dispatch: Dispatch<any>;
  taskNotEditable?: boolean;
}

@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class CaseCreation extends Component<IProps> {
  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'simplifiedDigitalController/clearData',
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
    if (taskDetail?.caseCategory === 'BP_VAN_CTG002') {
      newBusinessData.businessType = 'BIZ002';
      newBusinessData.businessCode = 'BIZ002';
    }

    await dispatch({
      type: 'simplifiedDigitalController/saveClaimProcessData',
      payload: newBusinessData,
    });
  };

  getDropdown = async () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.CaseCreaction,
    });
  };

  render() {
    return <Page />;
  }
}

export default CaseCreation;
