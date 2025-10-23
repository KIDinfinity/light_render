import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { Authority, Editable, FormItemSelect, RuleByForm } from 'basic/components/Form';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';
import { fieldConfig } from './Gender.config';

export { fieldConfig } from './Gender.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ id });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const genderVisible = isTargetRelationOfInsured ? false : visible;

  return (
    isShow &&
    genderVisible && (
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

const Gender = ({ form, editable, layout, isShow, config, id }: any) => {
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

Gender.displayName = 'gender';

export default Gender;
