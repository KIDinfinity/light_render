import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';

import { fieldConfig } from './Reasonflag.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
export { fieldConfig } from './Reasonflag.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  crtItemId,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
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
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          hiddenPrefix
          precision={0}

          placeholder=""
        />
      </Col>
    )
  );
};

const Reasonflag = ({
  form,
  editable,
  layout,
  isShow,
  config,
  id,
  crtItemId,
}: any) => {
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
        crtItemId={crtItemId}
      />
    </Authority>
  );
};

Reasonflag.displayName = 'reasonFlag';

export default Reasonflag;
