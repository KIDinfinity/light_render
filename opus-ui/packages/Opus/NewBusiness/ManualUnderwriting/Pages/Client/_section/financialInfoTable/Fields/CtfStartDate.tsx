import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
  formUtils,
  Required,
} from 'basic/components/Form';

import useJudgeByDisplayConfig from '../../../_hooks/useJudgeByDisplayConfig';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './CtfStartDate.config';
export { fieldConfig } from './CtfStartDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const ctfStartDateShow = useJudgeByDisplayConfig({
    value: form.getFieldValue('identityType'),
    targetKey: 'issueDate',
  });
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = RuleByForm(config?.['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions: ctfStartDateShow,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const newCrs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[id]?.newCrs
  );
  const isCrs = formUtils.queryValue(newCrs) === 'Y';

  return (
    isShow &&
    ctfStartDateShow &&
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
          required={
            config?.required === Required.Conditions || fieldProps?.required === Required.Conditions
              ? isCrs
              : (config?.required || fieldProps.required) === Required.No
          }
          allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const CtfStartDate = ({ form, editable, layout, isShow, handleFocus, config, id }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        handleFocus={handleFocus}
        id={id}
      />
    </Authority>
  );
};

CtfStartDate.displayName = 'ctfStartDate';

export default CtfStartDate;
