import React from 'react';
import { Authority, ElementConfig, Editable, FormItemInput } from 'basic/components/Form';
import localSectionConfig from '../Section.config';

const localFieldConfig = {
  atomGroupCode: '',
  caseCategory: '',
  activityCode: '',
  section: '',
  field: '',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: '',
    },
    maxLength: 0,
    required: false,
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 0,
      },
    },
    'x-rules': [''],
  },
};

export const FormItem = ({ form, editable, field, config }: any) => {
  // const xxx = useSelector(XXXSelector);
  // const xxx = formUtil.queryValue(xxx) === 'xxx';

  return (
    <FormItemInput
      disabled={config.editable === Editable.No || !editable}
      form={form}
      formName={config.name || field}
      labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
      labelTypeCode={
        config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
      }
      maxLength={config.maxLength || localFieldConfig['field-props'].maxLength}
      required={config.required || localFieldConfig['field-props'].required}
    />
  );
};

const X = ({ form, editable, section }: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field="">
      <FormItem form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

export default X;
