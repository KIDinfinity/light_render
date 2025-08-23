import React, { Component } from 'react';
import { connect } from 'dva';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import ButtonType from './ButtonType';
import IndexInformation from './IndexInformation';
import UploadFile from './UploadFile';
import { isEmpty } from 'lodash';
import InsuredList from './Modal/InsuredList';
import styles from './index.less';

@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class documentScanning extends Component<any> {
  getClaimData = async () => {
    const { dispatch, businessData = {} } = this.props;

    if (!isEmpty(businessData?.claimProcessData?.uploadFiles)) {
      await dispatch({
        type: 'documentManagement/saveUploadFiles',
        payload: { files: businessData?.claimProcessData?.uploadFiles },
      });
    }
    await dispatch({
      type: `documentScanningController/saveClaimProcessData`,
      payload: {
        claimProcessData: businessData?.claimProcessData || { indexInformation: {} },
      },
    });
  };

  componentDidMount = async () => {
    await this.getDropDown();
    await this.getClaimData();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'documentScanningController/clearClaimProcessData',
    });
    dispatch({
      type: 'documentManagement/initDocument',
    });
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getDropDown = async () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'documentManagement/getDropdownConfigure',
    });
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_COM_ClaimType', 'Dropdown_COM_Indicator'],
    });

    // 获取各个子模块fields的配置信息
    dispatch({
      type: 'documentManagement/getFieldConfigure',
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <ButtonType />
        <IndexInformation />
        <UploadFile />
        <InsuredList />
      </div>
    );
  }
}

export default connect(({ documentScanningController }: any) => ({
  claimProcessData: documentScanningController?.claimProcessData,
}))(documentScanning);
