import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import { Authority, Editable, FormItemNumber, Required, Visible } from 'basic/components/Form';
import { TherapiesType } from 'claim/pages/Enum';

import { localFieldConfig } from './ReimbursementPercentage.config';

export { localFieldConfig } from './ReimbursementPercentage.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  treatmentId,
  procedureId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const firstProcedureId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.procedureList?.[0]
  );

  const TherapiesTypeValue = form.getFieldValue('therapiesType');

  const visibleConditions = TherapiesTypeValue === TherapiesType.Surgery;
  const editableConditions = procedureId === firstProcedureId;
  const requiredConditions = procedureId === firstProcedureId;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          labelType={config.label?.type || fieldProps.label.type}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          min={0}
          max={100}
        />
      </Col>
    )
  );
};

const ReimbursementPercentage = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  procedureId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      procedureId={procedureId}
      treatmentId={treatmentId}
      procedureId={procedureId}
    />
  </Authority>
);

ReimbursementPercentage.displayName = localFieldConfig.field;

export default ReimbursementPercentage;
