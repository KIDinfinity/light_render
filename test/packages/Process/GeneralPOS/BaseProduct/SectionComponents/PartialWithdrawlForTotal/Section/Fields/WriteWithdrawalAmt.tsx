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
import { tenant, Region } from '@/components/Tenant';
import { localFieldConfig } from './WriteWithdrawalAmt.config';

export { localFieldConfig } from './WriteWithdrawalAmt.config';

import { useSelector } from 'dva';
import styles from '../../index.less';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { DecisionEnum, LimitTypeEnum } from 'process/GeneralPOS/common/Enum';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);

  const cleanDecision = formUtils.queryValue(decision);
  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const priceByfundCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.priceByfundCode
  );
  const limitData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.limitData);

  const unitHolding = form.getFieldValue('unitHolding');
  const fundCode = form.getFieldValue('fundCode');
  const accountValue = form.getFieldValue('accountValue');

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const mustRule = validating
    ? {
        VLD_000816: Validator.VLD_000816(),
        VLD_000636: Validator.VLD_000636(unitHolding),
        VLD_000848: Validator.VLD_000848(
          accountValue,
          limitData?.[LimitTypeEnum.InputPartialWithdrawalFundAmount]
        ),
        ...tenant.region({
          [Region.MY]: {
            VLD_000855: Validator.VLD_000855(),
            VLD_000863: Validator.VLD_000863(unitHolding, accountValue),
          },
          [Region.PH]: {
            VLD_000855: Validator.VLD_000855(),
            VLD_000863: Validator.VLD_000863(unitHolding, accountValue),
          },
          notMatch: {},
        }),
      }
    : {
        VLD_000816: Validator.VLD_000816(),
      };

  const Rules = cleanDecision === DecisionEnum.D || !isDecision({ caseCategory }) ? {} : mustRule;

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
            precision={2}
            pattern={/.*/}
            isInline
            freePrecision
          />
        </div>
      </Col>
    )
  );
};

const WriteWithdrawalAmt = ({ isShow, layout, form, editable, config }: any) => (
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

WriteWithdrawalAmt.displayName = localFieldConfig.field;

export default WriteWithdrawalAmt;
