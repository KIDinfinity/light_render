import { NAMESPACE } from '../activity.config';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import CaseCategory from 'enum/CaseCategory';
import { Icon } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonWithIcon from 'claim/components/ButtonWithIcon';
import handleMessageModal from '@/utils/commonMessage';
import TaskDefKey from 'basic/enum/TaskDefKey';

import styles from './AssessmentHandle.less';
import { formUtils } from 'basic/components/Form';

const AssessmentHandleSelector = (state: any) => {
  const {
    claimEditable,
    formCommonController,
    [NAMESPACE]: modelNameSpace,
    paymentAllocation,
  } = state;

  const isClickClaimRegister = modelNameSpace.isClickClaimRegister;
  const showPayeeInfoIcon = !!paymentAllocation.errors?.length;
  const showRegisterAlert = modelNameSpace.claimProcessData.showRegisterAlert;

  const taskNotEditable = claimEditable.taskNotEditable;
  return {
    taskNotEditable,
    isClickClaimRegister,
    showPayeeInfoIcon,
    showRegisterAlert,
    claimEntities: modelNameSpace.claimEntities,
  };
};
interface AssessmentHandleProps {
  handleBeneficiaryOpen: () => void;
  open: boolean;
  handleReAssessment: () => void;
  taskDetail: any;
  buttonList: any[];
  isAppeal?: boolean;
}
const AssessmentHandle = ({
  handleBeneficiaryOpen,
  open,
  taskDetail,
  buttonList,
  isAppeal,
}: AssessmentHandleProps) => {
  const dispatch = useDispatch();
  const [retrievLoading, setLetrievLoading] = useState(false);
  const [registerLoading, setregisterLoading] = useState(false);
  const {
    taskNotEditable,
    isClickClaimRegister,
    showPayeeInfoIcon,
    showRegisterAlert,
    claimEntities,
  } = useSelector(AssessmentHandleSelector, shallowEqual);
  const noPayable =
    !Object.keys(claimEntities?.claimPayableListMap || {})?.length ||
    (!Object.keys(claimEntities?.treatmentPayableListMap || {})?.length &&
      !Object.keys(claimEntities?.serviceItemPayableListMap || {})?.length &&
      !Object.keys(claimEntities?.claimPayableListMap || {})?.filter(
        (key) => claimEntities.claimPayableListMap[key]?.lifePayable
      )?.length);

  const isSkipIntegration = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      formUtils.queryValue(modelNamespace?.claimProcessData?.skipIntegration) === 'Y'
  );

  const isMajor = taskDetail.caseCategory === CaseCategory.BP_CLM_CTG008;
  const isAssessment = taskDetail.taskDefKey === TaskDefKey.BP_CLM_ACT004;
  const handleClaimRegister = async () => {
    setLetrievLoading(true);
    const payableError: any = await dispatch({
      type: `${NAMESPACE}/validateRegisterPayable`,
      payload: {
        isMajor,
      },
    });
    if (!lodash.isEmpty(payableError)) {
      handleMessageModal(payableError);
      setLetrievLoading(false);
      return;
    }
    if (isMajor) {
      const incidentsError = await dispatch({
        type: `${NAMESPACE}/validateIncidents`,
      });
      if (incidentsError?.length) {
        const messages = lodash
          .chain(incidentsError[0] || [])
          .map(({ field, message }: any) => ({
            code: field,
            content: `${field} is ${message}`,
          }))
          .value();
        handleMessageModal(messages);

        setLetrievLoading(false);
        return;
      }
    }

    // TODO:添加校验

    await dispatch({
      type: `${NAMESPACE}/paymentReAllocationSupplement`,
      payload: {
        NAMESPACE,
      },
    });

    await dispatch({
      type: `${NAMESPACE}/getSubmit`,
      payload: {
        type: 'register',
        buttonList,
      },
    });

    setLetrievLoading(false);
  };

  const handleRetrievePolicyValue = async () => {
    setregisterLoading(true);

    await dispatch({
      type: `${NAMESPACE}/getSubmit`,
      payload: {
        type: 'retrieve',
        buttonList,
      },
    });

    setregisterLoading(false);
  };

  return (
    <div
      className={styles.btnWrap}
      style={isAppeal ? { borderRadius: '6px', paddingTop: '16px' } : void 0}
    >
      <div className={styles.btnIcon}>
        {/* <NameScreening /> */}
        <ButtonWithIcon
          handleClick={handleBeneficiaryOpen}
          open={open}
          showIcon={showPayeeInfoIcon}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
          })}
        />
        {isAssessment && (
          <ButtonWithIcon
            handleClick={handleClaimRegister}
            buttonText={
              <span>
                {formatMessageApi({
                  Label_BIZ_Claim: 'Claim Register',
                })}
                {!!showRegisterAlert && isMajor && (
                  <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
                )}
              </span>
            }
            disabled={taskNotEditable || isSkipIntegration || noPayable}
            loading={retrievLoading}
            showIcon={isClickClaimRegister}
            errorsMSG={isClickClaimRegister}
          />
        )}
        {/* {isMajor && isAssessment && (
          <ButtonWithIcon
            handleClick={handleRetrievePolicyValue}
            disabled={isSkipIntegration}
            loading={registerLoading}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'retrievePolicyValue',
            })}
          />
        )} */}
      </div>
    </div>
  );
};
export default AssessmentHandle;
