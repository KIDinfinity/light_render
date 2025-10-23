import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Required } from 'basic/components/Form';

export const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'PopUp.klip7616',
  field: 'daysToDeductInterestForArrears',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'InterestDeductionDays',
    },
    maxLength: 3,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
    'x-rules': [''],
  },
};

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemNumber
        form={form}
        required={
          config?.required === Required.Conditions ? false : config?.required === Required.Yes
        }
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions ? true : config?.editable === Editable.No)
        }
        formName={field || localFieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        precision={0}
      />
    </Col>
  );
};

const DaysToDeductInterestForArrears = ({ field, config, form, editable, layout, isShow }: any) => (
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

DaysToDeductInterestForArrears.displayName = 'daysToDeductInterestForArrears';

export default DaysToDeductInterestForArrears;
