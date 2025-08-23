import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';


import { fieldConfig } from './AreaCode.config';
export { fieldConfig } from './AreaCode.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  contactId,
  mandatoryOverride,
  isLast,
  readOnly,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  // const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const visibleConditions = !isLast || RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = true;
  const contactType = form.getFieldValue('contactType');
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {contactType !== 'MB' ? (
          <FormItemInput
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
            required={
              mandatoryOverride
                ? false
                : config?.required === Required.Conditions
                ? requiredConditions
                : (config?.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            placeholder=""
            precision={0}
            // onFocus={() => {
            //   const value = form.getFieldValue(field);
            //   handleFocus({ value, field });
            // }}
          />
        ) : (
          <></>
        )}
      </Col>
    )
  );
};

const AreaCode = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  contactSeqNum,
  mandatoryOverride,
  isLast,
  contactId,
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
        contactSeqNum={contactSeqNum}
        mandatoryOverride={mandatoryOverride}
        isLast={isLast}
        contactId={contactId}
        readOnly={readOnly}
      />
    </Authority>
  );
};

AreaCode.displayName = 'areaCode';

export default AreaCode;
