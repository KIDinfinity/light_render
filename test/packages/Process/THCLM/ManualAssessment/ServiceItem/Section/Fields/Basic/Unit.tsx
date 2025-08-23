import React, { useEffect } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';

import { localFieldConfig } from './Unit.config';

export { localFieldConfig } from './Unit.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const treatmentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
  );

  const { dateOfAdmission, dateOfDischarge } = lodash.pick(treatmentItem, [
    'dateOfAdmission',
    'dateOfDischarge',
    'icuFromDate',
    'icuToDate',
  ]);
  const dateOfAdmissionValue = formUtils.queryValue(dateOfAdmission);
  const dateOfDischargeValue = formUtils.queryValue(dateOfDischarge);

  const Rules = {
    VLD_000272: Validator.VLD_000272(dateOfAdmissionValue, dateOfDischargeValue),
  };

  const formName = config.name || field;
  useEffect(() => {
    form.validateFields([formName], { force: true });
  }, [dateOfAdmissionValue, dateOfDischargeValue]);

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
          formName={formName}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          precision={0}
        />
      </Col>
    )
  );
};

const Unit = ({ field, config, isShow, layout, form, editable, treatmentId }: any) => (
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

Unit.displayName = 'Unit';

export default Unit;
