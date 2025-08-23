import React from 'react';
import { Col } from 'antd';
import useGetUsTaxFlag from 'process/NB/ManualUnderwriting/_hooks/useGetUsTaxFlag';
import { Authority, FormItemInput, Visible } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { fieldConfig } from './Ustn.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
export { fieldConfig } from './Ustn.config';

const FormItem = ({ isShow, layout, form, field, config, id }: any) => {
  const regionCode = tenant.region();
  const usTaxFlag = useGetUsTaxFlag({ id });

  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = regionCode === Region.PH ? !usTaxFlag : true;
  const requiredConditions = regionCode === Region.PH ? usTaxFlag : true;
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
          disabled={editableConditions}
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

const Ustn = ({ form, editable, layout, isShow, id, config }: any) => {
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

Ustn.displayName = 'usTn';

export default Ustn;
