import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './IdentityType.config';

export { localFieldConfig } from './IdentityType.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, taskDetail }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const dispatch = useDispatch();
  const handlePolicyNo = (identityType: string) => {
    const identityNo = formUtils.queryValue(form.getFieldValue('identityNo'));
    if (lodash.isEmpty(identityType) || lodash.isEmpty(identityNo)) {
      return;
    }
    dispatch({
      type: `${NAMESPACE}/saveSearchInsuredInfo`,
      payload: {
        changedFields: { identityType, identityNo },
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

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

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
          onChange={handlePolicyNo}
        />
      </Col>
    )
  );
};

const IdentityType = ({ field, config, isShow, layout, form, editable, taskDetail }: any) => (
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

IdentityType.displayName = localFieldConfig.field;

export default IdentityType;
