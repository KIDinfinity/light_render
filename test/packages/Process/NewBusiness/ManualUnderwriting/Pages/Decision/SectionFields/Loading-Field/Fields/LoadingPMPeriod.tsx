import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';

import { Authority, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import useCalculateLoadingRequired from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCalculateLoadingRequired';
import useGetLoadingFieldVisibleByRateAllowIndicator from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByRateAllowIndicator';
import useGetLoadingFunctionType from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import { fieldConfig } from './LoadingPMPeriod.config';
import useLoadingFieldEditAllowable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowable';
import useGetLoadingPeriod from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingPeriod';
import useLoadingFieldEditAllowableForCopyDuration from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowableForCopyDuration';
import { OwbLoadingCode } from 'process/NewBusiness/ManualUnderwriting/_enum';

export { fieldConfig } from './LoadingPMPeriod.config';

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visible = useGetLoadingFieldVisibleByRateAllowIndicator({
    coverageId,
    fieldConfig: fieldProps,
  });
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = useCalculateLoadingRequired({ config, coverageId, id });
  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    id,
  });
  const loadingEditAllowable = useLoadingFieldEditAllowable(
    coverageId,
    id,
    'rateAllowIndicator',
    'Y'
  );

  const loadingEditAllowableForCopyDuration = useLoadingFieldEditAllowableForCopyDuration(
    coverageId,
    id,
    OwbLoadingCode.PM
  );

  // pmPeriod - pmLoading
  const payPeriod = useGetLoadingPeriod({ coverageId, field: 'pmLoading' });
  const max = lodash.toNumber(payPeriod);
  const extraMax = lodash.isNumber(max) ? { max } : {};
  return (
    isShow &&
    visible && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            loadingFunctionType == 'C' ||
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No) ||
            !loadingEditAllowable ||
            !loadingEditAllowableForCopyDuration
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=" "
          {...extraMax}
        />
      </Col>
    )
  );
};

const LoadingPMPeriod = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  regionCode,
  rateAllowIndicator,
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
      rateAllowIndicator={rateAllowIndicator}
      coverageId={coverageId}
      id={id}
    />
  </Authority>
);

LoadingPMPeriod.displayName = 'pmPeriod';

export default LoadingPMPeriod;
