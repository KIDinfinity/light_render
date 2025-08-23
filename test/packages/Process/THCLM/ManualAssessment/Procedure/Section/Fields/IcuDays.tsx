import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { TherapiesType } from 'claim/pages/Enum';

import { localFieldConfig } from './IcuDays.config';

export { localFieldConfig } from './IcuDays.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const TherapiesTypeValue = form.getFieldValue('therapiesType');
  const dateOfAdmission = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.dateOfAdmission
  );
  const dateOfDischarge = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.dateOfDischarge
  );
  const visibleConditions = TherapiesTypeValue === TherapiesType.ICU;
  const editableConditions = true;
  const requiredConditions = false;

  const icuFromDate = form.getFieldValue('icuFromDate');
  const icuToDate = form.getFieldValue('icuToDate');
  const Rules = {
    VLD_000020: Validator.VLD_000020(icuFromDate, icuToDate, dateOfAdmission, dateOfDischarge),
  };

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
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={config.label?.type || fieldProps.label.type}
          min={0}
          max={999}
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const IcuDays = ({ field, config, isShow, layout, form, editable, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
    />
  </Authority>
);

IcuDays.displayName = localFieldConfig.field;

export default IcuDays;
