import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  FormItemInput,
  RuleByForm,
} from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import useGetLoadingFieldVisibleByRateAllowIndicator from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByRateAllowIndicator.ts';
import { fieldConfig } from './Pmperiod.config';
import useLoadingEditAllowable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useLoadingEditAllowable.ts';

export { fieldConfig } from './Pmperiod.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  coverageId,
  loadingId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const visibleConditions = regionCode !== Region.MY;
  const loadingEditAllowable = useLoadingEditAllowable(loadingId, 'rateAllowIndicator', 'Y');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    form,
    disabled: false,
  });

  const visible = useGetLoadingFieldVisibleByRateAllowIndicator({
    coverageId,
    fieldConfig: fieldProps,
  });

  return (
    isShow &&
    visible &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No) ||
            !loadingEditAllowable
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredConditions}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Pmperiod = ({ field, config,
  isShow,
  layout,
  form,
  editable,
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

Pmperiod.displayName = 'pmPeriod';

export default Pmperiod;
