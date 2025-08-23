import React from 'react';
import { Col } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export const fieldConfig = {
  section: 'UWDecision',
  field: 'currencyCode',
  fieldType: 'Dropdown',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'Currency',
    },
    expand: 'Y',
    editable: 'Y',
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 52,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CFG_Currency',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config, fieldProps });

  const currencyEditable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.currencyEditable,
    shallowEqual
  );
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={
            currencyEditable
              ? false
              : !editable ||
                ((config?.editable || fieldProps.editable) === Editable.Conditions
                  ? editableConditions
                  : (config?.editable || fieldProps.editable) === Editable.No)
          }
          dicts={dicts}
          form={form}
          formName={config.name || field}
          // labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          // hiddenPrefix
          precision={0}
          placeholder=" "
          allowClear={false}
        />
      </Col>
    )
  );
};

const Currency = ({ field, config, form, editable, layout, isShow }: any) => (
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

Currency.displayName = 'CurrencyCode';

export default Currency;
