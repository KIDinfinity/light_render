import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, Required } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const localFieldConfig = {
  section: 'Payable.TreatmentPayable',
  field: 'hospitalizationFlg',
  'field-props': {
    visible: 'Y',
    required: 'Y',
    editable: 'Y',
    expand: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'HospitalizationFlag',
    },

    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_hospitalizationflg',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          dictTypeCode={
            config['x-dict']?.dictTypeCode ||
            localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
          }
          required={(config.required || fieldProps.required) === Required.Yes}
        />
      </Col>
    )
  );
};

const HospitalizationFlg = ({ field, config, form, editable, layout, isShow }: any) => (
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

HospitalizationFlg.displayName = 'hospitalizationFlg';

export default HospitalizationFlg;
