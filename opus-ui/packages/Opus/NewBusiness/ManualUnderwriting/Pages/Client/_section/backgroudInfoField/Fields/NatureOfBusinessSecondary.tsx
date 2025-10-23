import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  Rule,
} from 'basic/components/Form';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './NatureOfBusinessSecondary.config';
import useGetNatureOfBusinessDicts from '../../../_hooks/useGetNatureOfBusinessDicts';
import useUpdateOccupationHierarchyValue from '../../../_hooks/useUpdateOccupationHierarchyValue';
export { fieldConfig } from './NatureOfBusinessSecondary.config';

const FormItem = ({ isShow, layout, form, editable, field, config, readOnly, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const fieldName = config.name || field;
  const dicts = useGetNatureOfBusinessDicts({ parentField: 'occupationSecondary', form });
  useUpdateOccupationHierarchyValue({
    id,
    field: fieldName,
    value: form.getFieldValue(fieldName),
    dicts,
    readOnly,
  });
  const visibleConditions = RuleByForm(config?.['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = Rule(config?.['required-condition'], form, '');
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const required = requiredByRole;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          allowClear={false}
          dicts={dicts}
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
          required={required}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const NatureOfBusinessSecondary = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  readOnly,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        readOnly={readOnly}
      />
    </Authority>
  );
};

NatureOfBusinessSecondary.displayName = 'natureOfBusinessSecondary';

export default NatureOfBusinessSecondary;
