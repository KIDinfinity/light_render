import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemNumber } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';

import { localFieldConfig } from './ChangeObjectAmount.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const payableAmount = form.getFieldValue('payableAmount');
  const refundAmount = form.getFieldValue('refundAmount');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          warningMessage={
            payableAmount < refundAmount?
            [{
              messageType: MessageType.Information,
              message: [formatMessageApi({ Label_COM_WarningMessage: 'MSG_001191' })]
            }] : void 0
          }
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          min={Number.MIN_SAFE_INTEGER}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const ChangeObjectAmount = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

ChangeObjectAmount.displayName = localFieldConfig.field;

export default ChangeObjectAmount;
