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

import { localFieldConfig } from './WithdrawalUnit.config';

export { localFieldConfig } from './WithdrawalUnit.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { useSelector } from 'dva';
import styles from '../../index.less';
import { tenant } from '@/components/Tenant';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);
  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const cleanDecision = formUtils.queryValue(decision);
  const unitHold = form.getFieldValue('unitHolding');

  const switchOutAmount = form.getFieldValue('switchOutAmount');
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const mustRule = validating
    ? {
        VLD_000816: Validator.VLD_000816(),
        VLD_000636: Validator.VLD_000636(unitHold),
        VLD_000637: Validator.VLD_000637(unitHold),
      }
    : {
        VLD_000816: Validator.VLD_000816(),
      };

  const Rules = cleanDecision === DecisionEnum.D ? {} : mustRule;

  const extra = tenant.isTH()
    ? {
        precision: 4,
      }
    : {
        freePrecision: true,
      };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.withdrawalPct}>
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
            pattern={/.*/}
            isInline
            {...extra}
          />
        </div>
      </Col>
    )
  );
};

const WithdrawalUnit = ({ isShow, layout, form, editable, config }: any) => (
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

WithdrawalUnit.displayName = localFieldConfig.field;

export default WithdrawalUnit;
