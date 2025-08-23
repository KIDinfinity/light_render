import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Rule } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'diagnosis',
  field: 'criticalIllnessName',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'criticalIllness',
          },
          operator: '!==',
          right: 1,
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.critical-illness-name',
    },
    maxLength: 100,
    required: 'N',
    // 'required-condition': {
    //   combine: '&&',
    //   conditions: [
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'criticalIllness',
    //       },
    //       operator: '===',
    //       right: 1,
    //     },
    //   ],
    // },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'treatment-no-invoice-layout': {
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const isCINameEditable = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');
  const isCINameRequired = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? isCINameEditable
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        maxLength={config?.maxLength || fieldProps.maxLength}
        required={
          config.required === Required.Conditions ||
          localFieldConfig['field-props'].required === Required.Conditions
            ? isCINameRequired
            : (config.required || fieldProps.required) === Required.Yes
        }
      />
    </Col>
  );
};

const CriticalIllnessName = ({ field, config, form, editable, layout, isShow }: any) => (
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

CriticalIllnessName.displayName = 'CriticalIllnessName';

export default CriticalIllnessName;
