import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import useGetRelationOfInsuredDict from 'process/NB/ManualUnderwriting/_hooks/useGetRelationOfInsuredDict';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
import { fieldConfig } from './Relationofinsured.config';

export { fieldConfig } from './Relationofinsured.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const relationOfInsuredDict = useGetRelationOfInsuredDict();
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

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={relationOfInsuredDict || dicts}
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

const Relationofinsured = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

Relationofinsured.displayName = 'relationOfInsured';

export default Relationofinsured;
