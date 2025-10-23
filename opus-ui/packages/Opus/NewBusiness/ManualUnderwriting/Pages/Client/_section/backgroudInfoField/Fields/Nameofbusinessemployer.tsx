import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemInput,
  Visible,
  RuleByForm,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './Nameofbusinessemployer.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
export { fieldConfig } from './Nameofbusinessemployer.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = Rule(config['required-condition'], form, '');

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });
  const required = requiredByRole;

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
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={required}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Nameofbusinessemployer = ({ form, editable, layout, isShow, id, config }: any) => {
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

Nameofbusinessemployer.displayName = 'nameOfBusinessEmployer';

export default Nameofbusinessemployer;
