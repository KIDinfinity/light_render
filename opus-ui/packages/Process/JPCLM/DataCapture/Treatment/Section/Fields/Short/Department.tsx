import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelectPlus, Required } from 'basic/components/Form';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment.short',
  field: 'department',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.department-of-treatment',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        form={form}
        disabled={!editable || config?.editable === Editable.No}
        dropdownCode="misc_dict006"
        optionShowType="both"
        searchName="dictionary"
        formName={field || fieldConfig.field}
        required={config?.required === Required.Yes}
        name={config?.name}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
      />
    </Col>
  );
};

const Department = ({ field, config, form, editable, layout, isShow }: any) => (
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

Department.displayName = 'Department';

export default Department;
