import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemNumber,
  FormItemInput,
} from 'basic/components/Form';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import { fieldConfig } from './Pmloading.config';
import useGetLoadingFieldVisibleByRateAllowIndicator from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByRateAllowIndicator.ts';
import useGetLoadingRuleItem from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingRuleItem.ts';
import useGetLoadingFunctionType from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import useLoadingEditAllowable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useLoadingEditAllowable.ts';
import useSetAddingValueByLoadingEditAllowable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useSetAddingValueByLoadingEditAllowable.ts';
export { fieldConfig } from './Pmloading.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  fieldType,
  coverageId,
  productId,
  loadingId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    form,
    disabled: false,
  });
  const visible = useGetLoadingFieldVisibleByRateAllowIndicator({
    coverageId,
    fieldConfig: config,
  });
  const loadingEditAllowable = useLoadingEditAllowable(loadingId, 'rateAllowIndicator', 'Y');
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
    productId,
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
  useSetAddingValueByLoadingEditAllowable({ loadingEditAllowable, form, formName, loadingId });

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
          required={requiredConditions}
          min={rateMin || 0}
          max={rateMax || Infinity}
          hiddenPrefix
          precision={2}
        />
      </Col>
    )
  );
};

const Pmloading = ({ field, config,
  form,
  editable,
    layout,
  isShow,
  fieldType,
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
        fieldType={fieldType}
        coverageId={coverageId}
        productId={productId}
        loadingId={loadingId}
      />
  </Authority>
);

Pmloading.displayName = 'pmLoading';

export default Pmloading;
