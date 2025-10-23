import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Identitytype.config';

export { fieldConfig } from './Identitytype.config';
import useCheckIdentitytypeDisable from 'process/NB/ManualUnderwriting/_hooks/useCheckIdentitytypeDisable';
import useUpdateIdentityType from 'process/NB/ManualUnderwriting/_hooks/useUpdateIdentityType';
import useResetDateByIdentityType from 'process/NB/ManualUnderwriting/_hooks/useResetDateByIdentityType';
import { tenant, Region } from '@/components/Tenant';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  let dicts = getDrowDownList({ config, fieldProps });
  const regionCode = tenant.region();
  const MYIdentityType = ['PP', 'ID'];
  if (regionCode === Region.MY)
    dicts = dicts.filter((item) => MYIdentityType.includes(item.dictCode));
  const visibleConditions = true;
  const editableConditions = useCheckIdentitytypeDisable({
    id,
    notMatch: !RuleByForm(fieldProps['editable-condition'], form),
  });
  const requiredConditions = false;

  useUpdateIdentityType({
    nationality: form.getFieldValue('nationality'),
    customerAge: form.getFieldValue('customerAge'),
    id,
  });
  const handleChange = useResetDateByIdentityType({ id });
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
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Identitytype = ({ form, editable, layout, isShow, config, id }: any) => {
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

Identitytype.displayName = 'identityType';

export default Identitytype;
