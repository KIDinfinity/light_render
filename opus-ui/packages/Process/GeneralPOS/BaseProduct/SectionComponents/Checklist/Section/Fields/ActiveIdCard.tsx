import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './ActiveIdCard.config';

export { fieldConfig } from './ActiveIdCard.config';

const FormItem = ({ isShow, layout, form, editable, field, config, remark }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = lodash.includes(remark, field);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCheckbox
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
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
        />
      </Col>
    )
  );
};

const ActiveIdCard = ({ field, config, form, editable, layout, isShow, remark }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      remark={remark}
    />
  </Authority>
);

ActiveIdCard.displayName = fieldConfig.field;

export default ActiveIdCard;
