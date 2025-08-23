import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useResetOptionByTag from 'process/NB/ManualUnderwriting/_hooks/useResetOptionByTag';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Vulnerablecustomertag.config';

export { fieldConfig } from './Vulnerablecustomertag.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const handleChange = useResetOptionByTag({ id });

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
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Vulnerablecustomertag = ({ form, editable, layout, isShow, config, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={lodash.get(config, 'field-props')}
      field={fieldConfig?.field}
      id={id}
    />
  </Authority>
);

Vulnerablecustomertag.displayName = 'vulnerableCustomerTag';

export default Vulnerablecustomertag;
