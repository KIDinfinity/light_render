import React, { useState } from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Rule,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './PolicyId.config';

export { localFieldConfig } from './PolicyId.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, taskDetail }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const insured = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, 'claimProcessData.insured')
  );
  const dispatch = useDispatch();
  const [keyDownStatus, setKeyDownStatus] = useState(false);
  const handlePolicyNo = () => {
    const policyNoList = [];
    const policyNo =
      formUtils.queryValue(form.getFieldValue('policyId')) ||
      formUtils.queryValue(insured?.policyId);
    policyNoList.push(lodash.toUpper(policyNo));
    dispatch({
      type: `${NAMESPACE}/saveSearchInsuredInfo`,
      payload: {
        changedFields: {
          policyId: policyNo,
          identityType: null,
          identityNo: null,
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
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
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
          transform={(val: string) => lodash.toUpper(val)}
        />
      </Col>
    )
  );
};

const PolicyId = ({ field, config, isShow, layout, form, editable, taskDetail }: any) => (
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

PolicyId.displayName = localFieldConfig.field;

export default PolicyId;
