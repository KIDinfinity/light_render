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
import { localFieldConfig } from './SwitchOutAmount.config';

export { localFieldConfig } from './SwitchOutAmount.config';
import { NAMESPACE } from '../../../../activity.config';
import { isDecision } from '../../../../../common/utils';
import { useSelector } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { DecisionEnum, LimitTypeEnum } from '../../../../../common/Enum';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const unitHold = form.getFieldValue('unitHolding');
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );

  const cleanDecision = formUtils.queryValue(decision);

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const limitData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.limitData);
  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);
  const priceByfundCode = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.priceByfundCode
  );

  const unitHolding = form.getFieldValue('unitHolding');
  const fundCode = form.getFieldValue('fundCode');

  const price = Number(priceByfundCode?.[fundCode]?.[0]?.bidPrice || 0);
  const accountValue = Number(price) * Number(unitHolding);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const mustRule = validating
    ? tenant.region({
        [Region.MY]: {
          VLD_000636: Validator.VLD_000636(unitHold),
          VLD_000816: Validator.VLD_000816(),
          VLD_000849: Validator.VLD_000849(
            unitHold,
            accountValue,
            limitData?.[LimitTypeEnum.InputFundSwitchSwitchOutAmount]
          ),
          VLD_000862: Validator.VLD_000862(unitHolding, accountValue),
        },
        [Region.PH]: {
          VLD_000636: Validator.VLD_000636(unitHold),
          VLD_000816: Validator.VLD_000816(),
          VLD_000849: Validator.VLD_000849(
            unitHold,
            accountValue,
            limitData?.[LimitTypeEnum.InputFundSwitchSwitchOutAmount]
          ),
          VLD_000862: Validator.VLD_000862(unitHolding, accountValue),
        },
        notMatch: {},
      })
    : { VLD_000816: Validator.VLD_000816() };

  const Rules = cleanDecision === DecisionEnum.D || !isDecision({ caseCategory }) ? {} : mustRule;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
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
          precision={4}
          pattern={/.*/}
          isInline
          freePrecision
        />
      </Col>
    )
  );
};

const SwitchOutAmount = ({ isShow, layout, form, editable, config }: any) => (
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

SwitchOutAmount.displayName = localFieldConfig.field;

export default SwitchOutAmount;
