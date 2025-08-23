import React, { Component } from 'react';
import { connect } from 'dva';
import { CaseStatus } from '@/enum';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import dropdownConfig from './dropdown.config';
import { NAMESPACE } from './activity.config';
import styles from './index.less';
import Page from './page';
import lodash from 'lodash';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { isDecision } from 'process/GeneralPOS/common/utils';
import PageContainer from 'basic/components/Elements/PageContainer';
import classnames from 'classnames';
@connect()
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class HKOfManualAssessment extends Component<any> {
  componentDidMount = async () => {
    this.getDropdown();
    this.getClaimData();
    this.findUIConfig();
  };

  componentDidUpdate = (props) => {
    if (props.index !== undefined) {
      this.getClaimData();
    }
    if (props?.servicingHistory) {
      props.dispatch({
        type: `${NAMESPACE}/isHistoryUpdate`,
        payload: { isHistory: true },
      });
    }
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${NAMESPACE}/clearClaimProcessData`,
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail, servicingHistory }: any = this.props;
    if (servicingHistory) {
      return;
    }

    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
      taskStatus: taskDetail.taskStatus,
      submissionDate: businessData?.submissionDate || taskDetail.submissionDate,
      caseCategory: taskDetail.caseCategory,
      taskDetailSubmissionChannel: taskDetail?.submissionChannel,
    };
    const noNeedCheck = lodash.includes(
      [CaseStatus.COMPLETED, CaseStatus.CANCELLED],
      taskDetail?.taskStatus
    );
    dispatch({
      type: `${NAMESPACE}/getGlobalConfig`,
      payload: {
        codeType: 'posMustReAssess',
      },
    });

    await dispatch({
      type: `${NAMESPACE}/saveClaimProcessData`,
      payload: newBusinessData,
    });

    if (
      !noNeedCheck &&
      lodash.isEmpty(newBusinessData?.showReAssess?.warnMessage) &&
      isDecision({ caseCategory: taskDetail.caseCategory }) &&
      !(newBusinessData?.preDecision === 'AP' && newBusinessData?.submissionChannel === 'OMNE')
    ) {
      dispatch({
        type: `${NAMESPACE}/getCheckReassessButtonStatus`,
        payload: {
          srvNo: newBusinessData?.srvNo,
          transactionTypes: newBusinessData?.transactionTypes?.map((item) => ({
            transactionTypeCode: item?.transactionTypeCode,
          })),
          srvCaseIndicatorList: newBusinessData?.srvCaseIndicatorList,
          decision: newBusinessData?.transactionTypes?.some(
            (item) => item?.decision === DecisionEnum.D
          )
            ? DecisionEnum.D
            : DecisionEnum.A,
        },
      });
    }
    if (!servicingHistory) {
      await dispatch({
        type: `${NAMESPACE}/getTransactionTypeCodeMap`,
      });
    }

    dispatch({
      type: `${NAMESPACE}/getIndicator`,
      payload: { businessData },
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

  findUIConfig = async () => {
    const { activityKey, caseCategory, regionCode } = this.props.businessData;
    const { dispatch, transactionTypeCode } = this.props;
    await dispatch({
      type: `${NAMESPACE}/getUIConfig`,
      payload: {
        activityKey,
        caseCategory,
        regionCode,
        transactionTypeCode,
      },
    });
  };

  render() {
    const { caseCategory, activityKey } = this.props.taskDetail || {};
    const { caseCategory: caseCategoryV2, activityKey: activityKeyV2 } =
      this.props.businessData || {};

    return (
      <PageContainer
        pageConfig={{
          caseCategory: caseCategory || caseCategoryV2,
          activityCode: activityKey || activityKeyV2,
        }}
      >
        <div className={classnames(styles.act, 'POSContainer')}>
          <Page servicingHistory={this.props.servicingHistory} />
        </div>
      </PageContainer>
    );
  }
}

export default HKOfManualAssessment;
