import React from 'react';
import { Col } from 'antd';

import { Authority, Visible, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import { fnPrecisionParser } from '@/utils/precisionUtils';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './tsarPH.config';
export { fieldConfig } from './tsarPH.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(config?.['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const value = form.getFieldValue(fieldConfig.field);

  return (
    isShow &&
    !!value &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          // suffix={<span className={styles.suffix}>{contractCurrency}</span>}
          parser={fnPrecisionParser}
          precision={2}
          pattern={/^\d{1,30}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
        />
      </Col>
    )
  );
};

const TsarPH = ({ form, editable, layout, isShow, id, config, readOnly }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        readOnly={readOnly}
      />
    </Authority>
  );
};

TsarPH.displayName = 'tsarPH';

export default TsarPH;
