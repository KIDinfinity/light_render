import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';

@connect(({ mjProcessController }: any) => ({
  claimHistory: mjProcessController.claimHistory,
}))
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
class MJOfClaimControl extends Component {
  static contextTypes = {
    setDataForSubmit: PropTypes.func,
    taskDetail: PropTypes.object,
    setHeaderInfo: PropTypes.func,
    setSubmissionDateFormat: PropTypes.func,
  };

  componentDidMount = async () => {
    const { dispatch }: any = this.props;
    await this.getClaimData();
    dispatch({
      type: 'claimDataStatus/saveClaimDataStatus',
      payload: {
        isFirstLoadEnd: false,
        isLoadEnd: true,
      },
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData }: any = this.props;
    dispatch({
      type: 'mjProcessController/save',
      payload: businessData,
    });
  };

  componentWillUnmount = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'mjProcessController/clear',
    });
  };

  render() {
    return <></>;
  }
}

export default MJOfClaimControl;
