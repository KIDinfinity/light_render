import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelectPlus, Required, Rule } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident.basic',
  field: 'partOfBodyInjuredArray',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.post-of-body-injured',
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'claimTypeArray',
          },
          operator: 'in',
          right: ['DIS', 'TPD'],
        },
      ],
    },
    expand: 'N',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        order: 23,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 23,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const partOfBodyInjuredRequire = Rule(
    fieldProps['required-condition'],
    form,
    'JPCLMOfDataCapture'
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        form={form}
        mode="multiple"
        disabled={!editable || config?.editable === Editable.No}
        required={
          config?.required === Required.Conditions
            ? partOfBodyInjuredRequire
            : config?.required === Required.Yes
        }
        dropdownCode="claim_dict006"
        optionShowType="both"
        formName={field || fieldConfig.field}
        searchName="partOfBodyInjured"
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      />
    </Col>
  );
};

const PartOfBodyInjuredArray = ({ field, config, form, editable, layout, isShow }: any) => (
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

PartOfBodyInjuredArray.displayName = 'PartOfBodyInjuredArray';

export default PartOfBodyInjuredArray;
