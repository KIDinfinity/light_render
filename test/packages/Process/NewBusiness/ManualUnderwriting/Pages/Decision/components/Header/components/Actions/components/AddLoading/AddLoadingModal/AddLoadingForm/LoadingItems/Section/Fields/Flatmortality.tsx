import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Region, tenant } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemNumber,
  Required,
} from 'basic/components/Form';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import { fieldConfig } from './Flatmortality.config';
// import useGetVisibleByConfig from 'basic/hooks/useGetVisibleByConfig';
import useGetLoadingRuleItem from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingRuleItem.ts';
import useGetLoadingFilterDicts from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFilterDicts';
import useGetLoadingFieldVisibleByFeAllowIndicator from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByFeAllowIndicator';
import useGetLoadingFunctionType from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import useLoadingEditAllowable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useLoadingEditAllowable.ts';
import useSetAddingValueByLoadingEditAllowable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useSetAddingValueByLoadingEditAllowable.ts';

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

const Flatmortality = ({ field, config,
  form,
  editable,
    layout,
  isShow,
  coverageId,
  productId,
  loadingId,
}: any) => (
  <Authority>
      <FormItem
        field={field} config={config} isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        coverageId={coverageId}
        productId={productId}
        loadingId={loadingId}
      />
  </Authority>
);

Flatmortality.displayName = 'flatMortality';

export default Flatmortality;
