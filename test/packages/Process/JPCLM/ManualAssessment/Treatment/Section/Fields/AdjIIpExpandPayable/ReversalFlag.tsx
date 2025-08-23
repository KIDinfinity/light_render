import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.AdjIIpExpandPayable',
  field: 'reversalFlag',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    required: 'N',
    label: {
      // TODO：需要国际化
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ﾘﾊﾞｰｽ対象',
    },
    'x-dict': { dictCode: 'dictCode', dictName: 'dictName' },
    'x-layout': {
      // 480px
      xs: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 7,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
    'x-rules': ['checkPayableList'],
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = form.getFieldValue('payableAmount') < 0;
  const requiredConditions = true;

  const dicts = [
    {
      dictCode: 'Y',
      dictName: 'Y',
    },
    {
      dictCode: 'N',
      dictName: 'N',
    },
  ];

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
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
        />
      </Col>
    )
  );
};

const ReversalFlag = ({ field, config, isShow, layout, form, editable }: any) => (
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

ReversalFlag.displayName = 'ReversalFlag';

export default ReversalFlag;
