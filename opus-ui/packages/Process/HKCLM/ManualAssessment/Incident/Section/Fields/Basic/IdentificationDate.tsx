import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Rule,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './IdentificationDate.config';

export { localFieldConfig } from './IdentificationDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const incidentDateValue = form.getFieldValue('incidentDate');

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, NAMESPACE);
  const requiredConditions = true;

  const Rules = {
    IdentificationDateLaterIncidentDate: Validator.IdentificationDateLaterIncidentDate(
      incidentDateValue
    ),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
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

const IdentificationDate = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

IdentificationDate.displayName = localFieldConfig.field;

export default IdentificationDate;
