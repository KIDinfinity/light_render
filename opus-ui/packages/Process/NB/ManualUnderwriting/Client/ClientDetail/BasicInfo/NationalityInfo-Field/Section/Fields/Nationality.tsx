import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, RuleByForm } from 'basic/components/Form';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';
import { fieldConfig } from './Nationality.config';

export { fieldConfig } from './Nationality.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCountryDropdown();
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ id });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const nationalityVisible = isTargetRelationOfInsured ? false : visible;

  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

  return (
    isShow &&
    nationalityVisible && (
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

const Nationality = ({ form, editable, layout, isShow, config, id }: any) => {
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

Nationality.displayName = 'nationality';

export default Nationality;
