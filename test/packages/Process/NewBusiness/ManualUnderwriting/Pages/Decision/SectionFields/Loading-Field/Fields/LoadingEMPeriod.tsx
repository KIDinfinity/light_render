import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import useGetLoadingFieldVisibleByMeAllowIndicator from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByMeAllowIndicator';
import useCalculateLoadingRequired from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCalculateLoadingRequired';
import useGetLoadingFunctionType from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import { fieldConfig } from './LoadingEMPeriod.config';
import useLoadingFieldEditAllowable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowable';
import useGetLoadingPeriod from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingPeriod';
export { fieldConfig } from './LoadingEMPeriod.config';

import useLoadingFieldEditAllowableForCopyDuration from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowableForCopyDuration';
import { OwbLoadingCode } from 'process/NewBusiness/ManualUnderwriting/_enum';

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visible = useGetLoadingFieldVisibleByMeAllowIndicator({
    coverageId,
    fieldConfig: config,
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
    'meAllowIndicator',
    'Y'
  );
  const loadingEditAllowableForCopyDuration = useLoadingFieldEditAllowableForCopyDuration(
    coverageId,
    id,
    OwbLoadingCode.EM
  );

  // emPeriod - extraMortality
  const payPeriod = useGetLoadingPeriod({ coverageId, field: 'extraMortality' });
  return (
    isShow &&
    visible && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            loadingFunctionType === 'C' ||
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
          max={Number(payPeriod)}
          placeholder=" "
        />
      </Col>
    )
  );
};

const LoadingEMPeriod = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  meAllowIndicator,
  coverageId,
  id,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        meAllowIndicator={meAllowIndicator}
        coverageId={coverageId}
        id={id}
      />
    </Authority>
  );
};

LoadingEMPeriod.displayName = 'emPeriod';

export default LoadingEMPeriod;
