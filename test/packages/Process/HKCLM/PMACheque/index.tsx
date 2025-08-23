import React, { Component } from 'react';
import { connect } from 'dva';
import { Row } from 'antd';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import SectionTitle from 'claim/components/SectionTitle';
import dictionaryConfig from './DictionaryByTypeCodes.config';
import PageContainer from 'basic/components/Elements/PageContainer';
import DetailInformation from './DetailInformation';
import Basic from './Basic';
import SearchModal from './SearchModal';

@connect(({ processTask }) => ({
  isAssurance: processTask.getTask?.companyCode === 'Assurance'
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class PWACheque extends Component {
  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();
  };
  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;
    const newBusinessData = {
      ...businessData,
      businessNo: taskDetail.businessNo,
      inquiryBusinessNo: taskDetail.inquiryBusinessNo,
    };

    await dispatch({
      type: 'HKCLMOfPMAChequeController/saveBusinessData',
      payload: {
        businessData: newBusinessData,
        isAssurance: this.props.isAssurance
      },
    });
  };
  componentWillUnmount = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'formCommonController/clearForm',
    });
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getDropdown = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dictionaryConfig?.HKPWACheque,
    });
  };

  render() {
    const { taskDetail }: any = this.props;
    return (
      <>
        <PageContainer pageConfig={taskDetail}>
          <Row gutter={24}>
            <Basic />
          </Row>
          <SectionTitle title={'DETAIL INFORMATION'} />
          <Row gutter={24}>
            <DetailInformation />
          </Row>
        </PageContainer>
        <SearchModal />
      </>
    );
  }
}

export default PWACheque;
