import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule
} from 'basic/components/Form';
import { localConfig as localSectionConfig } from '../index';

const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TherapeuticMonthList',
  field: 'drugNameDesc',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    visible: 'C',
    'visible-condition':{
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'therapeuticDrugs' }, operator: 'contains', right: '99999999' },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'drugNameDesc',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { fieldConfig };

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
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

const TherapeuticDrugNameDesc = ({
  form,
  editable,
  section,
  layout,
  isShow,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field="drugNameDesc">
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </ElementConfig.Field>
  </Authority>
);

TherapeuticDrugNameDesc.displayName = fieldConfig.field;

export default TherapeuticDrugNameDesc;
