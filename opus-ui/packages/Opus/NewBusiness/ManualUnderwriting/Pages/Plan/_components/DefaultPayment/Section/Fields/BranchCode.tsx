import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  Required,
  Visible,
  RuleByForm,
  FormItemSelectPlus,
} from 'basic/components/Form';
import { fieldConfig } from './BranchCode.config';

export { fieldConfig } from './BranchCode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();

  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
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
          getPopupContainer={() => document.body}
          dropdownCode="misc_dict_dropdown_branch"
          optionShowType="both"
        />
      </Col>
    )
  );
};

const BranchCode = ({ form, editable, config, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
      id={id}
    />
  </Authority>
);

BranchCode.displayName = 'branchCode';

export default BranchCode;
