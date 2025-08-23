import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localConfig as localSectionConfig } from '../index';

const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'JPAC',
  field: 'serviceItemDescription',
  'field-props': {
    editable: 'Y',
    required: 'N',
    visible: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'unAppDrugName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { fieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
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

const ServiceItemDescription = ({ form, editable, section, layout, isShow, field }: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} field={field} />
    </ElementConfig.Field>
  </Authority>
);

ServiceItemDescription.displayName = fieldConfig.field;

export default ServiceItemDescription;
