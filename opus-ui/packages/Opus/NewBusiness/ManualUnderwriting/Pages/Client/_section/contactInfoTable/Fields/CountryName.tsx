import React from 'react';
import { Col } from 'antd';
import useGetCountryDropdown from '../../../_hooks/useGetCountryDropdown';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './CountryName.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
export { fieldConfig } from './CountryName.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isLast, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCountryDropdown();
  // const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const visibleConditions = !isLast || RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions: false,
    config,
    localConfig: fieldConfig,
    clientId: id
  });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
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
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}

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
