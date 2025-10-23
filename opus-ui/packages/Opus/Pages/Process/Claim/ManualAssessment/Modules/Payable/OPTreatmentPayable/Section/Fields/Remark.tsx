import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required } from 'basic/components/Form';
import SwitchComponent from 'basic/components/SwitchComponent';
import { useSelector } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Payable.OPTreatmentPayable',
  field: 'remark',
  'field-props': {
    visible: 'Y',
    editable: 'C',
    expand: 'N',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.assessment-remark',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const visibleConditions = true;
  const editableConditions = !form.getFieldValue('isOrigin');
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

const Remark = ({ field, config, isShow, layout, form, editable }: any) => (
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

Remark.displayName = localFieldConfig.field;

export default Remark;
