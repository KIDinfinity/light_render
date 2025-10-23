import React from 'react';
import { Col } from 'antd';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './CountryName.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
export { fieldConfig } from './CountryName.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isLast }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCountryDropdown();
  // const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const visibleConditions = !isLast || RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions: false,
    config,
    localConfig: fieldConfig,
  });
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          required={requiredByRole}
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=""
          // onFocus={() => {
          //   const value = form.getFieldValue(field);
          //   handleFocus({ value, field });
          // }}
        />
      </Col>
    )
  );
};

const CountryName = ({ form, editable, layout, isShow, id, config, isLast }: any) => {
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
        isLast={isLast}
      />
    </Authority>
  );
};

CountryName.displayName = 'countryName';

export default CountryName;
