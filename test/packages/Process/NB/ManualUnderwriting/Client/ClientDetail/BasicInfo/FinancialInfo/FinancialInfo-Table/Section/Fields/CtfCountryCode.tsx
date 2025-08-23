import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import { fieldConfig } from './CtfCountryCode.config';
import useHandleChangeUsTaxFlag from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeUsTaxFlag';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
export { fieldConfig } from './CtfCountryCode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, crtItemId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCountryDropdown();

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
  const handleChange = useHandleChangeUsTaxFlag({ id, crtItemId, name: 'ctfCountryCode' });

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
          // labelType="inline"
          placeholder=""
          hiddenPrefix
          precision={0}
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Country = ({ form, editable, layout, isShow, config, id, crtItemId, itemIndex }: any) => {
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
        crtItemId={crtItemId}
        itemIndex={itemIndex}
      />
    </Authority>
  );
};

Country.displayName = 'country';

export default Country;
