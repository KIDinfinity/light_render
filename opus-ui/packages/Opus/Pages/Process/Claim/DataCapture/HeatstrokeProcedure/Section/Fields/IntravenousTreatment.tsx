import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'HeatstrokeTherapy',
  field: 'intravenousTreatment',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'intravenousTreatment',
    },
    required: 'Y',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'HS',
        },
      ],
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_COM_YN',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 1,
      },
      // 576px
      sm: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 1,
      },
      // 768px
      md: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 1,
      },
      // 992px
      lg: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 1,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 15,
        pull: 15,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemSelect
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
        />
      </Col>
    )
  );
};

const IntravenousTreatment = ({ field, config, form, editable, layout, isShow }: any) => (
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

IntravenousTreatment.displayName = localFieldConfig.field;

export default IntravenousTreatment;
