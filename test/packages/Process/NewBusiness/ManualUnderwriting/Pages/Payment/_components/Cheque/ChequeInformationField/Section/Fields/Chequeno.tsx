import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import useHandleChequeNumberBlurCallback from 'process/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks/useHandleChequeNumberBlurCallback';
import { fieldConfig } from './Chequeno.config';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
export { fieldConfig } from './Chequeno.config';

const FormItem = ({ isShow, layout, form, editable, field, config, displayWarning }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  const handleBlur = useHandleChequeNumberBlurCallback();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          warningMessage={
            displayWarning && [
              {
                messageType: MessageType.Information,
                message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001259' }),
              },
            ]
          }
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          onBlur={handleBlur}
        />
      </Col>
    )
  );
};

const Chequeno = ({ form, editable, layout, isShow, config, displayWarning }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      displayWarning={displayWarning}
    />
  </Authority>
);

Chequeno.displayName = 'chequeNo';

export default Chequeno;
