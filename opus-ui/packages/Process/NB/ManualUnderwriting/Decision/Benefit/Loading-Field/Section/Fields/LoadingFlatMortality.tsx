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
import useGetLoadingFieldVisibleByFeAllowIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByFeAllowIndicator';
import useGetLoadingFilterDicts from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFilterDicts';
import useCalculateLoadingRequired from 'process/NB/ManualUnderwriting/_hooks/useCalculateLoadingRequired';
import useGetLoadingFunctionType from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFunctionType';
import useGetLoadingRuleItem from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingRuleItem';
import { fieldConfig } from './LoadingFlatMortality.config';
import useLoadingFieldEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useLoadingFieldEditAllowable';
import useSetValueByLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useSetValueByLoadingEditAllowable';

export { fieldConfig } from './LoadingFlatMortality.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
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
  useSetValueByLoadingEditAllowable({ loadingEditAllowable, form, formName, coverageId, id });

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
              !loadingEditAllowable
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
              loadingFunctionType === 'C' ||
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={required}
            min={feMin || 0}
            max={feMax || Infinity}
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
