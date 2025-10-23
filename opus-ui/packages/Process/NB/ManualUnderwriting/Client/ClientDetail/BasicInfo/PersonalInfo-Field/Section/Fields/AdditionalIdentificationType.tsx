import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './AdditionalIdentificationType.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
export { fieldConfig } from './AdditionalIdentificationType.config';
import { tenant, Region } from '@/components/Tenant';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  let dicts = getDrowDownList({ config, fieldProps });
  const regionCode = tenant.region();
  const MYIdentityType = ['BC', 'IO'];
  if (regionCode === Region.MY)
    dicts = dicts.filter((item) => MYIdentityType.includes(item.dictCode));
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
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
        />
      </Col>
    )
  );
};

const AdditionalIdentificationType = ({ form, editable, layout, isShow, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </Authority>
  );
};

AdditionalIdentificationType.displayName = 'additionalIdentificationType';

export default AdditionalIdentificationType;
