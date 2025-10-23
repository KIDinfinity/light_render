import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation.bankAccount',
  field: 'bankType',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'BankType',
    },
    required: 'Y',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_BankType',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 18,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });

  return (
    isShow && (
      <Col {...layout}>
        <FormItemSelect
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          dicts={dicts}
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

const BankType = ({ field, config, form, editable, layout, isShow }: any) => (
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

BankType.displayName = 'bankType';

export default BankType;
