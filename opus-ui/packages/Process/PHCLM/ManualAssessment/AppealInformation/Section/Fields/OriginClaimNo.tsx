import React from 'react';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './OriginClaimNo.config';

export { localFieldConfig } from './OriginClaimNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const visibleConditions = true;
  const editableConditions = !useSelector(({[NAMESPACE]: modelnamespace}) => modelnamespace.claimProcessData?.claimAppealOriginalCase);
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
          onBlur={() => {
            dispatch({
              type: `${NAMESPACE}/getRelatedCase`
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
        />
      </Col>
    )
  );
};

const OriginClaimNo = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

OriginClaimNo.displayName = localFieldConfig.field;

export default OriginClaimNo;
