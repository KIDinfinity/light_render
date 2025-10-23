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
import { useSelector } from 'dva';
import { localFieldConfig } from './BranchCode.config';

export { localFieldConfig } from './BranchCode.config';
import classNames from 'classnames';
import styles from '../../index.less';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  isAdd,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector((state) => state?.dictionaryController?.Dropdown_POS_Branch);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') || isAdd;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          className={classNames({ [styles.hiddenSvg]: !isAdd })}
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          allowClear={false}
          getPopupContainer={() => document.body}
        />
      </Col>
    )
  );
};

const RegenContract = ({ isShow, layout, form, editable, transactionId, config, isAdd }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
      isAdd={isAdd}
    />
  </Authority>
);

RegenContract.displayName = localFieldConfig.field;

export default RegenContract;
