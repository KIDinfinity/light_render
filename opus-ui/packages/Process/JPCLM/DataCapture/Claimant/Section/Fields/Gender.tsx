import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, Required, FormItemSelect, Rule } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'claimant',
  field: 'gender',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'relationshipWithInsured',
          },
          operator: '===',
          right: 'S',
        },
        {
          left: {
            domain: 'field',
            field: 'relationshipWithInsured',
          },
          operator: '===',
          right: 'O',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.usermanagement.basicInfo.label.gender',
    },
    visible: 'Y',
    required: 'C',
    // 'required-condition': {
    //   combine: '||',
    //   conditions: [
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'B',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'T',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'A',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'AE',
    //     },
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'relationshipWithInsured',
    //       },
    //       operator: '===',
    //       right: 'BA',
    //     },
    //   ],
    // },
    'x-dict': {
      dictTypeCode: 'Gender',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
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
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config = {} }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const isSelfOrPolicyOwner = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');
  const isRequired = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        dicts={dicts}
        disabled={
          !editable ||
          (config.editable === Editable.Conditions
            ? isSelfOrPolicyOwner
            : config?.editable === Editable.No)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
        required={
          config?.required === Required.Conditions ? isRequired : config?.required === Required.Yes
        }
      />
    </Col>
  );
};

const Gender = ({ field, config, form, editable, layout, isShow }: any) => (
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

Gender.displayName = 'Gender';

export default Gender;
