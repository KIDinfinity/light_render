import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, Rule } from 'basic/components/Form';
import SwitchComponent from 'basic/components/SwitchComponent';

import { localFieldConfig } from './Remark.config';

export { localFieldConfig } from './Remark.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <SwitchComponent
          commonProps={{
            form,
            formName: config.name || field,
            labelId: config.label?.dictCode || fieldProps.label.dictCode,
            labelTypeCode: config.label?.dictTypeCode || fieldProps.label?.dictTypeCode,
            required:
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes,
          }}
          unCheckedChildrenProps={{
            disabled:
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No),
            isEllipsis: true,
            maxLength: config?.maxLength || fieldProps.maxLength,
            cusTitle: true,
          }}
          checkedChildrenProps={{
            disabled:
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No),
            autoSize: true,
          }}
        />
      </Col>
    )
  );
};

const Remark = ({ field, config, isShow, layout, form, editable, id, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

Remark.displayName = 'Remark';

export default Remark;
