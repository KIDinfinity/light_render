import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';

import FormSection from 'basic/components/Form/FormSection';
import { FormItemInput, FormItemNumber, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TaskDefKey from 'enum/TaskDefKey';
import { namespace } from '../../_models';
import { FormId } from '../../Enum';

interface IProps {
  dispatch?: Dispatch<any>;
  form?: any;
}
class Refund extends Component<IProps> {
  get isNotEditable() {
    const { taskNotEditable, taskDefKey }: any = this.props;
    return (
      taskNotEditable || ![TaskDefKey.PH_POS_ACT001, TaskDefKey.PH_POS_ACT003].includes(taskDefKey)
    );
  }

  render() {
    const { form, taskDefKey } = this.props;
    return (
      <FormSection
        form={form}
        formId={FormId.Refund}
        title="Refund"
        layConf={{
          default: 4,
        }}
        isMargin
        formatType="Label_BIZ_POS"
      >
        <FormItemInput
          form={form}
          disabled
          name="PolicyNo"
          formName="policyNo"
          labelId="PolicyNo"
        />
        <FormItemInput
          form={form}
          formName="subAccountTemp"
          formItemLayout="Label_BIZ_POS"
          disabled
          labelId="SubAC"
        />
        <FormItemInput
          form={form}
          disabled
          name="Currency"
          formName="currency"
          labelId="Currency"
        />
        <FormItemNumber
          form={form}
          disabled
          name="SuspenseAmt"
          formName="suspenseAmount"
          labelId="SuspenseAmt"
        />
        <FormItemNumber
          form={form}
          required
          formName="refundAmount"
          labelId="RefundAmt"
          triggerEvent="onBlur"
          pattern={/^\d+$|(^\d+\.\d)|(^\d+\.)+$/g}
          precision={2}
          disabled={this.isNotEditable}
          formItemLayout="Label_BIZ_POS"
          rules={[
            {
              validator: (rule, value, callback) => {
                if (
                  value > form.getFieldValue('suspenseAmount') &&
                  TaskDefKey.PH_POS_ACT003 !== taskDefKey
                ) {
                  callback(
                    formatMessageApi({
                      message: 'ERR_000293',
                    })
                  );
                } else {
                  callback();
                }
              },
            },
          ]}
        />
      </FormSection>
    );
  }
}

export default connect(({ phowbDataCaptureController, claimEditable, processTask }: any) => ({
  refund: phowbDataCaptureController.claimProcessData.posDataDetail?.refund || {},
  taskNotEditable: claimEditable.taskNotEditable,
  taskDefKey: processTask?.getTask?.taskDefKey,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      dispatch({
        type: `${namespace}/updateRefund`,
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { refund }: any = props;
      return formUtils.mapObjectToFields(refund);
    },
  })(Refund)
);
