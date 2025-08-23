import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  FormItemInput,
  RuleByForm,
} from 'basic/components/Form';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';

import { fieldConfig } from './Emperiod.config';
import useGetLoadingFieldVisibleByMeAllowIndicator from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingFieldVisibleByMeAllowIndicator.ts';
import useLoadingEditAllowable from 'decision/components/Benefit/_hooks/useLoadingEditAllowable';

export { fieldConfig } from './Emperiod.config';

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

  const loadingEditAllowable = useLoadingEditAllowable(loadingId, 'meAllowIndicator', 'Y');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    form,
    disabled: false,
  });

  const visibleConditions = useGetLoadingFieldVisibleByMeAllowIndicator({
    coverageId,
    fieldConfig: fieldProps,
  });

  return (
    isShow &&
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

const Emperiod = ({ field, config, isShow, layout, form, editable, coverageId, loadingId }: any) => (
  <Authority>
      <FormItem
        field={field} config={config} isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        coverageId={coverageId}
        loadingId={loadingId}
      />
  </Authority>
);

Emperiod.displayName = 'emPeriod';

export default Emperiod;
