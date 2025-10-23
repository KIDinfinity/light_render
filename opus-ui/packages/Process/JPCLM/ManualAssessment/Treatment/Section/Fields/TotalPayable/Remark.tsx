import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required } from 'basic/components/Form';
import SwitchComponent from 'basic/components/SwitchComponent';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.TotalPayable',
  field: 'remark',
  'field-props': {
    visible: 'Y',
    editable: 'N',
    expand: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.assessment-remark',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
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
        <SwitchComponent
          commonProps={{
            form,
            formName: config.name || field,
            labelId: config.label?.dictCode || fieldProps.label.dictCode,
            labelTypeCode: config.label?.dictTypeCode || fieldProps.label.dictTypeCode,
            required:
              (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes,
          }}
          unCheckedChildrenProps={{
            disabled: true,
            isEllipsis: true,
          }}
          checkedChildrenProps={{
            disabled:
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No),
            autoSize: true,
          }}
        />
      </Col>
    )
  );
};

const Remark = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

Remark.displayName = localFieldConfig.field;

export default Remark;
