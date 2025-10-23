import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import { getRadioDateListDicts } from 'process/JPCLM/ManualAssessment/_models/functions'
import { localFieldConfig } from './RadioDateList.config';

export { localFieldConfig } from './RadioDateList.config';

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

  const dicts = getRadioDateListDicts({ therapeuticMonthList, duplicateMonthList })
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          mode="multiple"
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
        />
      </Col>
    )
  );
};

const RadioDateList = ({
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

RadioDateList.displayName = localFieldConfig.field;

export default RadioDateList;
