import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemNumber,
  FormItemInput,
} from 'basic/components/Form';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import { localConfig as localSectionConfig } from '../index';
import { fieldConfig } from './Pmloading.config';
import useGetLoadingFunctionType from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFunctionType';
import useGetLoadingFieldVisibleByRateAllowIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByRateAllowIndicator';
import useGetLoadingRuleItem from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingRuleItem';
import useLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useLoadingEditAllowable';
import useSetAddingValueByLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useSetAddingValueByLoadingEditAllowable';
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

const Pmloading = ({
  form,
  editable,
  section,
  layout,
  isShow,
  fieldType,
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
        fieldType={fieldType}
        coverageId={coverageId}
        productId={productId}
        loadingId={loadingId}
      />
    </ElementConfig.Field>
  </Authority>
);

Pmloading.displayName = 'pmLoading';

export default Pmloading;
