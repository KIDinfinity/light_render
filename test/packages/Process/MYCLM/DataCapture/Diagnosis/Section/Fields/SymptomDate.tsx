import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';

import { ClaimTypeArray } from 'claim/enum/claimTypeArray';
import lodash from 'lodash';
import { useGetInputLimitDate } from 'process/MYCLM/_hooks';
import { localFieldConfig } from './SymptomDate.config';

export { localFieldConfig } from './SymptomDate.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  claimEntities,
}: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];
  const claimTypeArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.claimTypeArray
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = lodash.includes(
    formUtils.queryValue(claimTypeArray),
    ClaimTypeArray.inPatient
  );

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
          labelType="inline"
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const SymptomDate = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  claimEntities,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      claimEntities={claimEntities}
    />
  </Authority>
);

SymptomDate.displayName = localFieldConfig.field;

export default SymptomDate;
