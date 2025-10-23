import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  formUtils,
  Validator,
  Required,
} from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUp.Procedure',
  field: 'procedureDateEntry',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'EntryProcedureDate',
    },
    maxLength: 240,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': ['operationDateLaterIncidentDate', 'operationDateEarlierDeathDate'],
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const getIncidentDate = (state: any) =>
    state.JPCLMOfDataCapture.claimEntities.incidentListMap[incidentId]?.incidentDate;
  const getDateTimeOfDeath = (state: any) =>
    state.JPCLMOfDataCapture.claimProcessData.insured.dateTimeOfDeath;

  const incidentDate = formUtils.queryValue(useSelector(getIncidentDate));
  const dateTimeOfDeath = formUtils.queryValue(useSelector(getDateTimeOfDeath));

  const Rules = {
    operationDateLaterIncidentDate: {
      validator: Validator.operationDateLaterIncidentDate(incidentDate),
    },
    operationDateEarlierDeathDate: {
      validator: Validator.operationDateEarlierDeathDate(dateTimeOfDeath),
    },
  };

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
        rules={lodash.compact(
          (config?.rules || fieldProps['x-rules']).map((rule: any) => Rules[rule])
        )}
      />
    </Col>
  );
};

const ProcedureDateEntry = ({ field, config, form, editable, incidentId, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
    />
  </Authority>
);

ProcedureDateEntry.displayName = 'ProcedureDateEntry';

export default ProcedureDateEntry;
