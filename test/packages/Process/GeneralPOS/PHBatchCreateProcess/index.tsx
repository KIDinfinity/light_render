import React from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import Process from './Process';
import BasicInfo from './BasicInfo';
import dropdownConfig from './dropdown.config';
import { NAMESPACE } from './activity.config';

interface IProps {
  dispatch: Dispatch<any>;
  taskDetail: Object;
}
// @ts-ignore
@changeWorkSpaceHoc
// @ts-ignore
@setEnvoyHoc
// @ts-ignore
@setInformationHoc
// @ts-ignore
@setInsured360Hoc
// @ts-ignore
@setClaimEditableHoc
class PHBatchCreateProcessController extends React.Component<IProps> {
  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  }

  componentDidMount() {
    this.getClaimData();
    this.getDropdown();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'PHBatchCreateProcessController/clearClaimProcessData',
    });
  }

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;

    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
      taskStatus: taskDetail.taskStatus,
      submissionDate: businessData?.submissionDate || taskDetail.submissionDate,
      caseCategory: taskDetail.caseCategory,
      taskDetailSubmissionChannel: taskDetail?.submissionChannel,
    };
    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
    });
  };

  getDropdown = async () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dropdownConfig,
    });
  };
  render() {
    return (
      <div>
        <BasicInfo />
        <Process />
      </div>
    );
  }
}

export default connect()(
  PHBatchCreateProcessController
);
