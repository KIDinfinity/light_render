import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './AssessorOverrideTimes.config';

export { localFieldConfig } from './AssessorOverrideTimes.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  otherProcedureId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = true;

  const therapeuticMonthList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.otherProcedureListMap?.[otherProcedureId]
        ?.therapeuticMonthList
  );

  const duplicateMonthList = form.getFieldValue('duplicateMonthList')

  const Rules = {
    VLD_000755: Validator.VLD_000755({ therapeuticMonthList, duplicateMonthList }),
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
          // onChange={(value: number) => {
          //   form.setFieldsValue({ treatmentTimes: value });
          // }}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          pattern={/^\d{1,3}$/g}
          hiddenPrefix
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const AssessorOverrideTimes = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  otherProcedureId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      otherProcedureId={otherProcedureId}
    />
  </Authority>
);

AssessorOverrideTimes.displayName = localFieldConfig.field;

export default AssessorOverrideTimes;
