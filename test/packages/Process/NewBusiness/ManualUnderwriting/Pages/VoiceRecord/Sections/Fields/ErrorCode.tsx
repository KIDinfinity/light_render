/*
 * @Author: Hugo 224311@hk.fwd.com
 * @Date: 2024-04-24 14:36:23
 * @LastEditors: Hugo 224311@hk.fwd.com
 * @LastEditTime: 2024-04-29 11:29:46
 * @FilePath: /Venus-UI/packages/Process/NewBusiness/ManualUnderwriting/Pages/VoiceRecord/Sections/Fields/ErrorCode.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  RuleByForm,
  Visible,
} from 'basic/components/Form';
import React from 'react';
import { fieldConfig } from '../../_config/voiceRecord/ErrorCode';
export { fieldConfig } from '../../_config/voiceRecord/ErrorCode';
const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
        />
      </Col>
    )
  );
};

const ErrorCode = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

ErrorCode.displayName = 'errorCode';

export default ErrorCode;
