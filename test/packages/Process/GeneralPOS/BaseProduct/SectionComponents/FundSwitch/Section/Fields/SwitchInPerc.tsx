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
import { localFieldConfig } from './SwitchInPerc.config';

export { localFieldConfig } from './SwitchInPerc.config';

import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from '../../../../activity.config';
import { DecisionEnum, OptionEnum } from 'process/GeneralPOS/common/Enum';
import { isDecision } from 'process/GeneralPOS/common/utils';

import { useSelector } from 'dva';
import styles from '../../index.less';

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
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const switchingOutOption = form.getFieldValue('switchingOutOption');
  const switchOutUnit = form.getFieldValue('switchOutUnit');
  const switchOutPerc = form.getFieldValue('switchOutPerc');
  const switchOutAmount = form.getFieldValue('switchOutAmount');
  const suffix = tenant.isTH() && '%';
  const mustRule = validating
    ? {
        VLD_000638: Validator.VLD_000638(
          tenant.region({
            [Region.MY]: switchingOutOption === OptionEnum.Unit ? switchOutUnit : switchOutAmount,
            [Region.PH]: switchingOutOption === OptionEnum.Unit ? switchOutUnit : switchOutAmount,
            notMatch: switchingOutOption === OptionEnum.Unit ? switchOutUnit : switchOutPerc,
          })
        ),
        VLD_000639: Validator.VLD_000639(),
        VLD_000815: Validator.VLD_000815(),
      }
    : {
        VLD_000815: Validator.VLD_000815(),
      };
  const Rules =
    cleanDecision === DecisionEnum.D || !isDecision({ caseCategory, activityKey }) ? {} : mustRule;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.switchPct}>
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
            freePrecision
            suffix={suffix}
          />
        </div>
      </Col>
    )
  );
};

const SwitchInPerc = ({ isShow, layout, form, editable, config }: any) => (
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

SwitchInPerc.displayName = localFieldConfig.field;

export default SwitchInPerc;
