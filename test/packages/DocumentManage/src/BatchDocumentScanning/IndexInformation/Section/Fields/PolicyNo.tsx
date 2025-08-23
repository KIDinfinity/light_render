import React, { useRef, useCallback, useEffect } from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { fieldConfig } from './PolicyNo.config';
import { useDispatch, useSelector } from 'dva';
import compact from 'lodash/compact';
import { tenant, Region } from '@/components/Tenant';
import { getUserInfo } from '@/utils/utils';

export { fieldConfig } from './PolicyNo.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  sectionIndex,
  type = tenant.region({
    [Region.MY]: 'PendingDocument',
    notMatch: 'NewRequest',
  }),
}: any) => {
  const assignee = useSelector(({ processTask }: any) => processTask.getTask?.assignee) || '';
  const userInfo = getUserInfo();
  const dispatch = useDispatch();
  const popupSearch = useRef(false);
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const successFn = useCallback(
    (policyNo) => {
      dispatch({
        type: 'batchDocumentScanningController/getInsuredInfo',
        payload: {
          sectionIndex,
          policyNo,
          popupSearch: popupSearch.current,
        },
      });
      popupSearch.current = false;
    },
    [popupSearch.current]
  );

  useEffect(() => {
    const policyNo = form.getFieldValue(field);
    if (policyNo && assignee == userInfo?.userId) {
      successFn(policyNo);
    }
  }, [type]);

  const rules = {};

  const onFocus = () => {
    popupSearch.current = true;
  };

  const onBlurByPolicyNo = async (e: any) => {
    const policyNo = e?.target.value;
    successFn(policyNo);
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onBlur={onBlurByPolicyNo}
          rules={compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => rules[rule])
          )}
          onFocus={onFocus}
        />
      </Col>
    )
  );
};

const PolicyNo = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  dispatch,
  sectionIndex,
  type,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      dispatch={dispatch}
      sectionIndex={sectionIndex}
      type={type}
    />
  </Authority>
);

PolicyNo.displayName = fieldConfig.field;

export default PolicyNo;
