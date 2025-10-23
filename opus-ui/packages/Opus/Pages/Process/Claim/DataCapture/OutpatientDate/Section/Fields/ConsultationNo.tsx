import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Visible, Required } from 'basic/components/Form';

const localFieldConfig = {
  section: 'OutpatientDateGroup',
  field: 'consulationNo',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'numberOfConsultation',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 5,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{}}>
        <FormItemInput
          disabled={config.editable === Editable.No || !editable}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
        />
      </Col>
    )
  );
};

const ConsulationNo = ({ field, config, form, editable, layout, isShow }: any) => (
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

ConsulationNo.displayName = localFieldConfig.field;

export default ConsulationNo;
