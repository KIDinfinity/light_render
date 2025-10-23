import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'trafficAccidentFlag',
  'field-props': {
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'TrafficAccidentFlag',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_Indicator',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useSelector(
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
        mode={fieldProps?.mode}
        disabled={!editable || config?.editable === Editable.No}
        dicts={dicts}
        required={config?.required === Required.Yes}
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      />
    </Col>
  );
};

const TrafficAccidentFlag = ({ field, config, form, editable, layout, isShow }: any) => (
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

TrafficAccidentFlag.displayName = fieldConfig.field;

export default TrafficAccidentFlag;
