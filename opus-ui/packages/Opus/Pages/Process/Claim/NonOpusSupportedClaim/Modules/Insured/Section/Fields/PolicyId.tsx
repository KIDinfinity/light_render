import React, { useState } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../../../../activity.config';
import { localFieldConfig } from './PolicyId.config';

export { localFieldConfig } from './PolicyId.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const [enterDown, setEnterDown] = useState(false);

  const handlePolicyNo = (value?: string) => {
    dispatch({
      type: `${NAMESPACE}/saveSearchInsuredInfo`,
      payload: {
        changedFields: { policyId: value ?? formUtils.queryValue(form.getFieldValue('policyId')) },
      },
    });
    dispatch({
      type: `${NAMESPACE}/getInsuredInfo`,
      payload: { searchByPolicyId: true },
    });
  };

  const handleOnBlur = () => {
    if (!enterDown) {
      handlePolicyNo();
    }
  };

  const handleOnFocus = () => {
    setEnterDown(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setEnterDown(true);
      handlePolicyNo(e.target.value);
    }
  };

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onKeyDown={handleKeyDown}
        />
      </Col>
    )
  );
};

const PolicyId = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

PolicyId.displayName = localFieldConfig.field;

export default PolicyId;
