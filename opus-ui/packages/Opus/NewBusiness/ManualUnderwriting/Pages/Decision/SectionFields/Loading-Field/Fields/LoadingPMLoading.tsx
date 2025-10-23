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
import useCalculateLoadingRequired from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCalculateLoadingRequired';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetLoadingFunctionType from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import useGetLoadingRuleItem from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingRuleItem';
import { fieldConfig } from './LoadingPMLoading.config';
import useGetLoadingFieldVisibleByRateAllowIndicator from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByRateAllowIndicator';
import useLoadingFieldEditAllowable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowable';
import useSetValueByLoadingEditAllowable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useSetValueByLoadingEditAllowable';
import useJudgeIsCopyLoading from 'decision/components/Benefit/components/CoverageList/components/CoverageItem/components/Expander/components/Loading/_hooks/useJudgeIsCopyLoading';

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
  useSetValueByLoadingEditAllowable({
    loadingEditAllowable,
    formEditable: editable,
    form,
    formName,
    coverageId,
    id,
  });

  const isCopyLoading = useJudgeIsCopyLoading({ loadingId: id, coverageId });

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
            !loadingEditAllowable ||
            isCopyLoading
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
          getPopupContainer={() => document.getElementById('coverageListArea') || document.body}
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
