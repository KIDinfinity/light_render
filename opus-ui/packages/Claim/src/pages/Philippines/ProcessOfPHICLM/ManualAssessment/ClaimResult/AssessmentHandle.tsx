/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import RegistrationModal from './RegistrationModal';
import styles from './AssessmentHandle.less';

@connect(
  ({
    claimEditable,
    formCommonController,
    PHCLMOfClaimAssessmentController,
    paymentAllocation,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    submited: formCommonController.submited,
    payeeListMap: PHCLMOfClaimAssessmentController.claimEntities.payeeListMap,
    policyBenefitListMap: PHCLMOfClaimAssessmentController.claimEntities.policyBenefitListMap,
    beneficiaryListMap: PHCLMOfClaimAssessmentController.claimEntities.beneficiaryListMap,
    isShowIcon: !!paymentAllocation.errors?.length,
    claimPayableListMap:
      PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
  })
)
class AssessmentHandle extends PureComponent {

  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      individualPolicys: []
    };
  }


  handleRegister = async () => {
    const { dispatch, claimPayableListMap } = this.props;
    const AllRegisted = lodash.every(claimPayableListMap, (item) => item.registered);
    // if (AllRegisted) {
    //   notification.error({
    //     message: formatMessageApi({ Label_COM_Message: 'MSG_000399' }),
    //   });
    //   return false;
    // }
    const individualPolicys = await dispatch({
      type: 'PHCLMOfClaimAssessmentController/validateRegister',
    });
    if (individualPolicys) {
      this.setState({ showModal: true, individualPolicys });
    }
  };

  handleRetrieve = async () => {
    const { dispatch } = this.props;
    const individualPolicys = await dispatch({
      type: 'PHCLMOfClaimAssessmentController/validateRegister',
    });
    if (individualPolicys) {
      await dispatch({
        type: 'PHCLMOfClaimAssessmentController/validateRetrieve',
      });
    }
  };
  handleOk = () => {
    const { dispatch } = this.props;
    this.handleCancel();
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/claimRegister',
    });
  }

  handleCancel = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { handleBeneficiaryOpen, taskNotEditable, submited, open, isShowIcon } = this.props;
    const { showModal, individualPolicys } = this.state;

    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          <ButtonWithIcon
            handleClick={handleBeneficiaryOpen}
            open={open}
            showIcon={isShowIcon && submited}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
            })}
          />
          {!taskNotEditable && (
            <Button onClick={this.handleRegister}>
              {formatMessageApi({
                Label_BPM_Button: 'RegisterDeathClaim',
              })}
            </Button>
          )}
          {!taskNotEditable && (
            <Button onClick={this.handleRetrieve}>
              {formatMessageApi({
                Label_BPM_Button: 'RetrieveValues',
              })}
            </Button>
          )}
        {/* <SkipIntegration /> */}
        </div>
        <RegistrationModal showModal={showModal} handleCancel={this.handleCancel} handleOk={this.handleOk} individualPolicys={individualPolicys} />
      </div>
    );
  }
}

export default AssessmentHandle;
