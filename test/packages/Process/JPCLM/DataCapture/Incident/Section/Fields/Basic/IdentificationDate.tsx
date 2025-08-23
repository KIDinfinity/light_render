import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Validator,
  Rule,
} from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'identificationDate',
  'field-props': {
    editable: 'C',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'partOfBodyInjuredArray',
          },
          operator: 'not empty',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'identificationDate',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-rules': ['IdentificationDateLaterIncidentDate'],
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const identificationDateRequire = Rule(
    fieldProps['required-condition'],
    form,
    'JPCLMOfDataCapture'
  );
  const incidentDateValue = form.getFieldValue('incidentDate');
  const Rules = {
    IdentificationDateLaterIncidentDate: Validator.IdentificationDateLaterIncidentDate(
      incidentDateValue
    ),
  };
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        disabled={!editable || config?.editable === Editable.No}
        required={
          config?.required === Required.Conditions
            ? identificationDateRequire
            : config?.required === Required.Yes
        }
        formName={field || fieldConfig.field}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
      />
    </Col>
  );
};

const IdentificationDate = ({ field, config, form, editable, layout, isShow }: any) => (
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

IdentificationDate.displayName = 'IdentificationDate';

export default IdentificationDate;
