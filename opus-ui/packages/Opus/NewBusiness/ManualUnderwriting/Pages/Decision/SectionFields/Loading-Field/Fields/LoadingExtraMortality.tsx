import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  FormItemSelect,
  RuleByForm,
} from 'basic/components/Form';
import { Region } from '@/components/Tenant';
import useGetLoadingFieldVisibleByMeAllowIndicator from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByMeAllowIndicator';
import useGetLoadingFilterDicts from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFilterDicts';
import useCalculateLoadingRequired from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCalculateLoadingRequired';
import useGetLoadingFunctionType from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import useGetLoadingRuleItem from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingRuleItem';
import { fieldConfig } from './LoadingExtraMortality.config';
import useLoadingFieldEditAllowable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowable';
import useSetValueByLoadingEditAllowable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useSetValueByLoadingEditAllowable';

export { fieldConfig } from './LoadingExtraMortality.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useJudgeIsCopyLoading from 'decision/components/Benefit/components/CoverageList/components/CoverageItem/components/Expander/components/Loading/_hooks/useJudgeIsCopyLoading';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  regionCode,
  coverageId,
  id,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts: any = getDrowDownList({ config, fieldProps });
  const meMax = useGetLoadingRuleItem({
    coverageId,
    key: 'meMax',
  });
  const meMin = useGetLoadingRuleItem({
    coverageId,
    key: 'meMin',
  });
  const filterDicts = useGetLoadingFilterDicts({
    coverageId,
    dicts,
    rangeMax: meMax,
    rangeMin: meMin,
  });
  const loadingEditAllowable = useLoadingFieldEditAllowable(
    coverageId,
    id,
    'meAllowIndicator',
    'Y'
  );
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = useCalculateLoadingRequired({ config, coverageId, id, field: 'extraMortality' });
  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    id,
  });

  const visible = useGetLoadingFieldVisibleByMeAllowIndicator({
    coverageId,
    fieldConfig: config,
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
        {regionCode === Region.PH || regionCode === Region.ID ? (
          <FormItemSelect
            disabled={
              loadingFunctionType === 'C' ||
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No) ||
              !loadingEditAllowable ||
              isCopyLoading
            }
            dicts={filterDicts}
            form={form}
            formName={formName}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={required}
            labelType="inline"
            hiddenPrefix
            precision={0}
            placeholder=" "
          />
        ) : (
          <FormItemNumber
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No) ||
              isCopyLoading
            }
            form={form}
            formName={formName}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={required}
            labelType="inline"
            min={meMin || 0}
            max={meMax || Infinity}
            hiddenPrefix
            precision={0}
            placeholder=" "
          />
        )}
      </Col>
    )
  );
};

const LoadingExtraMortality = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  regionCode,
  meAllowIndicator,
  coverageId,
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
      regionCode={regionCode}
      meAllowIndicator={meAllowIndicator}
      coverageId={coverageId}
      id={id}
    />
  </Authority>
);

LoadingExtraMortality.displayName = 'extraMortality';

export default LoadingExtraMortality;
