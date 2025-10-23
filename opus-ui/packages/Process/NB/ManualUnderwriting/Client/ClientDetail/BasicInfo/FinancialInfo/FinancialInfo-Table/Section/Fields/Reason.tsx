import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelect,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Reason.config';
import useHandleChangeUsTaxFlag from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeUsTaxFlag';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
export { fieldConfig } from './Reason.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, crtItemId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);
  const handleChange = useHandleChangeUsTaxFlag({ id, crtItemId, name: 'reason' });
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
        {lodash.includes([Region.ID, Region.MY], tenant.region()) ? (
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
            hiddenPrefix
            precision={0}
            labelType="inline"
            placeholder=""
            onChange={handleChange}
          />
        ) : (
          <FormItemInput
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
            hiddenPrefix
            precision={0}
            labelType="inline"
            placeholder=""
            onChange={handleChange}
          />
        )}
      </Col>
    )
  );
};

const Reason = ({ form, editable, layout, isShow, config, id, crtItemId }: any) => {
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

Reason.displayName = 'reason';

export default Reason;
