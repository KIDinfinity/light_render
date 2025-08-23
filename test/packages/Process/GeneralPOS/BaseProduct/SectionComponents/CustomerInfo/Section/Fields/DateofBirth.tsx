import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { NAMESPACE } from '../../../../activity.config';
import bpm from 'bpm/pages/OWBEntrance';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import classNames from 'classnames';
import styles from './index.less';
import { localFieldConfig } from './DateofBirth.config';

export { localFieldConfig } from './DateofBirth.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !form.getFieldValue(field);
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  const handleFieldChange = async (value: any) => {
    await dispatch({
      type: `${NAMESPACE}/savePolicyInfoClient`,
      payload: {
        value,
        key: 'dob',
        clientId: form.getFieldValue('clientId'),
        roles: form.getFieldValue('roles'),
      },
    });
    bpm.buttonAction('save');
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={classNames(!!editableConditions && styles.showIconWrap)}>
          <FormItemDatePicker
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
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            onChange={(value: any) => {
              handleFieldChange(value);
            }}
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
        </div>
      </Col>
    )
  );
};

const DateofBirth = ({ isShow, layout, form, editable, config }: any) => (
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

DateofBirth.displayName = localFieldConfig.field;

export default DateofBirth;
