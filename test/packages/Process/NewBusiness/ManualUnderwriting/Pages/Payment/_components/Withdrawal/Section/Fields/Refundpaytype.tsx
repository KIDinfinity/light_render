import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { useDispatch } from 'dva';
import { fieldConfig } from './Refundpaytype.config';
export { fieldConfig } from './Refundpaytype.config';

import { useGetRefundList } from '../../../../_hooks';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];

  const defaultRefundPayType = form.getFieldValue('defaultRefundPayType');
  const dicts = useGetRefundList({ defaultRefundPayType });
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
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
              ? editableConditions
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
          getPopupContainer={() => document.body}
          hiddenPrefix
          precision={0}
          onChange={(value: any) => {
            dispatch({
              type: `${NAMESPACE}/savePlanInfoData`,
              payload: {
                changedFields: {
                  refundPayType: value,
                },
                type: 'change',
              },
            });
          }}
        />
      </Col>
    )
  );
};

const Refundpaytype = ({ form, editable, section, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
    />
  </Authority>
);

Refundpaytype.displayName = 'refundPayType';

export default Refundpaytype;
