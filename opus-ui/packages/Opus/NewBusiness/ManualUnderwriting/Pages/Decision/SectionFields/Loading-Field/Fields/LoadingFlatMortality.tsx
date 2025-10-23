import React from 'react';
import { Col } from 'antd';
import { Region, tenant } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemNumber,
} from 'basic/components/Form';
import useGetLoadingFieldVisibleByFeAllowIndicator from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByFeAllowIndicator';
import useGetLoadingFilterDicts from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFilterDicts';
import useCalculateLoadingRequired from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCalculateLoadingRequired';
import useGetLoadingFunctionType from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import useGetLoadingRuleItem from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingRuleItem';
import { fieldConfig } from './LoadingFlatMortality.config';
import useLoadingFieldEditAllowable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowable';
import useSetValueByLoadingEditAllowable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useSetValueByLoadingEditAllowable';

export { fieldConfig } from './LoadingFlatMortality.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useJudgeIsCopyLoading from 'decision/components/Benefit/components/CoverageList/components/CoverageItem/components/Expander/components/Loading/_hooks/useJudgeIsCopyLoading';
const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  /*

  */
  const regionCode = tenant.region();
  const feMin = useGetLoadingRuleItem({
    coverageId,
    key: 'feMin',
  });
  const feMax = useGetLoadingRuleItem({
    coverageId,
    key: 'feMax',
  });
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config });
  const filterDicts = useGetLoadingFilterDicts({
    coverageId,
    dicts,
    rangeMax: feMax,
    rangeMin: feMin,
  });
  const visible = useGetLoadingFieldVisibleByFeAllowIndicator({
    coverageId,
    fieldConfig: fieldProps,
  });
  const loadingEditAllowable = useLoadingFieldEditAllowable(
    coverageId,
    id,
    'feAllowIndicator',
    'Y'
  );
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);

  const required = useCalculateLoadingRequired({ config, coverageId, id });
  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    id,
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
        {regionCode !== Region.VN ? (
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
            getPopupContainer={() => document.getElementById('coverageListArea') || document.body}
          />
        ) : (
          <FormItemNumber
            disabled={
              loadingFunctionType === 'C' ||
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No) ||
              isCopyLoading
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={required}
            min={feMin || 0}
            max={feMax || Infinity}
            labelType="inline"
            hiddenPrefix
            precision={0}
            placeholder=" "
          />
        )}
      </Col>
    )
  );
};

const LoadingFlatMortality = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  feAllowIndicator,
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
      feAllowIndicator={feAllowIndicator}
      coverageId={coverageId}
      id={id}
    />
  </Authority>
);

LoadingFlatMortality.displayName = 'flatMortality';

export default LoadingFlatMortality;
