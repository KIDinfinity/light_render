import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import InformationModal from 'packages/Opus/NewBusiness/ManualUnderwriting/_components/InformationModal/index';
import { NAMESPACE } from './activity.config';
import Tabs from './Tabs';
import UploadDocuments from './UploadDocuments';
import styles from './index.less';
import OCRResultModal from './OCRResultModal';

@setClaimEditableHoc
class DocumentScanning extends Component<any> {
  componentDidMount = async () => {
    const { dispatch, businessData = {} } = this.props;

    const type = !businessData?.type ? 'NewRequestClaimPackReturn' : businessData?.type;

    await dispatch({
      type: `${NAMESPACE}/BusinessDataSave`,
      payload: {
        businessData: {
          ...businessData,
          claimProcessData: lodash.isEmpty(businessData?.claimProcessData)
            ? [{}]
            : businessData?.claimProcessData,
          type,
        },
      },
    });

    await this.getDropDown();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE}/initData`,
    });
  };

  getDropDown = async () => {
    const { dispatch } = this.props;

    dispatch({
      type: `${NAMESPACE}/getDropdownConfigure`,
    });

    // 获取各个子模块fields的配置信息
    dispatch({
      type: `${NAMESPACE}/getFieldConfigure`,
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <Tabs />
        <UploadDocuments />
        <InformationModal />
        <OCRResultModal />
      </div>
    );
  }
}

export default connect()(DocumentScanning);
