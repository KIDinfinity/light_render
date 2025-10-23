import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Visible,
  Editable,
  FormItemInput,
  RuleByForm,
} from 'basic/components/Form';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';

import { localConfig } from '../index';
import { fieldConfig } from './Emperiod.config';
import useGetLoadingFieldVisibleByMeAllowIndicator from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByMeAllowIndicator';
import useLoadingEditAllowable from 'process/NB/ManualUnderwriting/_hooks/useLoadingEditAllowable';

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

const Emperiod = ({ isShow, layout, form, editable, section, coverageId, loadingId }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={fieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        coverageId={coverageId}
        loadingId={loadingId}
      />
    </ElementConfig.Field>
  </Authority>
);

Emperiod.displayName = 'emPeriod';

export default Emperiod;
