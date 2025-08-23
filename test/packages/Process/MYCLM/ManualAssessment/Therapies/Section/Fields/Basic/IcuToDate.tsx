import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Validator,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { TherapiesType } from 'claim/pages/Enum';

import { useSelector } from 'dva';
import lodash from 'lodash';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { localFieldConfig } from './IcuToDate.config';

export { localFieldConfig } from './IcuToDate.config';
import { useGetInputLimitDate } from 'process/MYCLM/_hooks';

export const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];
  const TherapiesTypeValue = form.getFieldValue('therapiesType');
  const icuFromDateValue = form.getFieldValue('icuFromDate');
  const dateOfDischarge = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.treatmentListMap[treatmentId]?.dateOfDischarge
  );
  const visibleConditions = TherapiesTypeValue === TherapiesType.ICU;
  const editableConditions = true;
  const requiredConditions = false;

  const Rules = {
    VLD_000057: Validator.VLD_000057HK(formUtils.queryValue(icuFromDateValue)),
    VLD_000601: Validator.VLD_000601(formUtils.queryValue(dateOfDischarge)),
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
          labelType={config.label?.type || fieldProps.label.type}
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const IcuToDate = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  isTreatmentTypeIP,
  treatmentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isTreatmentTypeIP={isTreatmentTypeIP}
      treatmentId={treatmentId}
    />
  </Authority>
);

IcuToDate.displayName = localFieldConfig.field;

export default IcuToDate;
