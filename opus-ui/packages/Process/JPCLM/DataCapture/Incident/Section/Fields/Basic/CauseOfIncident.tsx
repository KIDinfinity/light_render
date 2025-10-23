import React, { useEffect } from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Validator } from 'basic/components/Form';
import lodash from 'lodash';
export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'causeOfIncident',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.case-of-incident',
    },
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'x-dict': {
      dictTypeCode: 'CauseOfIncident',
    },
    'x-rules': ['VLD_000765'],
  },
};
const FormItem = ({ isShow, layout, form, editable, field, config, diagnosisListId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dictsOfCauseOfIncident = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode ||
          fieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const diagnosis = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture?.claimEntities.diagnosisListMap
  );
  const temp = lodash
    .chain(diagnosisListId)
    .map((id) => diagnosis[id]?.diagnosisCode)
    .join('-')
    .value();
  const Rules = {
    VLD_000765: Validator.VLD_000765({ diagnosis, diagnosisListId }),
  };
  const causeOfIncident = form.getFieldValue('causeOfIncident');
  useEffect(() => {
    !!causeOfIncident && form.validateFields([fieldConfig.field], { force: true });
  }, [temp]);

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        form={form}
        disabled={!editable || config?.editable === Editable.No}
        required={config?.required === Required.Yes}
        dicts={dictsOfCauseOfIncident}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        name={config?.name}
        rules={fieldProps['x-rules']?.map((rule: string) => Rules[rule])}
      />
    </Col>
  );
};

const CauseOfIncident = ({ field, config, form, editable, layout, isShow, diagnosisList }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      diagnosisListId={diagnosisList}
    />
  </Authority>
);

CauseOfIncident.displayName = 'CauseOfIncident';

export default CauseOfIncident;
