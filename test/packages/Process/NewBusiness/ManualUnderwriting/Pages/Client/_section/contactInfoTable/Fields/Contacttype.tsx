import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import useJudgeContactTypeDisabled from '../_hooks/useJudgeContactTypeDisabled';
import useGetContacttypeDicts from '../_hooks/useGetContacttypeDicts';
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
  handleChange,
  isLast,
  readOnly
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const contactSeqNum  = form.getFieldValue('contactSeqNum');
  const dicts = useGetContacttypeDicts({ config, fieldConfig, contactSeqNum, id, readOnly });
  const disabled = useJudgeContactTypeDisabled({ id, contactId, readOnly });
  const visibleConditions = true;

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
