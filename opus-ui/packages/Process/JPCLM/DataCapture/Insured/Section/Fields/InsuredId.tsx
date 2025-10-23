import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput } from 'basic/components/Form';
import { useSelector } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'insured',
  field: 'insuredId',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ClientID',
    },
    required: true,
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const isRegisterMcs = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.isRegisterMcs
  );

  const editableConditions = true;

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !editableConditions
            : config?.editable === Editable.No)
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

const InsuredId = ({ field, config, form, editable, layout, isShow }: any) => (
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

InsuredId.displayName = 'InsuredId';

export default InsuredId;
