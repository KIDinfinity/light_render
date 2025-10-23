import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'selfJudgmentAbility',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'JudgmentAbility',
    },
    expand: 'N',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 17,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_Indicator',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dictsOfCauseOfIncident = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode ||
          fieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

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
      />
    </Col>
  );
};

const JudgmentAbility = ({ field, config, form, editable, layout, isShow }: any) => (
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

JudgmentAbility.displayName = 'JudgmentAbility';

export default JudgmentAbility;
