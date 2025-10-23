import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Tinsssgsis.config';

export { fieldConfig } from './Tinsssgsis.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = getDrowDownList('Dropdown_IND_TIN');

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
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
        />
      </Col>
    )
  );
};

const Tinsssgsis = ({ form, editable, layout, isShow, config, id }: any) => {
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

Tinsssgsis.displayName = 'tinsssgsis';

export default Tinsssgsis;
