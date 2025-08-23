import React, { Component } from 'react';
import { connect } from 'dva';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import UploadSectionList from './UploadSectionList';
import styles from './index.less';
import TopButton from './TopButton';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import { tenant, Region } from '@/components/Tenant';
import InsuredList from './InsuredList';

@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class BatchDocumentScanning extends Component<any> {
  getClaimData = async () => {
    const { dispatch, businessData = {} } = this.props;

    const claimProcessData = get(businessData, 'claimProcessData', []);
    const defaultType = tenant.region({
      [Region.VN]: 'PendingDocument',
      [Region.MY]: 'PendingDocument',
      notMatch: 'NewRequest',
    });
    const type = get(businessData, 'type', defaultType);
    const uploadFiles = [];
    forEach(claimProcessData, (data) => {
      if (!isEmpty(data?.uploadFiles)) {
        uploadFiles.push(...data?.uploadFiles);
      }
    });
    await dispatch({
      type: `batchDocumentScanningController/saveClaimProcessData`,
      payload: {
        claimProcessData: claimProcessData.length > 0 ? claimProcessData : [{}],
        type,
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
      type: 'batchDocumentScanningController/clearClaimProcessData',
    });
    dispatch({
      type: 'documentManagement/initDocument',
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
        <TopButton />
        <UploadSectionList />
        <InsuredList />
      </div>
    );
  }
}

export default connect()(BatchDocumentScanning);
