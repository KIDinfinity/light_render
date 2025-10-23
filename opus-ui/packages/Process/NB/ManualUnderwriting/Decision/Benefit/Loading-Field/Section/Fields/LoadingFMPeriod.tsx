import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import useGetLoadingFieldVisibleByFeAllowIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByFeAllowIndicator';
import useCalculateLoadingRequired from 'process/NB/ManualUnderwriting/_hooks/useCalculateLoadingRequired';
import useGetLoadingFunctionType from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFunctionType';
import { fieldConfig } from './LoadingFMPeriod.config';
import useLoadingFieldEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useLoadingFieldEditAllowable';
import useGetLoadingPeriod from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingPeriod';

export { fieldConfig } from './LoadingFMPeriod.config';

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visible = useGetLoadingFieldVisibleByFeAllowIndicator({
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
    'feAllowIndicator',
    'Y'
  );
  // fmPeriod - flatMortality
  const payPeriod = useGetLoadingPeriod({ coverageId, field: 'flatMortality' });

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
            !loadingEditAllowable
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          labelType="inline"
          hiddenPrefix
          precision={0}
          max={payPeriod}
          placeholder=" "
        />
      </Col>
    )
  );
};

const LoadingFMPeriod = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
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
      coverageId={coverageId}
      id={id}
    />
  </Authority>
);

LoadingFMPeriod.displayName = 'fmPeriod';

export default LoadingFMPeriod;
