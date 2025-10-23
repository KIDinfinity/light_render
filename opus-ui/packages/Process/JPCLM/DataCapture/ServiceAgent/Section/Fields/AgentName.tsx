import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'agent',
  field: 'agentName',
  'field-props': {
    editable: 'Y',
    label: {
      dictCode: 'AgentName',
    },
    required: false,
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={config.editable === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
        required={config.required || localFieldConfig['field-props'].required}
      />
    </Col>
  );
};

const AgentName = ({ field, config, form, editable, layout, isShow }: any) => (
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

AgentName.displayName = 'AgentName';

export default AgentName;
