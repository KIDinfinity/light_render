import { NAMESPACE } from '../activity.config';

/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, notification } from 'antd';
import lodash from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import { VLD_000006 } from 'claim/pages/validators/fieldValidators';
import NameScreening from '../NameScreening';
import styles from './AssessmentHandle.less';
import { safeParseUtil } from '@/utils/utils';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';

interface IProps {
  isClickClaimRegister: boolean;
  handleBeneficiaryOpen: any;
  handleClaimRgister: any;
  handleReAssessment: any;
  taskNotEditable: boolean;
  reAssessmentLoading: any;
  submited: boolean;
  open: any;
  isShowIcon: any;
  taskDetail: any;
  diagnosisListMap: any;
  serviceItemListMap: any;
  buttonList: any;
}

@connect(
  ({
    claimEditable,
    loading,
    formCommonController,
    [NAMESPACE]: modelnamepsace,
    paymentAllocation,
    processTask,
    workspaceSwitchOn,
    navigatorInformationController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    reAssessmentLoading: loading.effects['commonClaimAssessmentController/reAssessment'],
    submited: formCommonController.submited,
    payeeListMap: modelnamepsace.claimEntities.payeeListMap,
    isClickClaimRegister: modelnamepsace.isClickClaimRegister,
    diagnosisListMap: modelnamepsace.claimEntities.diagnosisListMap,
    policyBenefitListMap: modelnamepsace.claimEntities.policyBenefitListMap,
    beneficiaryListMap: modelnamepsace.claimEntities.beneficiaryListMap,
    isShowIcon: !!paymentAllocation.errors?.length,
    tabs: navigatorInformationController.tabs,
    isShowRemark: workspaceSwitchOn.isShow.isShowRemark,
    taskDetail: processTask.getTask,
    serviceItemListMap: modelnamepsace.claimEntities?.serviceItemListMap,
  })
)
class AssessmentHandle extends PureComponent<IProps> {
  state = {
    isRegisterTrigger: false,
  };

  handleClickClaimRegister = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: `${NAMESPACE}/savePartyListInfo`,
      payload: {
        isClickClaimRegister: true,
      },
    });
  };

  handleClaimRgister = async () => {
    const {
      dispatch,
      taskDetail,
      buttonList,
      tabs,
      isShowRemark,
      diagnosisListMap,
    }: any = this.props;
    const isNoDiagnosisListMap = lodash.isEmpty(diagnosisListMap);
    const { isRegisterTrigger } = this.state;

    if (isNoDiagnosisListMap) {
      return this.handleClickClaimRegister();
    }

    if (isRegisterTrigger) return;
    this.setState({
      isRegisterTrigger: true,
    });

    const activityButtonList = lodash.first(buttonList)?.activityButtonServiceList;
    const { method = {}, activityVariables = {} } = lodash.pick(
      safeParseUtil(activityButtonList?.[1]?.buttonParams),
      ['method', 'activityVariables']
    );
    setTimeout(async () => {
      await dispatch({
        type: `${NAMESPACE}/isClickRegisterToggle`,
        payload: true,
      });
      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      await dispatch({
        type: `${NAMESPACE}/isClickRegisterToggle`,
        payload: false,
      });
      if (errors?.length > 0) {
        this.setState({
          isRegisterTrigger: false,
        });

        return;
      }

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const submitData = getSubmitData({ taskDetail, dataForSubmit, variables: activityVariables });
      const inquiryClaimNo = lodash.get(submitData?.businessData, 'inquiryClaimNo');
      // 对接payment allocation
      const backData: any = await dispatch({
        type: 'paymentAllocation/allocationDockings',
        payload: {
          claimData: submitData?.businessData,
        },
      });
      const { output } = backData;
      lodash.set(submitData, 'businessData', output);

      const response = await dispatch({
        type: `${NAMESPACE}/registerHkClaimCase`,
        payload: {
          ...submitData,
          method,
          inquiryBusinessNo: inquiryClaimNo,
        },
      });

      // 将返回的claim数据同步到主页面
      if (!lodash.isEmpty(output)) {
        dispatch({
          type: `${NAMESPACE}/savePaymentAllocation`,
          payload: output,
        });
      }

      this.setState({
        isRegisterTrigger: false,
      });

      if (response?.success) {
        notification.success({
          message: 'Claim Register successfully!',
        });

        dispatch({
          type: `${NAMESPACE}/checkRegisterMcs`,
          payload: {
            caseNo: taskDetail?.caseNo,
          },
        });

        if (isShowRemark) {
          dispatch({
            type: 'navigatorInformationController/loadAllCategoryInformation',
            payload: {
              tabs,
            },
          });
        } else {
          dispatch({
            type: 'workspaceSwitchOn/changeSwitch',
            payload: {
              name: 'remark',
            },
          });
        }
      }
    });
  };

  render() {
    const {
      handleBeneficiaryOpen,
      handleReAssessment,
      taskNotEditable,
      reAssessmentLoading,
      submited,
      open,
      isShowIcon,
      taskDetail,
      diagnosisListMap,
      isClickClaimRegister,
    } = this.props;

    const isNoDiagnosisListMap = lodash.isEmpty(diagnosisListMap);
    const defKeyOfMaunal = lodash.isEqual(TaskDefKey.HK_CLM_ACT003, taskDetail?.taskDefKey);
    return (
      <div className={styles.btnWrap}>
        <div className={styles.btnIcon}>
          <NameScreening />
          {!taskNotEditable && (
            <Button onClick={handleReAssessment} loading={reAssessmentLoading}>
              {formatMessageApi({
                Label_BPM_Button:
                  'app.navigator.task-detail-of-claim-assessment.button.re-assessment',
              })}
            </Button>
          )}
          <ButtonWithIcon
            // eslint-disable-next-line react/jsx-no-bind
            handleClick={handleBeneficiaryOpen}
            open={open}
            showIcon={isShowIcon && submited}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
            })}
          />
          {defKeyOfMaunal && (
            <ButtonWithIcon
              handleClick={this.handleClaimRgister}
              buttonText={formatMessageApi({
                Label_BIZ_Claim: 'Claim Register',
              })}
              disabled={taskNotEditable}
              loading={this.state.isRegisterTrigger}
              showIcon={isClickClaimRegister && isNoDiagnosisListMap}
              errorsMSG={isClickClaimRegister && VLD_000006(isNoDiagnosisListMap)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default AssessmentHandle;
