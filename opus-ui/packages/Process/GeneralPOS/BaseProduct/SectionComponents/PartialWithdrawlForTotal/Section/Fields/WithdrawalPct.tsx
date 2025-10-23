import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './WithdrawalPct.config';

export { localFieldConfig } from './WithdrawalPct.config';
import { isDataCapture, isDecision } from 'process/GeneralPOS/common/utils';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';

import styles from '../../index.less';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { useSelector } from 'dva';
import className from 'classnames';

function round(number, precision) {
  if (lodash.isNaN(number)) return 0;
  return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);
  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );
  const cleanDecision = formUtils.queryValue(decision);
  const unitHold = form.getFieldValue('unitHolding');
  const isNotDataCapture = !isDataCapture({ caseCategory });

  const unitHolding = form.getFieldValue('unitHolding');
  const withdrawalPct = form.getFieldValue('withdrawalPct');
  const suffix = isNotDataCapture
    ? `%(${round((Number(unitHolding || 0) * Number(withdrawalPct || 0)) / 100, 2)})`
    : '';

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const mustRule = validating
    ? {
        VLD_000815: Validator.VLD_000815(),
        VLD_000636: Validator.VLD_000636(unitHold),
        VLD_000639: Validator.VLD_000639(),
      }
    : {
        VLD_000815: Validator.VLD_000815(),
      };

  const Rules = cleanDecision === DecisionEnum.D || !isDecision({ caseCategory }) ? {} : mustRule;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div
          className={className(styles.withdrawalPct, { [styles.isNotDataCap]: isNotDataCapture })}
        >
          <FormItemNumber
            allowClear
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
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            labelType={config.label?.type || fieldProps.label.type}
            placeholder=""
            suffix={suffix}
            pattern={/.*/}
            isInline
            freePrecision
          />
        </div>
      </Col>
    )
  );
};

const WithdrawalPct = ({ isShow, layout, form, editable, config }: any) => (
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
);;

WithdrawalPct.displayName = localFieldConfig.field;

export default WithdrawalPct;
