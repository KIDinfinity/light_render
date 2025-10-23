import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useRequiredByNationality from '../../../_hooks/useRequiredByNationality';
import useJudgeByDisplayConfig from '../../../_hooks/useJudgeByDisplayConfig';

import { fieldConfig } from './Secondaryidentityexpirydate.config';
import useGetSecondaryExpirydateEditable from 'process/NB/ManualUnderwriting/_hooks/useGetSecondaryExpirydateEditable';
export { fieldConfig } from './Secondaryidentityexpirydate.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = useRequiredByNationality({
    nationality: form.getFieldValue('nationality'),
  });
  const expiryDateShow = useJudgeByDisplayConfig({
    value: form.getFieldValue('SecondaryIdentityType'),
    targetKey: 'expiryDate',
  });

  const expiryDateeditable = useGetSecondaryExpirydateEditable({
    SecondaryIdentityType: form.getFieldValue('SecondaryIdentityType'),
  });

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  return (
    isShow &&
    expiryDateShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          required={requiredByRole || expiryDateeditable}
          allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Secondaryidentityexpirydate = ({ form, editable, layout, isShow, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </Authority>
  );
};

Secondaryidentityexpirydate.displayName = 'SecondaryIdentityExpiryDate';

export default Secondaryidentityexpirydate;
