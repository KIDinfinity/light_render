import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemInput,
  FormItemNumber,
} from 'basic/components/Form';
import useCalculateLoadingRequired from 'process/NB/ManualUnderwriting/_hooks/useCalculateLoadingRequired';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetLoadingFunctionType from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFunctionType';
import useGetLoadingRuleItem from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingRuleItem';
import { fieldConfig } from './LoadingPMLoading.config';
import useGetLoadingFieldVisibleByRateAllowIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByRateAllowIndicator';
import useLoadingFieldEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useLoadingFieldEditAllowable';
import useSetValueByLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useSetValueByLoadingEditAllowable';

export { fieldConfig } from './LoadingPMLoading.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  coverageId,
  fieldType,
  id,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visible = useGetLoadingFieldVisibleByRateAllowIndicator({
    coverageId,
    fieldConfig: config,
  });
  const loadingEditAllowable = useLoadingFieldEditAllowable(
    coverageId,
    id,
    'rateAllowIndicator',
    'Y'
  );
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const dicts = getDrowDownList({
    config,
    fieldProps,
  });
  const required = useCalculateLoadingRequired({ coverageId, config, id });
  const FormItemUnkownType = (() => {
    switch (fieldType) {
      case 'Number':
        return FormItemNumber;
      case 'Dropdown':
        return FormItemSelect;
      case 'Text':
      default:
        return FormItemInput;
    }
  })();
  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    id,
  });

  const rateMin = useGetLoadingRuleItem({
    coverageId,
    key: 'rateMin',
  });
  const rateMax = useGetLoadingRuleItem({
    coverageId,
    key: 'rateMax',
  });

  const formName = config.name || field;
  useSetValueByLoadingEditAllowable({ loadingEditAllowable, form, formName, coverageId, id });

  return (
    isShow &&
    visible && (
      <Col {...layout}>
        <FormItemUnkownType
          dicts={dicts}
          disabled={
            loadingFunctionType === 'C' ||
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No) ||
            !loadingEditAllowable
          }
          form={form}
          formName={formName}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          labelType="inline"
          hiddenPrefix
          precision={2}
          min={rateMin || 0}
          max={rateMax || Infinity}
          placeholder=" "
        />
      </Col>
    )
  );
};

const LoadingPMLoading = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  coverageId,
  fieldType,
  id,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      coverageId={coverageId}
      fieldType={fieldType}
      id={id}
    />
  </Authority>
);

LoadingPMLoading.displayName = 'pmLoading';

export default LoadingPMLoading;
