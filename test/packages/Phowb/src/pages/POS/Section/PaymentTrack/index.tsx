import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemDatePicker, FormItemSelect } from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import { FormId } from '../../Enum';

class PaymentTrack extends Component<any> {
  get required() {
    const { taskDefKey } = this.props;
    return taskDefKey === TaskDefKey.PH_POS_ACT010;
  }

  render() {
    const { form, taskNotEditable, Dropdown_POS_PaymentStatus } = this.props;

    return (
      <FormSection
        form={form}
        formId={FormId.PaymentTrack}
        title="venus_claim.phowb.dataCapture.label.paymentTrack"
        layConf={12}
        isMargin
      >
        <FormItemDatePicker
          form={form}
          formName="paymentToFinanceDate"
          disabled={taskNotEditable}
          labelId="venus_claim.phowb.dataCapture.label.paymentTrack.payOutDate"
          format="L"
        />
        <FormItemSelect
          form={form}
          required={this.required}
          disabled={taskNotEditable}
          formName="paymentStatus"
          labelId="venus_claim.phowb.dataCapture.label.paymentTrack.paymentStatus"
          dicts={Dropdown_POS_PaymentStatus}
        />
      </FormSection>
    );
  }
}

export default connect(
  ({
    claimEditable,
    phowbDataCaptureController,
    dictionaryController,
    processTask,
    formCommonController,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    paymentTrack: phowbDataCaptureController.claimProcessData?.posDataDetail?.paymentTrack || {},
    Dropdown_POS_PaymentStatus: dictionaryController.Dropdown_POS_PaymentStatus,
    taskDefKey: processTask?.getTask?.taskDefKey,
    transactionType:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
        ?.transactionType,
    transactionTypeList: phowbDataCaptureController.transactionTypeList,
    validating: formCommonController.validating,
    isPOSHistory: phowbDataCaptureController.isPOSHistory,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updatePaymentTrack',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updatePaymentTrack',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { paymentTrack }: any = props;
      return formUtils.mapObjectToFields(paymentTrack);
    },
  })(PaymentTrack)
);
