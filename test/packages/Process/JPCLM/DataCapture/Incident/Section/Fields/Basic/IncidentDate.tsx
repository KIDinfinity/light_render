import React from 'react';
import { useSelector, useDispatch } from 'dva';
import moment from 'moment';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  formUtils,
  Required,
  Validator,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'incidentDate',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
    },
    dateFormat: 'L LTS',
    required: 'C',
    'required-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'causeOfIncident',
          },
          operator: '===',
          right: 'A',
        },
      ],
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': ['incidentDateEarlierDeathDate'],
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dateTimeOfDeath = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.insured?.dateTimeOfDeath
  );
  const isRegisterMcs = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.isRegisterMcs
  );
  const dateTimeOfDeathValue = formUtils.queryValue(dateTimeOfDeath);
  const isAccident = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');
  const Rules = {
    incidentDateEarlierDeathDate: Validator.incidentDateEarlierDeathDate(dateTimeOfDeathValue),
  };
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        form={form}
        required={
          config?.required === Required.Conditions ? isAccident : config?.required === Required.Yes
        }
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? isRegisterMcs
            : config?.editable === Editable.No)
        }
        format={config.dateFormat || fieldProps.dateFormat}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        name={config?.name}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
        )}
        showTime
        onBlur={(e: any) => {
          const incidentDate = moment(e.target.value);
          if (!!incidentDate.isValid()) {
            dispatch({
              type: 'JPCLMOfDataCapture/incidentUpdate',
              payload: {
                incidentId: form.getFieldValue('id'),
                changedFields: {
                  incidentDate: incidentDate.format('YYYY-MM-DDTHH:mm:ssZ'),
                },
              },
            });
          }
        }}
      />
    </Col>
  );
};

const IncidentDate = ({ field, config, form, editable, layout, isShow }: any) => (
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

IncidentDate.displayName = 'IncidentDate';

export default IncidentDate;
