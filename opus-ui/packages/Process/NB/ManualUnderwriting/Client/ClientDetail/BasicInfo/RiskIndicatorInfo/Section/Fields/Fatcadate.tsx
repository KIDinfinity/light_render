import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
import { Authority, FormItemDatePicker, Visible, Editable } from 'basic/components/Form';
import useGetEditableByFatca from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByFatca';
import { fieldConfig } from './Fatcadate.config';

export { fieldConfig } from './Fatcadate.config';

const FormItem = ({ isShow, layout, form, field, config, id, editable }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = useGetEditableByFatca({ id });

  const disabled = useJudgeNewClientDisabled({
    config,
    localConfig: {},
    editableConditions,
  });
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
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? disabled
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Fatcadate = ({ form, editable, layout, isShow, id, config }: any) => {
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

Fatcadate.displayName = 'fatcaDate';

export default Fatcadate;
