import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  RuleByForm,
  Visible,
} from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import moment from 'moment';

const FormItem = ({ isShow, layout, form, editable, incidentItem, field, config }: any) => {
  const fieldProps = config;
  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const editableConditions = !RuleByForm(
    config['editable-condition'] || fieldProps['editable-condition'],
    form
  );
  const requiredConditions = RuleByForm(
    config['required-condition'] || fieldProps['required-condition'],
    form
  );

  const Rules = {};
  const defaultPickerValue = moment().add('year', 543);
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
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
          formName={field || fieldProps.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          labelType={config.label?.type || fieldProps.label.type}
          name={config?.name}
          isBuddistDate={true}
          disabledDate={(date: any) => {
            return date > defaultPickerValue;
          }}
          defaultPickerValue={defaultPickerValue}
          showToday={false}
        />
      </Col>
    )
  );
};

const field = 'taxConsentDate';

const TaxConsentDate = ({
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

TaxConsentDate.displayName = field;

export default TaxConsentDate;
