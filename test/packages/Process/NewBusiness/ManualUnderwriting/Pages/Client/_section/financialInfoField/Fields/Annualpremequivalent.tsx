import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import { fnPrecisionParser } from '@/utils/precisionUtils';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Annualpremequivalent.config';

export { fieldConfig } from './Annualpremequivalent.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });
  return (
    isShow &&
    (config?.visible || fieldProps.visible) !== Visible.No &&
    visibleConditions && (
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
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          pattern={/^\d{1,30}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
          objectName="nb.policyList.clientInfo"
          hiddenPrefix
          parser={fnPrecisionParser}
          precision={2}
        />
      </Col>
    )
  );
};

const Annualpremquivalent = ({ form, editable, layout, isShow, id, config }: any) => {
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
      />
    </Authority>
  );
};

Annualpremquivalent.displayName = 'annualPremEquivalent';

export default Annualpremquivalent;
