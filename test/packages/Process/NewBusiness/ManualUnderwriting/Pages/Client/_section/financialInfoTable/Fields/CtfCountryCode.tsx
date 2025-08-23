import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useGetCountryDropdown from '../../../_hooks/useGetCountryDropdown';
import { fieldConfig } from './CtfCountryCode.config';
export { fieldConfig } from './CtfCountryCode.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  crtItemId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCountryDropdown();

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
          // labelType="inline"
          placeholder=""
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Country = ({ form, editable, layout, isShow, config, id, crtItemId }: any) => {
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
        crtItemId={crtItemId}
      />
    </Authority>
  );
};

Country.displayName = 'country';

export default Country;
