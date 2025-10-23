import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
} from 'basic/components/Form';


const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.OutPatientPayable',
  field: 'payableDays',
  'field-props': {
    visible: 'C',
    editable: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.payable-days',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  benefitCategoryIsCashBenefit,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = benefitCategoryIsCashBenefit;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          min={Number.MIN_SAFE_INTEGER}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const PayableDays = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  benefitCategoryIsCashBenefit,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      benefitCategoryIsCashBenefit={benefitCategoryIsCashBenefit}
    />
  </Authority>
);

PayableDays.displayName = 'PayableDays';

export default PayableDays;
