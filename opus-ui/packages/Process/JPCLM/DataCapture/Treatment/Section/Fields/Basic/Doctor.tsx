import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Validator } from 'basic/components/Form';
import lodash from 'lodash';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.basic',
  field: 'doctor',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.name-of-doctor',
    },
    maxLength: 60,
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-rules': ['doctorLength'],
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const Rules = {
    doctorLength: Validator.doctorLength,
  };
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        form={form}
        required={config?.required === Required.Yes}
        disabled={!editable || config?.editable === Editable.No}
        formName={field || fieldConfig.field}
        maxLength={config?.maxLength || fieldProps.maxLength}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
        name={config?.name}
      />
    </Col>
  );
};

const Doctor = ({ field, config, form, editable, layout, isShow }: any) => (
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

Doctor.displayName = 'Doctor';

export default Doctor;
