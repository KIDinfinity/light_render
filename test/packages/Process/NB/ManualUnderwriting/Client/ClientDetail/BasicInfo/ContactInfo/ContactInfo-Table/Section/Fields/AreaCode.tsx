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
import useCheckAreaCodeRequired from 'process/NB/ManualUnderwriting/_hooks/useCheckAreaCodeRequired';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  contactSeqNum,
  contactType,
  mandatoryOverride,
  isLast,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  // const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const visibleConditions = !isLast || RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useCheckAreaCodeRequired({ contactSeqNum });

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {contactType !== 'MB' ? (
          <FormItemInput
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
            required={
              mandatoryOverride
                ? false
                : config?.['field-props']?.required === Required.Conditions
                ? requiredConditions
                : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
            }
            labelType="inline"
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
  contactType,
  mandatoryOverride,
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
        contactSeqNum={contactSeqNum}
        contactType={contactType}
        mandatoryOverride={mandatoryOverride}
        isLast={isLast}
      />
    </Authority>
  );
};

AreaCode.displayName = 'areaCode';

export default AreaCode;
