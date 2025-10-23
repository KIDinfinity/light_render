import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  formUtils,
  Required,
} from 'basic/components/Form';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useGetCountryDropdown from '../../../_hooks/useGetCountryDropdown';
import { fieldConfig } from './CtfCountryCode.config';
export { fieldConfig } from './CtfCountryCode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, crtItemId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCountryDropdown();

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
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
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions || fieldProps?.required === Required.Conditions
              ? isCrs
              : (config?.required || fieldProps.required) === Required.No
          }
          // labelType="inline"
          placeholder=""
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const CtfCountryCode = ({ form, editable, layout, isShow, config, id, crtItemId }: any) => {
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

CtfCountryCode.displayName = 'ctfcountrycode';

export default CtfCountryCode;
