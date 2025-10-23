import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, Rule, Required, FormItemSelect } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'transferAccount',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: 'PREM',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'TransferAccount',
    },
    required: 'Y',
    // 'required-condition': {
    //   combine: '||',
    //   conditions: [
    //     {
    //       left: {
    //         domain: 'field',
    //         field: 'paymentMethod',
    //       },
    //       operator: '!===',
    //       right: 'PREM',
    //     },
    //   ],
    // },
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_TransferAccount',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config = {} }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );

  const isEditable = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');
  const isRequired = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        dicts={dicts}
        disabled={
          !editable ||
          (config.editable === Editable.Conditions ? isEditable : config?.editable === Editable.No)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
        required={
          config.required === Required.Conditions ||
          localFieldConfig['field-props'].required === Required.Conditions
            ? isRequired
            : (config.required || fieldProps.required) === Required.Yes
        }
      />
    </Col>
  );
};

const TransferAccount = ({ field, config, form, editable, layout, isShow }: any) => (
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

TransferAccount.displayName = 'TransferAccount';

export default TransferAccount;
