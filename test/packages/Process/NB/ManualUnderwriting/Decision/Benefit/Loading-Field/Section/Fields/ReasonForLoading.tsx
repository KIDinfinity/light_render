import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useFilterCodeDicts from 'process/NB/ManualUnderwriting/_hooks/useFilterCodeDicts';
import useGetLoadingFunctionType from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFunctionType';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export const fieldConfig = {
  section: 'Loading-Field',
  field: 'code',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_policy',
      dictCode: 'reasonForLoading',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POL_ReasonforLoading' },
    expand: 'Y',
    editable: 'Y',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 52,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 52,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config, fieldProps });
  const filterDicts = useFilterCodeDicts({ dicts, coverageId });
  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');
  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    id,
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={
            loadingFunctionType === 'C' ||
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          dicts={filterDicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          hiddenPrefix
          precision={0}
          optionShowType="both"
          placeholder=" "
        />
      </Col>
    )
  );
};

const ReasonForLoading = ({ field, config, form, editable, isShow, coverageId, id }: any) => {
  const localLayout = {
    // 480px
    xs: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 576px
    sm: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 768px
    md: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 992px
    lg: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 1200px
    xl: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
    // 1600px
    xxl: {
      span: 6,
      offset: 0,
      pull: 0,
      order: 52,
    },
  };
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={localLayout}
        form={form}
        editable={editable}
        coverageId={coverageId}
        id={id}
      />
    </Authority>
  );
};

ReasonForLoading.displayName = 'code';

export default ReasonForLoading;
