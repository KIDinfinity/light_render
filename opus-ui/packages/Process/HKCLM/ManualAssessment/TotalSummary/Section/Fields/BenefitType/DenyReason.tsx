import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemAutoComplete,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './DenyReason.config';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export { localFieldConfig } from './DenyReason.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, payableId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !!Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const denyReasonList = getDrowDownList('Dropdown_CLM_OtherDenyReason') || []
  const dataSource = denyReasonList.map(obj => obj.dictName)
  // const value = form.getFieldValue(config.name || field)
  const dispatch = useDispatch();


  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemAutoComplete
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          allowClear
          dataSource={dataSource}
          onSearch={() => dataSource}
          onSelect={() => {
            dispatch({
              type: `${NAMESPACE}/fixDenyReason`,
              payload: {
                id: payableId
              }
            })
          }}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          maxLength={config?.maxLength || fieldProps.maxLength}
        />
      </Col>
    )
  );
};

const DenyReason = ({ field, config, isShow, layout, form, editable, payableId }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} payableId={payableId} />
  </Authority>
);

DenyReason.displayName = localFieldConfig.field;

export default DenyReason;
