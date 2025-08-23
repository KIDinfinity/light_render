import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import eSubmimnssionValidation from 'bpm/components/Hoc/eSubmimnssionValidation';
import { LS, LSKey } from '@/utils/cache';
import dropdownConfig from './dropdown.config';
import PolicyInfo from './PolicyInfo';
import FATCADeclaration from './FATCADeclaration';
import ServicingRequestInfo from './ServicingRequestInfo';
import { NAMESPACE } from './activity.config';
import styles from './index.less';

@connect()
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
@eSubmimnssionValidation(NAMESPACE)
class HKOfManualAssessment extends Component<any> {
  componentDidMount = async () => {
    await this.getDropdown();
    await this.getClaimData();
  };

  componentWillUnmount = () => {
    const { dispatch, taskDetail } = this.props;
    const { caseNo } = taskDetail;
    dispatch({
      type: `${NAMESPACE}/clearClaimProcessData`,
    });
    dispatch({
      type: 'formCommonController/clearForm',
    });
    LS.removeItem(`${LSKey.DOCUMENT_POLICYNO}_${caseNo}`);
  };

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;

    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
      taskStatus: taskDetail.taskStatus,
      submissionChannel: taskDetail.submissionChannel,
      submissionDate: taskDetail.submissionDate,
      caseCategory: taskDetail.caseCategory,
      customerType: taskDetail.customerType,
    };

    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
    });

    await dispatch({
      type: `${NAMESPACE}/getTransactionTypeCodeMap`,
    });

    const isESubmission = taskDetail.caseCategory === 'BP_SRV_CTG002';

    if (
      isESubmission &&
      !lodash.isEmpty(businessData.transactionTypes) &&
      (lodash.isEmpty(businessData.mainPolicyId) ||
        lodash.isEmpty(businessData.policyInfo) ||
        lodash.isEmpty(businessData.policyInfo.applyToPolicyInfoList))
    ) {
      const policyId =
        businessData?.transactionTypes?.[0]?.policyId ||
        businessData?.transactionTypes?.[0]?.policyAddr?.policyId ||
        businessData?.transactionTypes?.[0]?.applyToPolicyBOList?.[0]?.policyId;
      await dispatch({
        type: `${NAMESPACE}/eSubmissionPolicyListSupplement`,
        payload: {
          policyId,
        },
      });
    }

    if (businessData?.mainPolicyId) {
      await dispatch({
        type: 'insured360/saveTaskInfo',
        payload: {
          taskDetail: {
            businessNo: '',
            insuredId: businessData?.mainOwnerClientId,
            clientId: businessData?.mainOwnerClientId,
            customerType: taskDetail.customerType,
            caseCategory: taskDetail.caseCategory,
          },
        },
      });
      LS.setItem(`${LSKey.DOCUMENT_POLICYNO}_${taskDetail?.caseNo}`, businessData?.mainPolicyId);
    }

    await dispatch({
      type: `${NAMESPACE}/getIsShowFATCADeclaration`,
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
        <PolicyInfo />
        <ServicingRequestInfo />
        <FATCADeclaration />
      </div>
    );
  }
}

export default HKOfManualAssessment;
