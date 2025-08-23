import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import Decision from './Decision';
import ConfirmClient from './ConfirmClient';
import dictionaryConfig from './DictionaryByTypeCodes.config';

interface IProps {
  taskDetail: any;
  claimProcessData: any;
  dispatch: Dispatch;
  UnknownDocumentController: any;
}

@setClaimEditableHoc
@changeWorkSpaceHoc
@setInformationHoc
@setEnvoyHoc
@setInsured360Hoc
class Create extends Component<IProps> {
  componentDidMount() {
    const {
      dispatch,
      taskDetail: { processInstanceId = '', taskId },
    } = this.props;
    dispatch({
      type: 'UnknownDocumentController/getClaim',
      payload: {
        caseNo: processInstanceId,
        taskId,
      },
    });
    this.getDropdown();
  }

  getDropdown = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.THUDUnknowDocument,
    });
  };

  render() {
    return (
      <div>
        <ConfirmClient />
        <Decision />
      </div>
    );
  }
}

export default connect(({ UnknownDocumentController }: any) => ({
  UnknownDocumentController,
}))(Create);
