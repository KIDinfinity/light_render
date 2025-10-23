import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
} from 'basic/components/Form';

const localFieldConfig = {
  section: 'Treatment.Basic',
  field: 'department',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.department-of-treatment',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
    }
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
        <FormItemSelectPlus
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
          dropdownCode="misc_dict006"
          optionShowType="both"
          searchName="dictionary"
        />
      </Col>
    )
  );
};

const Department = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

Department.displayName = 'Department';

export default Department;
