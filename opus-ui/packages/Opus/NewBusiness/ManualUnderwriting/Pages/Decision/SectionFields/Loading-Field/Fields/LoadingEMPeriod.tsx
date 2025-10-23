import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import useGetLoadingFieldVisibleByMeAllowIndicator from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByMeAllowIndicator';
import useCalculateLoadingRequired from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCalculateLoadingRequired';
import useGetLoadingFunctionType from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFunctionType';
import { fieldConfig } from './LoadingEMPeriod.config';
import useLoadingFieldEditAllowable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLoadingFieldEditAllowable';
import useGetLoadingPeriod from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingPeriod';
import useGetCopyLoadingDurationEditable from 'decision/components/Benefit/components/CoverageList/components/CoverageItem/components/Expander/components/Loading/_hooks/useGetCopyLoadingDurationEditable';
import OWBLoadingCode from 'opus/NewBusiness/ManualUnderwriting/_enum/OWBLoadingCode';
export { fieldConfig } from './LoadingEMPeriod.config';

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
  // emPeriod - extraMortality
  const payPeriod = useGetLoadingPeriod({ coverageId, field: 'extraMortality' });

  const copyLoadingEditable = useGetCopyLoadingDurationEditable({
    coverageId,
    loadingId: id,
    targetLoadingCode: OWBLoadingCode.EM,
  });

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
            !copyLoadingEditable
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
          pattern={/^([-]?)\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
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
