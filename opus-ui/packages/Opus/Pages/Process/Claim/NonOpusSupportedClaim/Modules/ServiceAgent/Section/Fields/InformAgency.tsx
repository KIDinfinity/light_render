import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export const fieldConfig = {
  caseCategory: 'JP_CLM_CTG006',
  activityCode: 'JP_CLM_003',
  section: 'ServiceAgent',
  field: 'informTheAgency',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'InformAgency',
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_InformAgency',
    },
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || fieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? true
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          form={form}
          disabled={!editable || config?.editable === Editable.No}
          required={config?.required === Required.Yes}
          dicts={dicts}
          formName={field || fieldConfig.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          name={config?.name}
        />
      </Col>
    )
  );
};

const InformAgency = ({ field, config, form, editable, layout, isShow }: any) => (
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

InformAgency.displayName = 'InformTheAgency';

export default InformAgency;
