import React from 'react';
import lodash from 'lodash';
import InforcePosDecision from '../../Section/InforcePosDecision';
import LATrack from '../../Section/LATrack';
import PaymentTrack from '../../Section/PaymentTrack';
import { connect } from 'dva';
import { FormLayout } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { Payment } from '../../Enum';

const LAPaymentTrack = (props: any) => {
  const {
    taskDefKey,
    inforcePosDecisionEmpty,
    isPOSHistory,
    transactionType,
    transactionTypeList,
    paymentTrack,
    srvTransactionType,
  } = props;
  const isShowInforcePosDecision = [TaskDefKey.PH_POS_ACT005, TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(
    taskDefKey
  );
  const isShowLATrack = [TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(taskDefKey) || isPOSHistory;

  const isShowPayment = ([TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(taskDefKey) &&
    srvTransactionType?.payment === Payment.Out) ||
    (isPOSHistory && !lodash.isEmpty(paymentTrack))

  return (
    <FormLayout
      layConf={{
        default: 24,
        LATrack: isShowPayment ? 12 : 24,
        PaymentTrack: isShowLATrack ? 12 : 24,
      }}
    >
      {isShowInforcePosDecision ? <InforcePosDecision name="InforcePosDecision" /> : <></>}
      {isShowLATrack ? <LATrack name="LATrack" /> : <></>}
      {isShowPayment ? <PaymentTrack name="PaymentTrack" /> : <></>}
    </FormLayout>
  );
}

export default connect(
  ({ claimEditable, GeneralPOSPHNotCFTController, processTask }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    taskDefKey: processTask?.getTask?.taskDefKey,
    transactionType:
      GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.posRequestInformation
        ?.transactionType,
    transactionTypeList: GeneralPOSPHNotCFTController.transactionTypeList,
    isPOSHistory: GeneralPOSPHNotCFTController.isPOSHistory,
    paymentTrack: GeneralPOSPHNotCFTController.claimProcessData?.businessData?.paymentTrack || {},
    srvTransactionType: GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionTypes?.[0]?.srvTransactionType || {},
    inforcePosDecisionEmpty:
      lodash.isNil(GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionType?.[0]?.decision) &&
      !GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionType?.[0]?.declineReason,

  })
)(LAPaymentTrack);
