import React from 'react';
import { Col } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
export const fieldConfig = {
  section: 'UWDecision',
  field: 'postponeShortName',
  'field-props': {
    visible: 'N',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'decisionCode' },
          operator: '===',
          right: 'P',
        },
      ],
    },
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'decisionCode' },
          operator: '===',
          right: 'P',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'PostponeShortName',
    },
    expand: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 55,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 55,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 55,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 55,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 55,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 55,
      },
    },
    'x-dict': {
      dictTypeCode: '',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const exclusionList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exclusionList,
    shallowEqual
  );
  const dicts = lodash.map(exclusionList, (item: any) => {
    return {
      dictCode: item?.longDesc,
      dictName: item?.longDesc,
    };
  });

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
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
          precision={0}
          placeholder=" "
        />
      </Col>
    )
  );
};

const PostponeShortName = ({ field, config, form, editable, layout, isShow }: any) => (
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

PostponeShortName.displayName = 'postponeShortName';

export default PostponeShortName;
