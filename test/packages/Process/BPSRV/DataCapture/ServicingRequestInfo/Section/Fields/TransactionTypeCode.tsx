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
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localConfig } from '../index';
import { localFieldConfig } from './TransactionTypeCode.config';
import { NAMESPACE } from '../../../activity.config';
import styles from './TransactionTypeCode.less';

export { localFieldConfig } from './TransactionTypeCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, index }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );
  const isLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/policyInfoRemote`]
  );

  const transactionTypes =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
    ) || {};

  const transactionTypeCode = lodash
    .values(transactionTypes)
    .map((item) => formUtils.queryValue(item.transactionTypeCode));

  const visibleConditions = true;
  const editableConditions =
    !Rule(fieldProps['editable-condition'], form, NAMESPACE) && !isLoading && policyInfo;

  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.transactionTypeSectionBox}>
          <span className={styles.transactionTypeSectionNumber}>
            {index === 0 ? 1 : (index || lodash.size(transactionTypes)) + 1}
          </span>
          <FormItemSelect
            className={styles.transactionTypeSectionSelect}
            dicts={dicts}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            existCodes={transactionTypeCode}
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
          />
        </div>
      </Col>
    )
  );
};

const TransactionTypeCode = ({ isShow, layout, form, editable, section, index }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} index={index} />
    </ElementConfig.Field>
  </Authority>
);

TransactionTypeCode.displayName = localFieldConfig.field;

export default TransactionTypeCode;
