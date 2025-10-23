import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.short',
  field: 'dateOfConsultation',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
    },
    visible: 'Y',
    required: 'N',
    'x-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        disabled={!editable || config?.editable === Editable.No}
        required={config?.required === Required.Yes}
        name={config?.name}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      />
    </Col>
  );
};

const DateOfConsultation = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

DateOfConsultation.displayName = 'DateOfConsultation';

export default DateOfConsultation;
