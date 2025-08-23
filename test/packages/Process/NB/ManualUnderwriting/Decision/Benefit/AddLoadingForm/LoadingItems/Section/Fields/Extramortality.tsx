import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
  FormItemNumber,
} from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import { localConfig as localSectionConfig } from '../index';
import { fieldConfig } from './Extramortality.config';
import useGetLoadingFieldVisibleByMeAllowIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByMeAllowIndicator';
import useGetLoadingFilterDicts from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFilterDicts';
import useGetLoadingRuleItem from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingRuleItem';
import useGetLoadingFunctionType from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFunctionType';
import useLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useLoadingEditAllowable';
import useSetAddingValueByLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useSetAddingValueByLoadingEditAllowable';

export { fieldConfig } from './Extramortality.config';

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
  const regionCode = tenant.region();
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

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
  const visibleConditions = useGetLoadingFieldVisibleByMeAllowIndicator({
    coverageId,
    fieldConfig: fieldProps,
  });

  const loadingEditAllowable = useLoadingEditAllowable(loadingId, 'meAllowIndicator', 'Y');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    form,
    disabled: false,
  });
  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    productId,
  });

  const formName = config.name || field;
  useSetAddingValueByLoadingEditAllowable({ loadingEditAllowable, form, formName, loadingId });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {regionCode === Region.PH || regionCode === Region.ID ? (
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
            required={requiredConditions}
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
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
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

const Extramortality = ({
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

Extramortality.displayName = 'extraMortality';

export default Extramortality;
