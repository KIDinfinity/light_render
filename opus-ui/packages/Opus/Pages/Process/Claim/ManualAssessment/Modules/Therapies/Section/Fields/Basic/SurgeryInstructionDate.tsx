import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Procedure',
  field: 'surgeryInstructionDate',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'SurgeryInstructionDate',
    },
    maxLength: 240,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-rules': ['operationDateLaterIncidentDate', 'operationDateEarlierDeathDate'],
  },
};

export { localFieldConfig };

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  config,
  field,
  getIncidentDate,
  getDateTimeOfDeath,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  return (
    isShow &&
      ((config?.visible || fieldProps.visible) === Visible.Conditions
        ? true
        : (config?.visible || fieldProps.visible) === Visible.Yes) && (
        <Col {...layout}>
          <FormItemDatePicker
            disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={(config.required || fieldProps.required) === Required.Yes}
          />
        </Col>
      )
  );
};

const SurgeryInstructionDate = ({ field, config,
  form,
  editable,
  getIncidentDate,
  getDateTimeOfDeath,
  layout,
  isShow,
}: any) => (
  <Authority>

    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      getIncidentDate={getIncidentDate}
      getDateTimeOfDeath={getDateTimeOfDeath}
    />
  </Authority>
);

SurgeryInstructionDate.displayName = 'SurgeryInstructionDate';

export default SurgeryInstructionDate;
