import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import styles from './index.less';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './ReversalFlag.config';

export { localFieldConfig } from './ReversalFlag.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  field,
  config,
  dictCode,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode)

  const visibleConditions = form.getFieldValue('payableAmount') < 0 && form.getFieldValue('isAdjustment') === 'Y' && !form.getFieldValue('isOrigin');
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
          className={styles.markRed}
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
        />
      </Col>
    )
  );
};

const CriticalIllness = ({
  field,
  config,
  isShow,
  layout,
  form,
  dictCode,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      dictCode={dictCode}
    />
  </Authority>
);

CriticalIllness.displayName = localFieldConfig.field;

export default CriticalIllness;
