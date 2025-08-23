import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './usTaxFlag.config';

export { fieldConfig } from './usTaxFlag.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useHandleChangeUsTaxFlag from 'process/NB/ManualUnderwriting/_hooks/useHandleUsTaxFlag.ts';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config, fieldProps });

  const handleUsTaxFlag = useHandleChangeUsTaxFlag();
  const visibleConditions = RuleByForm(fieldProps['editable-condition'], form);
  const disabled = useJudgeNewClientDisabled({
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
          hiddenPrefix
          precision={0}
          onChange={handleUsTaxFlag}
        />
      </Col>
    )
  );
};

const usTaxFlag = ({ form, editable, layout, isShow, config }: any) => {
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

usTaxFlag.displayName = 'usTaxFlag';

export default usTaxFlag;
