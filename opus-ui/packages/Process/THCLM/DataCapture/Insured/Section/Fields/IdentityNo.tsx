import React, { useState } from 'react';
import { NAMESPACE } from '../../../activity.config';

import { useDispatch } from 'dva';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './IdentityNo.config';

export { localFieldConfig } from './IdentityNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, taskDetail }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const [keyDownStatus, setKeyDownStatus] = useState(false);
  const handlePolicyNo = () => {
    const identityType = formUtils.queryValue(form.getFieldValue('identityType'));
    const identityNo = formUtils.queryValue(form.getFieldValue('identityNo'));
    if (lodash.isEmpty(identityType) || lodash.isEmpty(identityNo)) {
      return;
    }
    dispatch({
      type: `${NAMESPACE}/saveSearchInsuredInfo`,
      payload: {
        changedFields: {
          policyId: null,
          identityType,
          identityNo,
        },
      },
    });
    dispatch({
      type: `${NAMESPACE}/getInsuredInfo`,
      payload: {
        searchByPolicyId: true,
        caseCategory: taskDetail?.caseCategory,
      },
    });
  };
  const handleOnBlur = async () => {
    if (!keyDownStatus) {
      handlePolicyNo();
    }
  };
  const handleOnFocus = () => {
    setKeyDownStatus(false);
  };
  const handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      setKeyDownStatus(true);
      handlePolicyNo();
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
          maxLength={config?.maxLength || fieldProps.maxLength}
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

const IdentityNo = ({ field, config, isShow, layout, form, editable, taskDetail }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      taskDetail={taskDetail}
    />
  </Authority>
);

IdentityNo.displayName = localFieldConfig.field;

export default IdentityNo;
