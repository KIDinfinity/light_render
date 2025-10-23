import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';

import { Authority, Editable, FormItemInput, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Address2.config';

export { fieldConfig } from './Address2.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isDropEmptyData, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
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
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Address2 = ({ form, editable, layout, isShow, id, config, isDropEmptyData }: any) => {
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
        isDropEmptyData={isDropEmptyData}
      />
    </Authority>
  );
};

Address2.displayName = 'address2';

export default Address2;
