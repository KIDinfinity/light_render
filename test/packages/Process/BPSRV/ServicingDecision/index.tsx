import React, { Component } from 'react';
import { connect } from 'dva';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dropdownConfig from './dropdown.config';
import PolicyInfo from './PolicyInfo';
import ServicingRequestInfo from './ServicingRequestInfo';
import FATCADeclaration from './FATCADeclaration';
import { NAMESPACE } from './activity.config';
import styles from './index.less';

@connect()
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class HKOfManualAssessment extends Component<any> {
  componentDidMount = async () => {
    await this.getDropdown();
    await this.getClaimData();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE}/clearClaimProcessData`,
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail, servicingHistory }: any = this.props;

    await dispatch({
      type: `${NAMESPACE}/getIsShowFATCADeclaration`,
    });

    if (servicingHistory) {
      const { businessNo } = servicingHistory;
      dispatch({
        type: `${NAMESPACE}/getSrvCase`,
        payload: {
          businessNo,
        },
      });
      return;
    }

    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
      taskStatus: taskDetail.taskStatus,
      submissionChannel: taskDetail.submissionChannel,
      submissionDate: taskDetail.submissionDate,
      caseCategory: taskDetail.caseCategory,
    };

    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
    });

    if (!servicingHistory) {
      await dispatch({
        type: `${NAMESPACE}/getTransactionTypeCodeMap`,
      });
    }

    await dispatch({
      type: `${NAMESPACE}/queryRegionDefaultCurrency`,
    });
  };

  getDropdown = async () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: dropdownConfig,
    });

    dispatch({
      type: `${NAMESPACE}/getAddress`,
    });
  };

  render() {
    return (
      <div className={styles.act}>
        <PolicyInfo servicingHistory={this.props.servicingHistory} />
        <ServicingRequestInfo />
        <FATCADeclaration />
      </div>
    );
  }
}

export default HKOfManualAssessment;
