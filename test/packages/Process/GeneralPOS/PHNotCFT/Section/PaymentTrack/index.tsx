import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemDatePicker, FormItemSelect } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId } from '../../Enum';
import styles from './index.less';

const PaymentTrack = (props: any) => {
  const { form, taskNotEditable, Dropdown_POS_PaymentStatus, taskDefKey } = props;

  const required = taskDefKey === TaskDefKey.PH_POS_ACT010;
  return (
    <FormSection
      form={form}
      formId={FormId.PaymentTrack}
      title="venus_claim.phowb.dataCapture.label.paymentTrack"
      layConf={12}
      isMargin
      className={styles.paymentTrack}
    >
      <FormItemDatePicker
        form={form}
        formName="payoutDate"
        disabled={taskNotEditable}
        labelId="venus_claim.phowb.dataCapture.label.paymentTrack.payOutDate"
        format="L"
      />
      <FormItemSelect
        form={form}
        required={required}
        disabled={taskNotEditable}
        formName="paymentStatus"
        labelId="venus_claim.phowb.dataCapture.label.paymentTrack.paymentStatus"
        dicts={Dropdown_POS_PaymentStatus}
      />
    </FormSection>
  );
};

export default connect(
  ({ claimEditable, GeneralPOSPHNotCFTController, dictionaryController, processTask }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    paymentTrack:
      GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionTypes?.[0]
        ?.paymentTrack || {},
    Dropdown_POS_PaymentStatus: dictionaryController.Dropdown_POS_PaymentStatus,
    taskDefKey: processTask?.getTask?.taskDefKey,
    transactionType:
      GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.posRequestInformation
        ?.transactionType,
    transactionTypeList: GeneralPOSPHNotCFTController.transactionTypeList,

    isPOSHistory: GeneralPOSPHNotCFTController.isPOSHistory,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'GeneralPOSPHNotCFTController/saveFormData',
          target: 'updatePaymentTrack',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { paymentTrack }: any = props;
      return formUtils.mapObjectToFields(paymentTrack);
    },
  })(PaymentTrack)
);
