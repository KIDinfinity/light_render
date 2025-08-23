import React from 'react';
import { Col } from 'antd';
import bpm from 'bpm/pages/OWBEntrance';

import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../../../../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { localFieldConfig } from './Name.config';

export { localFieldConfig } from './Name.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !form.getFieldValue(field);
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const handleFieldChange = async (value: any) => {
    await dispatch({
      type: `${NAMESPACE}/savePolicyInfoClient`,
      payload: {
        value,
        key: 'name',
        clientId: form.getFieldValue('clientId'),
        roles: form.getFieldValue('roles'),
      },
    });
    // TODO：这样会不会导致卡顿?
    await dispatch({
      type: `${NAMESPACE}/clientRoleInit`,
    });
    bpm.buttonAction('save');
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
          placeholder=""
          isInline
          onBlur={(e: any) => {
            handleFieldChange(e?.target?.value);
          }}
          bordered={!editableConditions}
          warningMessage={
            editableConditions
              ? [
                  {
                    messageType: MessageType.Information,
                    message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001286' }),
                  },
                ]
              : []
          }
        />
      </Col>
    )
  );
};

const Name = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
    />
  </Authority>
);

Name.displayName = localFieldConfig.field;

export default Name;
