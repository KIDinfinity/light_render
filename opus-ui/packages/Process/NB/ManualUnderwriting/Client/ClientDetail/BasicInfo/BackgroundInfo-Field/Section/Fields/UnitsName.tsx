import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
import { Authority, Editable, FormItemInput, Visible } from 'basic/components/Form';
import useLinkDataWithIndustry from 'process/NB/ManualUnderwriting/_hooks/useLinkDataWithIndustry';
import { fieldConfig } from './UnitsName.config';

export { fieldConfig } from './UnitsName.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const linkEditable = useLinkDataWithIndustry({
    id,
    monitorValue: form.getFieldValue('natureOfBusiness'),
    currentField: field,
    defaultValue: 'NA',
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

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            linkEditable ??
            (!editable ||
              ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No))
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

const UnitsName = ({ form, editable, layout, isShow, id, config }: any) => {
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

UnitsName.displayName = 'unitsName';

export default UnitsName;
