import React, { useState } from 'react';
import { Col } from 'antd';
import { NAMESPACE } from '../../../activity.config';
import { useDispatch } from 'dva';
import { Authority, Visible, Editable, Required, FormItemInput, Rule } from 'basic/components/Form';

import { localFieldConfig } from './PolicyNo.config';

export { localFieldConfig } from './PolicyNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = config || localFieldConfig['field-props'];

  const [keyDownStatus, setKeyDownStatus] = useState(false);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const handlePolicyNo = (value?: any) => {
    // const policyNo = formUtils.queryValue(form.getFieldValue('policyNo'));
    if (!value) {
      dispatch({
        type: `${NAMESPACE}/updateBusinessData`,
        payload: {
          changedFields: {
            insuredName: '',
          },
        },
      });
    } else {
      dispatch({
        type: `${NAMESPACE}/getInsuredInfo`,
        payload: {
          policyIdList: [value],
        },
      });
    }
  };
  const handleOnBlur = async (e: { target?: { value: string } }) => {
    if (!keyDownStatus) {
      handlePolicyNo(e?.target?.value);
    }
  };
  const handleOnFocus = () => {
    setKeyDownStatus(false);
  };
  const handleKeyDown = (e: { keyCode: number; target?: { value: any } }) => {
    if (e.keyCode === 13) {
      setKeyDownStatus(true);
      handlePolicyNo(e?.target?.value);
    }
  };

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            config?.required === Required.Conditions
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

const PolicyNo = ({ field, config, isShow, layout, form, editable, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

PolicyNo.displayName = 'PolicyNo';

export default PolicyNo;
