import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Validator,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './InvestmentConsultantsFullName.config';

export { localFieldConfig } from './InvestmentConsultantsFullName.config';
import styles from '../../index.less';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  fullName,
  personName,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const match = lodash.includes(
    [
      `${personName?.fullName}`.replaceAll(' ', ''),
      `${personName?.givennameTh}`.replaceAll(' ', ''),
    ],
    `${fullName}`.replaceAll(' ', '')
  );
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = { VLD_000814: Validator.VLD_000814() };

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
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
        {fullName &&
          personName?.fullName &&
          (!match ? (
            <div className={styles.notMatch}>
              <span>No Match:</span>
              <span>
                {`${personName?.prefixTh} ${personName?.givennameTh} ${personName?.surnameTh}`}
              </span>
            </div>
          ) : (
            <div className={styles.match}>Match</div>
          ))}
        {!personName && fullName && <div className={styles.notMatch}>Invalid IC Code.</div>}
      </Col>
    )
  );
  T95056685;
};

const InvestmentConsultantsFullName = ({
  isShow,
  layout,
  form,
  editable,
  fullName,
  personName,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      fullName={fullName}
      personName={personName}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

InvestmentConsultantsFullName.displayName = localFieldConfig.field;

export default InvestmentConsultantsFullName;
