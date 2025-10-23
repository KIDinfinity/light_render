import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Editable, FormItemSelect, Required, Rule, Visible } from 'basic/components/Form';
import { ReactComponent as UpAndDownArrowIcon } from 'bpm/assets/up_down_arrow.svg';
import lodash from 'lodash';
import React from 'react';
import styles from '../../index.less';
import { localFieldConfig } from './CancelReason.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export { localFieldConfig } from './CancelReason.config';
export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const dicts = getDrowDownList({ config, fieldProps });
  const Rules = {};
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          className={styles.selectReason}
          // initialValue={initialValue}
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
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          allowClear={false}
          suffix={<UpAndDownArrowIcon className={styles.upAndDownArrowIcon} />}
          placeholder={formatMessageApi({ Label_COM_General: 'select' })}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
