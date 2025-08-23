import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, FormItemDatePicker, RuleByForm } from 'basic/components/Form';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';
import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Dateofbirth.config';
import useHandleDOBChangeCallback from 'process/NewBusiness/ManualUnderwriting/_hooks/useHandleDOBChangeCallback';
export { fieldConfig } from './Dateofbirth.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ form });
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const dateOfBirthVisible = isTargetRelationOfInsured ? false : visible;
  const requiredConditions = false;
  const Rules = {};
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const handleChange = useHandleDOBChangeCallback({ currentClientId: id });
  return (
    isShow &&
    dateOfBirthVisible && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          onChange={handleChange}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Dateofbirth = ({ form, editable, layout, isShow, config, id }: any) => {
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

Dateofbirth.displayName = 'dateOfBirth';

export default Dateofbirth;
