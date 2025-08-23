import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import styles from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Header/components/Actions/components/WaiveLoading/WaiveLoadingModal/loading.less'
import { fieldConfig } from './WaiveTerm.config';

export { fieldConfig } from './WaiveTerm.config';

const FormItem = ({ isShow, layout, form, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} className={styles.waiveTerm}>
        <FormItemNumber
          disabled={
            (config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No
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
          labelType="inline"
          hiddenPrefix
          precision={0}
          pattern={/^[1-9]\d*$/g}
          placeholder=" "
        />
      </Col>
    )
  );
};

const WaiveTerm = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

WaiveTerm.displayName = 'waiveTerm';

export default WaiveTerm;
