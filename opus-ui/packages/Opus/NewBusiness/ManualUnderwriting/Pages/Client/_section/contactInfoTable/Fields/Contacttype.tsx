import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Contacttype.config';
import { useGetExistCodes } from '../../../_hooks/useContactType';
import useGetContacttypeDicts from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useGetContacttypeDicts';
import useJudgeContactTypeDisabled from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useJudgeContactTypeDisabled';

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
  handleChange,
  isLast,
  readOnly,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const contactSeqNum = form.getFieldValue('contactSeqNum');
  const value = form.getFieldValue(field);
  const dicts = useGetContacttypeDicts({ config, fieldConfig, contactSeqNum, id, readOnly });
  const disabled = useJudgeContactTypeDisabled({ id, contactId, readOnly });
  const visibleConditions = true;
  const existCodes = useGetExistCodes({ id, readOnly, field, value });
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions: false,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            disabled ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={!isLast && requiredByRole}
          hiddenPrefix
          // onFocus={() => {
          //   const value = form.getFieldValue(field);
          //   handleFocus({ value, field });
          // }}
          placeholder=""
          existCodes={existCodes}
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
  handleChange,
  isLast,
  readOnly,
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
        handleChange={handleChange}
        isLast={isLast}
        readOnly={readOnly}
      />
    </Authority>
  );
};

Contacttype.displayName = 'contactType';

export default Contacttype;
