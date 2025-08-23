import React, { useEffect } from 'react';

import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { ConfigUnit } from '../_hooks';
import { localFieldConfig } from './Unit.config';

export { localFieldConfig } from './Unit.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  namespaceType,
  treatmentId,
  serviceItemId,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { Rules, extraConfig } = ConfigUnit({
    NAMESPACE,
    namespaceType,
    treatmentId,
    form,
    serviceItemId,
  });

  const treatmentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
  );

  const { dateOfAdmission, dateOfDischarge } = lodash.pick(treatmentItem, [
    'dateOfAdmission',
    'dateOfDischarge',
  ]);
  const dateOfAdmissionValue = formUtils.queryValue(dateOfAdmission);
  const dateOfDischargeValue = formUtils.queryValue(dateOfDischarge);

  useEffect(() => {
    form.validateFields([config.name || field], { force: true });
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
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          min={0}
          max={999}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          precision={0}
          labelType={config.label?.type || fieldProps.label.type}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const Unit = (props: any) => (
  <Authority>
    <FormItem {...props} />
  </Authority>
);

Unit.displayName = localFieldConfig.field;

export default Unit;
