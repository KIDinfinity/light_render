import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemInput, Visible, RuleByForm } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import useGetLabelByCustomerType from 'process/NB/ManualUnderwriting/_hooks/useGetLabelByCustomerType';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { fieldConfig } from './Surname.config';

export { fieldConfig } from './Surname.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = tenant.isKH();
  const label = useGetLabelByCustomerType({
    id,
    dictCode: config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode,
    typeCode: config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode,
  });
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={label?.dictCode}
          labelTypeCode={label?.typeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Surname = ({ form, editable, layout, isShow, config, id }: any) => {
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
      />
    </Authority>
  );
};

Surname.displayName = 'surname';

export default Surname;
