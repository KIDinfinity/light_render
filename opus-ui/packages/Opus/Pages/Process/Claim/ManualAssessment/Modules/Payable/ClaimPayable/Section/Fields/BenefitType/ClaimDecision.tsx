import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import { useDispatch } from 'dva';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './ClaimDecision.config';

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentPayableItem,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const Rules = {};

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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          // rules={lodash.compact(
          //   (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          // )}
        />
      </Col>
    )
  );
};

const ClaimDecision = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentPayableItem,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentPayableItem={incidentPayableItem}
    />
  </Authority>
);

ClaimDecision.displayName = localFieldConfig.field;

export default ClaimDecision;
