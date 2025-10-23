import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  FormItemSelect,
} from 'basic/components/Form';
import { BenefitSubCategory } from 'claim/pages/utils/claim';
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.TotalPayable',
  field: 'systemCalculationDays',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    'editable-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    expand: 'Y',
    required: 'N',
    // TODO：需要国际化
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: '変更前日数',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 1,
        pull: 0,
        order: 2,
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
  opTreatmentPayableItem,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {opTreatmentPayableItem?.benefitSubCategory === BenefitSubCategory.OP ? (
          <FormItemSelect
            dicts={[
              {
                dictCode: '-1',
                dictName: '-1',
              },
              {
                dictCode: '0',
                dictName: '0',
              },
              {
                dictCode: '1',
                dictName: '1',
              },
            ]} // TODO: 动态下拉
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
          />
        ) : (
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
            hiddenPrefix
            min={Number.MIN_SAFE_INTEGER}
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const SystemCalculationDays = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  opTreatmentPayableItem,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      opTreatmentPayableItem={opTreatmentPayableItem}
    />
  </Authority>
);

SystemCalculationDays.displayName = localFieldConfig.field;

export default SystemCalculationDays;
