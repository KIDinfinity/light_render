import React from 'react';
import { Col } from 'antd';

import { Authority, Visible, Editable, FormItemInput, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Contactno.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

export { fieldConfig } from './Contactno.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, handleFocus, id }: any) => {
  // const regionCode = tenant.region();
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });
  // const prefix = useMemo(() => {
  //   if (regionCode === Region.PH) {
  //     const countryCode = form.getFieldValue('countryCode')
  //     return countryCode ? `${countryCode}-` : null
  //   }
  //   return null
  // }, [form, regionCode])
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
          // prefix={prefix}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}

          precision={0}
          onFocus={() => {
            const value = form.getFieldValue(field);
            handleFocus({ value, field });
          }}
        />
      </Col>
    )
  );
};

const Contactno = ({ form, editable, layout, isShow, id, config, handleFocus }: any) => {
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
        handleFocus={handleFocus}
      />
    </Authority>
  );
};

Contactno.displayName = 'contactNo';

export default Contactno;
