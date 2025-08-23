import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './TransactionTypeCode.config';

export { localFieldConfig } from './TransactionTypeCode.config';
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
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};

  const Dropdown_COM_VanillaClaimType = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_COM_VanillaClaimType
  );
  const Dropdown_COM_VanillaTransactionType_TAK = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController.Dropdown_COM_VanillaTransactionType_TAK
  );
  const Dropdown_COM_VanillaTransactionType = useSelector(
    ({ dictionaryController }: any) => dictionaryController.Dropdown_COM_VanillaTransactionType
  );

  const businessType = form.getFieldValue('businessType');

  let dicts = [];
  if (businessType === 'BIZ002') {
    dicts = Dropdown_COM_VanillaTransactionType;
  }
  if (businessType === 'BIZ001') {
    dicts = Dropdown_COM_VanillaClaimType;
  }
  if (businessType === 'BIZ002' && caseCategory === 'BP_VAN_CTG002') {
    dicts = Dropdown_COM_VanillaTransactionType_TAK;
  }

  const visibleConditions = Rule(
    config['visible-condition'] || fieldProps['visible-condition'],
    form,
    ''
  );
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
  const requiredConditions = Rule(
    config['required-condition'] || fieldProps['required-condition'],
    form,
    ''
  );

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          className={classNames({ [styles.transactionType]: true })}
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          existCodes={[]}
          form={form}
          formName={config?.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          allowClear
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const TransactionTypeCode = ({
  isShow,
  layout,
  form,
  editable,
  section,
  transactionId,
  isAdd,
  config,
}: any) => (
  <Authority>
    <ElementConfig.Field config={config} section={section} field={localFieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        transactionId={transactionId}
        isAdd={isAdd}
      />
    </ElementConfig.Field>
  </Authority>
);

TransactionTypeCode.displayName = localFieldConfig.field;

export default TransactionTypeCode;
