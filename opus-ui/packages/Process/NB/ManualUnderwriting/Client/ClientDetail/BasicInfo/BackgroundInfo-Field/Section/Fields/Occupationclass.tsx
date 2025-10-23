import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import useAutoLoadOccupationClassSubDict from 'process/NB/ManualUnderwriting/_hooks/useAutoLoadOccupationClassSubDict';
import useGetOccupationclass from 'process/NB/ManualUnderwriting/_hooks/useGetOccupationclass';
import { fieldConfig } from './Occupationclass.config';

export { fieldConfig } from './Occupationclass.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = useGetOccupationclass({
    fieldConfig,
    id,
    field,
    config,
    parentCode: form.getFieldValue('occupationCode'),
  });

  const visibleConditions = true;
  const editableConditions = useJudgeNewClientDisabled({
    config,
    localConfig: {},
    editableConditions: true,
  });
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

  useAutoLoadOccupationClassSubDict({ id });
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

const Occupationclass = ({ form, editable, layout, isShow, id, config }: any) => {
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

Occupationclass.displayName = 'occupationClass';

export default Occupationclass;
