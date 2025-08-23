import React, { useEffect } from 'react';
import { Col } from 'antd';
import {
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
  formUtils,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './Total.config';
import styles from '../../index.less';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { useSelector } from 'dva';
import classNames from 'classnames';
import { tenant } from '@/components/Tenant';

export { localFieldConfig } from './Total.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );
  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);

  const cleanDecision = formUtils.queryValue(decision);
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const total = form.getFieldValue('total');

  useEffect(() => {
    const handler = setTimeout(() => {
      form.validateFields([field], {
        force: true,
      }); // 只有在停止变动一段时间后才更新
    }, 200); // 延迟 500ms

    return () => {
      clearTimeout(handler); // 清理之前的定时器，防止多次触发
    };
  }, [cleanDecision, total]);

  const Rules =
    cleanDecision === DecisionEnum.D || !isDecision({ caseCategory })
      ? {}
      : {
          VLD_000641: Validator.VLD_000641(),
        };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          className={classNames(styles.total, tenant.isTH() && styles.THTotal)}
          allowClear
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
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          isInline
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
