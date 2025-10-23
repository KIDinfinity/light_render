import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemSelect, Visible } from 'basic/components/Form';
import useJudgeContactTypeDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeContactTypeDisabled';
import useGetContacttypeDicts from 'process/NB/ManualUnderwriting/_hooks/useGetContacttypeDicts';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';
import { fieldConfig } from './Contacttype.config';

export { fieldConfig } from './Contacttype.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  contactId,
  id,
  contactSeqNum,
  handleChange,
  isLast,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetContacttypeDicts({ config, fieldConfig, contactSeqNum, id });
  const disabled = useJudgeContactTypeDisabled({ id, contactId });
  const visibleConditions = true;
  const editableConditions = true;
  const editableByRole = useGetEditableByRole({
    editableConditions,
    config,
    localConfig: fieldConfig,
  });
  const requiredByRole = useGetRequiredByRole({
    requiredConditions: false,
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
          disabled={!editable || disabled || !editableByRole}
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={!isLast && requiredByRole}
          hiddenPrefix
          labelType="inline"
          // onFocus={() => {
          //   const value = form.getFieldValue(field);
          //   handleFocus({ value, field });
          // }}
          placeholder=""
          precision={0}
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Contacttype = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  contactItemId,
  contactSeqNum,
  handleChange,
  isLast,
}: any) => {
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
        contactId={contactItemId}
        contactSeqNum={contactSeqNum}
        handleChange={handleChange}
        isLast={isLast}
      />
    </Authority>
  );
};

Contacttype.displayName = 'contactType';

export default Contacttype;
