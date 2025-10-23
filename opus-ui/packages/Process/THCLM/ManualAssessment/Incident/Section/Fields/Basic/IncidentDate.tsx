import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { ClaimType } from 'claim/enum';
import { IncidentCode } from 'claim/pages/Enum';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  formUtils,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './IncidentDate.config';

export { localFieldConfig } from './IncidentDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const claimTypeArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.claimTypeArray
  );

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const submissionDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.submissionDate
  );

  const visibleConditions = true;
  const editableConditions = !(
    (form.getFieldValue('causeOfIncident') === IncidentCode.Illness &&
      lodash.includes(formUtils.queryValue(claimTypeArray), ClaimType.IPD)) ||
    isRegisterMcs
  );
  const requiredConditions = form.getFieldValue('causeOfIncident') === IncidentCode.Accident;

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
