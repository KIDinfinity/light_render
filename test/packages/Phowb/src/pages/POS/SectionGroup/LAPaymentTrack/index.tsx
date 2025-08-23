import React, { Component } from 'react';
import lodash from 'lodash';
import InforcePosDecision from '../../Section/InforcePosDecision';
import LATrack from '../../Section/LATrack';
import PaymentTrack from '../../Section/PaymentTrack';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { FormLayout } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { Payment } from '../../Enum';

class LAPaymentTrack extends Component<any> {
  get isShowInforcePosDecision() {
    const { taskDefKey, inforcePosDecision, isPOSHistory } = this.props;
    return (
      [TaskDefKey.PH_POS_ACT005, TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(
        taskDefKey
      ) ||
      (isPOSHistory && !lodash.isEmpty(inforcePosDecision))
    );
  }

  get isShowLATrack() {
    const { taskDefKey, isPOSHistory } = this.props;
    return (
      [TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(taskDefKey) || isPOSHistory
    );
  }

  get isShowPayment() {
    const {
      taskDefKey,
      transactionType,
      transactionTypeList,
      isPOSHistory,
      paymentTrack,
    } = this.props;
    const transaction = (lodash.chain(transactionTypeList) as any)
      .find({ transactionTypeCode: formUtils.queryValue(transactionType) })
      .get('payment')
      .value();
    return (
      ([TaskDefKey.PH_POS_ACT006, TaskDefKey.PH_POS_ACT010].includes(taskDefKey) &&
        transaction === Payment.Out) ||
      (isPOSHistory && !lodash.isEmpty(paymentTrack))
    );
  }

  render() {
    return (
      <FormLayout
        layConf={{
          default: 24,
          LATrack: this.isShowPayment ? 12 : 24,
          PaymentTrack: this.isShowLATrack ? 12 : 24,
        }}
      >
        {this.isShowInforcePosDecision ? <InforcePosDecision name="InforcePosDecision" /> : <></>}
        {this.isShowLATrack ? <LATrack name="LATrack" /> : <></>}
        {this.isShowPayment ? <PaymentTrack name="PaymentTrack" /> : <></>}
      </FormLayout>
    );
  }
}

export default connect(
  ({ claimEditable, phowbDataCaptureController, processTask, formCommonController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    laUpdateTrack: phowbDataCaptureController.claimProcessData.posDataDetail?.laUpdateTrack || {},
    taskDefKey: processTask?.getTask?.taskDefKey,
    transactionType:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
        ?.transactionType,
    transactionTypeList: phowbDataCaptureController.transactionTypeList,
    isPOSHistory: phowbDataCaptureController.isPOSHistory,
    paymentTrack: phowbDataCaptureController.claimProcessData?.posDataDetail?.paymentTrack || {},
    inforcePosDecision:
      phowbDataCaptureController.claimProcessData.posDataDetail?.inforcePosDecision || {},
  })
)(LAPaymentTrack);
