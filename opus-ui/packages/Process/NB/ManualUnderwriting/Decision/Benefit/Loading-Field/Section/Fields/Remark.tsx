import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
  FormItemAutoSizeTextArea,
} from 'basic/components/Form';
import { fieldConfig } from './Remark.config';
import { tenant, Region } from '@/components/Tenant';
export { fieldConfig } from './Remark.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {tenant.region() === Region.ID ? (
          <FormItemAutoSizeTextArea
            disabled={
              !editable ||
              ((config?.['field-props']?.visible || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.['field-props']?.visible || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={
              config?.['field-props']?.required === Required.Conditions
                ? requiredConditions
                : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
            }
            labelType="inline"
            placeholder=" "
            maxLength={500}
            hiddenPrefix
            precision={0}
            autoSize={true}
          />
        ) : (
          <FormItemInput
            disabled={
              !editable ||
              ((config?.['field-props']?.visible || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.['field-props']?.visible || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={
              config?.['field-props']?.required === Required.Conditions
                ? requiredConditions
                : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
            }
            labelType="inline"
            placeholder=" "
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Remark = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
    />
  </Authority>
);

Remark.displayName = 'remark';

export default Remark;
