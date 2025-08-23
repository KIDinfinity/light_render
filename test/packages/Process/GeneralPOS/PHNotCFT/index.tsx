import React, { Component } from 'react';
import { connect } from 'dva';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import FormLayout from 'basic/components/Form/FormLayout';
import BasicInfo from './SectionGroup/BasicInfo';
import Declarations from './Section/Declarations';
import UnderWriter from './Section/UnderWriter';
import ApprovalDecision from './Section/ApprovalDecision';
import LAPaymentTrack from './SectionGroup/LAPaymentTrack';
import styles from './index.less';

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
class DataCapture extends Component<any> {
  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `GeneralPOSPHNotCFTController/cleanClaimdata`,
    });
  };

  getClaimData = () => {
    const { dispatch, taskDetail, businessData, isPosHistory } = this.props;
    if (isPosHistory) {
      return;
    }
    dispatch({
      type: `GeneralPOSPHNotCFTController/initBusinessData`,
      payload: {
        ...taskDetail,
        businessData,
      },
    });
  };

  componentDidMount = async () => {
    const { dispatch, taskDetail, posHistory } = this.props;

    await this.getDropDown();
    this.getClaimData();
    dispatch({
      type: 'GeneralPOSPHNotCFTController/getTransactionTypeList',
      payload: {
        posHistory,
        caseCategory: taskDetail?.caseCategory,
      },
    });

    await dispatch({
      type: 'GeneralPOSPHNotCFTController/saveSnapshot',
    });
    await dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getDropDown = async () => {
    const { dispatch } = this.props;
    // TODO：这里应该根据不同的Transaction Type去有选择的请求
    await dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: [
        'Gender',
        'Dropdown_POS_PaymentStatus',
        'Dropdown_POS_UW_Decision',
        'Dropdown_CFG_Country',
        'Dropdown_POS_WDOption',
        'Dropdown_POS_RequestPolicyType',
        'Dropdown_POS_MailType',
        'Dropdown_POS_SendTo',
        'Dropdown_POS_Branch',
        'Dropdown_POS_MailType',
        'Dropdown_CFG_Currency',
        'Dropdown_CFG_AccountType',
        'Dropdown_POS_PreferredMailingAddr',
        'Dropdown_POS_SrcBank_Check',
        'Dropdown_POS_SrcBank_Bank',
        'Dropdown_POS_SubmissionChannel',
        'Dropdown_COM_POSTransactionType_Minor',
        'Dropdown_COM_POSTransactionType_Major',
        'Dropdown_POL_PremiumStatus',
        'risk_status',
      ],
    });
  };

  render() {
    return (
      <div id={styles.container}>
        <FormLayout
          layConf={{
            default: 24,
            LATrack: 12,
            paymentTrack: 12,
          }}
        >
          <BasicInfo />
          <UnderWriter />
          <ApprovalDecision />
          <LAPaymentTrack />
          <Declarations />
        </FormLayout>
      </div>
    );
  }
}

export default connect()(DataCapture);
