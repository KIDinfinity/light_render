import React from 'react';
import { NAMESPACE } from 'process/THCLM/DataCapture/activity.config';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
  formUtils,
  Validator,
} from 'basic/components/Form';

import { useSelector } from 'dva';
import { localFieldConfig } from './IncidentDate.config';

export { localFieldConfig } from './IncidentDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const isManualAdd = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.isManualAdd
  );

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const submissionDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.submissionDate
  );

  const visibleConditions = true;
  const editableConditions = !(
    Rule(
      fieldProps['required-condition'],
      form,
      `${NAMESPACE}.claimEntities.incidentListMap[${incidentId}]`
    ) ||
    (isRegisterMcs && !isManualAdd)
  );
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_000274: Validator.VLD_000274(formUtils.queryValue(submissionDate)),
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

const IncidentDate = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
    />
  </Authority>
);

IncidentDate.displayName = localFieldConfig.field;

export default IncidentDate;
