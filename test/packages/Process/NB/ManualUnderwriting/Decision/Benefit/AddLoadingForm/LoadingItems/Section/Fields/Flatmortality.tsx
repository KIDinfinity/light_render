import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Region, tenant } from '@/components/Tenant';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemNumber,
  Required,
} from 'basic/components/Form';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import { localConfig as localSectionConfig } from '../index';
import { fieldConfig } from './Flatmortality.config';
// import useGetVisibleByConfig from 'basic/hooks/useGetVisibleByConfig';
import useGetLoadingRuleItem from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingRuleItem';
import useGetLoadingFilterDicts from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFilterDicts';
import useGetLoadingFieldVisibleByFeAllowIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByFeAllowIndicator';
import useGetLoadingFunctionType from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFunctionType';
import useLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useLoadingEditAllowable';
import useSetAddingValueByLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useSetAddingValueByLoadingEditAllowable';

export { fieldConfig } from './Flatmortality.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  coverageId,
  productId,
  loadingId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const dicts = getDrowDownList({ config, fieldProps });
  const feMin = useGetLoadingRuleItem({
    coverageId,
    key: 'feMin',
  });
  const feMax = useGetLoadingRuleItem({
    coverageId,
    key: 'feMax',
  });
  const filterDicts = useGetLoadingFilterDicts({
    coverageId,
    dicts,
    rangeMax: feMax,
    rangeMin: feMin,
  });
  const loadingEditAllowable = useLoadingEditAllowable(loadingId, 'feAllowIndicator', 'Y');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    form,
    disabled: false,
  });

  const visible = useGetLoadingFieldVisibleByFeAllowIndicator({
    coverageId,
    fieldConfig: fieldProps,
  });

  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    productId,
  });

  const formName = config.name || field;
  useSetAddingValueByLoadingEditAllowable({ loadingEditAllowable, form, formName, loadingId });

  return (
    isShow &&
    visible && (
      <Col {...layout}>
        {regionCode !== Region.VN ? (
          <FormItemSelect
            dicts={filterDicts}
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
            required={requiredConditions}
            hiddenPrefix
            precision={0}
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
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
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

const Flatmortality = ({
  form,
  editable,
  section,
  layout,
  isShow,
  coverageId,
  productId,
  loadingId,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        coverageId={coverageId}
        productId={productId}
        loadingId={loadingId}
      />
    </ElementConfig.Field>
  </Authority>
);

Flatmortality.displayName = 'flatMortality';

export default Flatmortality;
