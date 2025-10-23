import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { useSelector } from 'umi';
import { tenant } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemNumber,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

const fieldConfig = {
  section: 'insuredOccupation',
  field: 'classes',
  'field-props': {
    editable: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.email',
    },
    maxLength: 60,
    required: 'N',
    visible: 'Y',
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
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { fieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const productDetailList = useSelector(({ dataEntry }: any) => dataEntry.productDetailList) || [];
  const productConfig = productDetailList.find((product:any) => product.planCode === form.getFieldValue('riderProductCode')) || {};
  const matchedConfig = productConfig?.attributes?.find(item => item.name === 'classes');


  const fieldProps: any = fieldConfig['field-props'];

  const Component = matchedConfig?.dataType === 'list'? FormItemSelect : FormItemNumber;
  const language = tenant.getLocaleLang();
  const dicts = matchedConfig?.options?.map((item: any) => ({ dictCode: item.value, dictName: language === "en-US" || !item.label.th  ? item.label.en : item.label.th })) || [];


  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const editableConditions = !matchedConfig || matchedConfig.disabled;
  const requiredConditions = matchedConfig?.mandatory;


  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <Component
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
          hiddenPrefix
          precision={2}
        />
      </Col>
    )
  );
};

const Field = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Field.displayName = fieldConfig?.field;

export default Field;
