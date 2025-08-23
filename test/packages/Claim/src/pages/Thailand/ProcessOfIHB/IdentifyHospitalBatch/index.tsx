import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import TransparentModel from '@/components/TransparentModel';
import InvoiceInformation from './InvoiceInformation/InvoiceInformation';
import OptBtnGroup from './OptBtnGroup/OptBtnGroup';
import BasicInformation from './BasicInformation/BasicInformation';
import RemoveInvoiceModal from './BasicInformation/RemoveInvoiceModal';
import styles from './index.less';

interface IProps {
  dispatch: Function;
  taskDetail: any;
  basicInforData: any;
  invoiceInforData: any;
  showProcessLoading: boolean;
}

// @ts-ignore
@connect(({ IdentifyHospitalBatchController }: any) => ({
  basicInforData: IdentifyHospitalBatchController?.claimProcessData?.basicInforData,
  invoiceInforData: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData,
  showProcessLoading: IdentifyHospitalBatchController?.showProcessLoading,
}))
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class IdentifyHospitalBatch extends React.Component<IProps> {
  static contextTypes = {
    setValidateHook: PropTypes.func,
    setButtonStatus: PropTypes.func,
    setDataForSubmit: PropTypes.func,
    setSubmissionDateFormat: PropTypes.func,
    setRemoveHeaderInfoItem: PropTypes.func,
  };

  componentDidMount() {
    const { dispatch, businessData }: any = this.props;

    dispatch({
      type: 'IdentifyHospitalBatchController/getHospitalBillingByClaimNoData',
      payload: {
        businessData,
      },
    });
    dispatch({
      type: 'IdentifyHospitalBatchController/findDictionaryByTypeCodes',
    });
  }

  shouldComponentUpdate(nextProps: IProps): boolean {
    return (
      !lodash.isEqual(nextProps.basicInforData, this.props.basicInforData) ||
      !lodash.isEqual(nextProps.invoiceInforData, this.props.invoiceInforData) ||
      !lodash.isEqual(nextProps.showProcessLoading, this.props.showProcessLoading)
    );
  }

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'IdentifyHospitalBatchController/clear',
    });
  };

  render() {
    const { taskDetail, showProcessLoading } = this.props;

    return (
      <>
        {showProcessLoading && (
          <TransparentModel visible>
            <Spin size="large" />
          </TransparentModel>
        )}
        <div className={styles.identifyHospitalBatch}>
          {/*
        //@ts-ignore */}
          <BasicInformation />
          <OptBtnGroup taskDetail={taskDetail} />
          {/*
        //@ts-ignore */}
          <InvoiceInformation taskDetail={taskDetail} />
          {/*
        //@ts-ignore */}
          <RemoveInvoiceModal />
        </div>
      </>
    );
  }
}

export default IdentifyHospitalBatch;
