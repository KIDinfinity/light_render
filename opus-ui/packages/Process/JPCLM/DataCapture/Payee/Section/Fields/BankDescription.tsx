import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'bankDesc',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'bankDesc',
    },
    required: 'N',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_POL_BankDesc',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 19,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config = {}, payeeId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );
  const visibleConditions = true;
  const requiredConditions = false;
  const editableConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          form={form}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          formName={config.name || field}
          labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
          labelTypeCode={
            config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const BankDescription = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  payeeId,
  insured,
  premiumPaymentMethod,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      insured={insured}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      payeeId={payeeId}
      premiumPaymentMethod={premiumPaymentMethod}
    />
  </Authority>
);

BankDescription.displayName = 'bankDesc';

export default BankDescription;
