import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';

import { useSelector } from 'dva';
import { NAMESPACE } from 'process/THCLM/ManualAssessment/activity.config';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';

import { localFieldConfig } from './DateOfConsultation.config';

export { localFieldConfig } from './DateOfConsultation.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const submissionDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.submissionDate
  );

  const Rules = {
    VLD_000274: Validator.VLD_000274(formUtils.queryValue(submissionDate)),
  };

  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !editableConditions
            : config?.editable === Editable.No)
        }
        required={
          config?.required === Required.Conditions
            ? requiredConditions
            : config?.required === Required.Yes
        }
        formName={field || localFieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
      />
    </Col>
  );
};

const DateOfConsultation = ({
  field,
  config,
  form,
  editable,
  incidentItem,
  insured,
  layout,
  isShow,
  isTreatmentTypeIP,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentItem={incidentItem}
      insured={insured}
      isTreatmentTypeIP={isTreatmentTypeIP}
    />
  </Authority>
);

DateOfConsultation.displayName = 'DateOfConsultation';

export default DateOfConsultation;
