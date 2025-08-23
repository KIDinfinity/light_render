import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemCheckbox, Rule } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'organization',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'payeeType',
          },
          operator: '===',
          right: 'S',
        },
        {
          left: {
            domain: 'field',
            field: 'payeeType',
          },
          operator: '===',
          right: 'O',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.is-corporation',
    },
    required: false,
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 1,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const disabled = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemCheckbox
        disabled={
          !editable ||
          (config.editable === Editable.Conditions ? disabled : config.editable === Editable.No)
        }
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

const Organization = ({ field, config, form, editable, layout, isShow }: any) => (
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

Organization.displayName = 'Organization';

export default Organization;
