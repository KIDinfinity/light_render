import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Basic',
  field: 'isDrinking',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'IsDrinking',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_Indicator',
    },
    required: 'N',
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 22,
      },
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 768px
      md: {
        span: 12,

        offset: 0,
        pull: 0,
        order: 22,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 22,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 22,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 22,
      },
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 768px
      md: {
        span: 8,

        offset: 0,
        pull: 0,
        order: 22,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 22,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 22,
      },
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
  const visibleConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
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
    )
  );
};

const IsDrinking = ({ field, config, form, editable, layout, isShow }: any) => (
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

IsDrinking.displayName = 'IsDrinking';

export default IsDrinking;
