import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './Email.config';

export { localFieldConfig } from './Email.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isrelationshipWithInsuredSelf,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  const Rules = {
    /**
       {[
                  {
                    type: 'email',
                    message: 'The email address you supplied is invalid.',
                  },
                ]}
       */
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            isrelationshipWithInsuredSelf ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Email = ({ field, config, isShow, layout, form, editable, isrelationshipWithInsuredSelf }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isrelationshipWithInsuredSelf={isrelationshipWithInsuredSelf}
    />
  </Authority>
);

Email.displayName = localFieldConfig.field;

export default Email;
