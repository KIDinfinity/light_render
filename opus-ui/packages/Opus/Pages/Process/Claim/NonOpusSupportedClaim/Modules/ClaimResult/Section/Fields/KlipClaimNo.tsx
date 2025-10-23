import React from 'react';
import { Col } from 'antd';
import { FormItemInput, Editable, Rule, Required, Visible, Authority } from 'basic/components/Form';
import { localFieldConfig } from './KlipClaimNo.config';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

export { localFieldConfig } from './KlipClaimNo.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? !!visibleConditions
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
          maxLength={config?.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onChange={(value: any) => {
            const oldValue = form.getFieldValue(config.name || field);
            if (oldValue !== value) {
              dispatch({
                type: `${NAMESPACE}/syncFieldData`,
                payload: {
                  hostClaimNo: value,
                },
              });
            }
          }}
        />
      </Col>
    )
  );
};

export const KlipClaimNo = ({ field, config, form, editable, layout, isShow, ...res }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      {...res}
    />
  </Authority>
);

KlipClaimNo.displayName = 'klipClaimNo';

export default KlipClaimNo;
